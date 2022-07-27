using MarutiSuzuki.Audit.Contract;
using MarutiSuzuki.Audit.Contract.Operations;
using MarutiSuzuki.Audit.Helper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace MarutiSuzuki.Audit.Repository.CommonRepository
{
	public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : class
	{
		#region Private Variable
		public DbSet<TEntity> Entities;
		public readonly DbContext _dbContext;

		#endregion

		#region Constructor
		public BaseRepository(DbContext dbContext)
		{
			_dbContext = dbContext;
			Entities = _dbContext.Set<TEntity>();
		}
		#endregion


		public IUnitOfWork UnitOfWork { get; set; }

		#region public Methods
		public async Task<int> CountAsync(Expression<Func<TEntity, bool>> predicate = null)
		{
			if (predicate != null)
				return await Entities.Where(predicate).CountAsync();
			else
				return await Entities.CountAsync();
		}
		/// <summary>
		/// Add new record in entity provided by repository
		/// </summary>
		/// <param name="entity"></param>
		/// <returns></returns>
		public virtual async Task AddAsync(TEntity entity)
		{
			await Entities.AddAsync(entity);
		}
		/// <summary>
		/// Modify single record from entity provided by repository
		/// </summary>
		/// <param name="entity"></param>
		/// <returns></returns>
		public virtual async Task UpdateAsync(TEntity entity)
		{
			await Task.Run(() => Entities.Update(entity));
		}

		/// <summary>
		/// Delete single record from entity provided by repository
		/// </summary>
		/// <param name="entity"></param>
		/// <returns></returns>
		public virtual async Task DeleteAsync(TEntity entity)
		{
			await Task.Run(() => Entities.Remove(entity));
		}

		public async Task AddRangeAsync(IEnumerable<TEntity> entities)
		{
			await Entities.AddRangeAsync(entities);
		}

		public virtual async Task UpdateRange(IEnumerable<TEntity> entities)
		{
			await Task.Run(() => Entities.UpdateRange(entities));
		}

		public async Task<List<TResult>> SelectAsyncList<TResult>(Expression<Func<TEntity, bool>> predicate, Expression<Func<TEntity, TResult>> selectPredicate)
		{
			return await Entities.Where(predicate).Select(selectPredicate).ToListAsync();
		}
		/// <summary>
		/// Delete single record from entity provided by repository
		/// </summary>
		/// <param name="entity"></param>
		/// <returns></returns>
		public virtual async Task DeleteRangeAsync(IEnumerable<TEntity> entities)
		{
			await Task.Run(() => Entities.RemoveRange(entities));
		}
		/// <summary>  
		/// Gets all.  
		/// </summary>  
		/// <returns></returns>  
		public async Task<List<TEntity>> GetAll()
		{
			return  await Entities.ToListAsync();
		}
		/// <summary>  
		/// Find.  
		/// </summary>  
		/// <returns></returns>  
		public async Task<TEntity> Get(Guid id)
		{
			return await Entities.FindAsync(id);
		}
		/// <summary>  
		/// Adds the specified entity.  
		/// </summary>  
		/// <param name="entity">The entity.</param>  
		public void Add(TEntity entity)
		{
			Entities.Add(entity);
			_dbContext.SaveChanges();
		}
		/// <summary>  
		/// Adds the range.  
		/// </summary>  
		/// <param name="entities">The entities.</param>  
		public void AddRange(IEnumerable<TEntity> entities)
		{
			Entities.AddRange(entities);
			_dbContext.SaveChanges();
		}
		/// <summary>  
		/// Removes the specified entity.  
		/// </summary>  
		/// <param name="entity">The entity.</param>  
		public void Remove(TEntity entity)
		{
			Entities.Remove(entity);
			_dbContext.SaveChanges();
		}

		/// <summary>  
		/// Removes the range.  
		/// </summary>  
		/// <param name="entities">The entities.</param>  
		public void RemoveRange(IEnumerable<TEntity> entities)
		{
			Entities.RemoveRange(entities);
		}
		/// <summary>  
		/// Finds the specified predicate.  
		/// </summary>  
		/// <param name="predicate">The predicate.</param>  
		/// <returns></returns>  
		public bool Any(System.Linq.Expressions.Expression<Func<TEntity, bool>> predicate)
		{
			return Entities.Any(predicate);
		}
		/// <summary>
		/// Get data using stored procedure
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <param name="procName"></param>
		/// <param name="sqlParam"></param>
		/// <returns></returns>
		public async Task<List<TEntity>> ExecuteEntityAsync<T>(string procName, params T[] sqlParam) where T : class
		{
			try
			{
				return await Entities.AsNoTracking().FromSql(procName, sqlParam).ToListAsync();
			}
			catch (Exception ex)
			{
				
				throw ex;
			}
		}
		/// <summary>
		/// Execute sql command on database which does not return table data (Insert, Update, Delete) 
		/// </summary>
		/// <param name="query"></param>
		/// <returns></returns>m
		public async Task<int> ExcecuteQueryAsync(string query)
		{
			try
			{
				return await  _dbContext.Database.ExecuteSqlCommandAsync(query);
			}
			catch (Exception ex)
			{
				
				throw ex;
			}
		}
		public async Task<List<TEntity>> ExecuteProcAsync<TEntity>(string procName, IEnumerable<Parameters> param = null) where TEntity : class
		{
			string procedureName = procName;

			//if (param != null)
			//{
			List<SqlParameter> sqlParam = GetParameter(ref procName, param);
			//return await Task.Run(() =>
			//{
			using (var command = _dbContext.Database.GetDbConnection().CreateCommand())
			{
				command.CommandText = procedureName;
				command.CommandType = CommandType.StoredProcedure;
				command.Parameters.AddRange(sqlParam.ToArray());
				command.CommandTimeout = 300;

				if (command.Connection.State != ConnectionState.Open)
				{
					await command.Connection.OpenAsync();
				}

				//await uow.DataContext.Database.OpenConnectionAsync();
				try
				{
					using (var result = await command.ExecuteReaderAsync())
					{
						List<TEntity> list = new List<TEntity>();
						TEntity obj = default(TEntity);
						while (await result.ReadAsync())
						{
							obj = Activator.CreateInstance<TEntity>();
							foreach (PropertyInfo prop in obj.GetType().GetProperties())
							{
								try
								{
									result.GetOrdinal(prop.Name); // throws error if column is not present in stored procedure
									if (!object.Equals(result[prop.Name], DBNull.Value))
									{
										prop.SetValue(obj, result[prop.Name], null);
									}
								}
								catch (Exception ex)
								{ }
							}
							list.Add(obj);
						}

						return list;
					}
				}
				finally
				{
					command.Connection.Close();
				}
			}
			//    }
			//);
			//}
			//return await uow.DataContext.Set<TEntity>().FromSql(procName).ToListAsync();
		}
		/// <summary>
		/// To get Sql Specific parameters
		/// </summary>
		/// <param name="procName">procName</param>
		/// <param name="param">param</param>
		/// <returns>Returns List of type SqlParameter </returns>
		private List<SqlParameter> GetParameter(ref string procName, IEnumerable<Parameters> param)
		{
			StringBuilder procedureName = new StringBuilder(procName);
			List<SqlParameter> sqlParam = new List<SqlParameter>();
			if (param != null)
			{
				foreach (Parameters p in param)
				{
					sqlParam.Add(new SqlParameter() { ParameterName = "@" + p.ParamKey, Value = p.Value });
					procedureName.Append(" @" + p.ParamKey);
				}
			}
			procName = procedureName.ToString();
			return sqlParam;
		}

		#endregion
	}
}
