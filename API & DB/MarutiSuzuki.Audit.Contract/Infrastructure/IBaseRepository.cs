
using MarutiSuzuki.Audit.Contract.Infrastructure;
using MarutiSuzuki.Audit.Helper;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace MarutiSuzuki.Audit.Contract.Operations
{
    /// <summary>
    /// This interface provide collection of all base operation interfaces
    /// </summary>
    /// <typeparam name="TEntity"></typeparam>
    public interface IBaseRepository<TEntity> : IAddService<TEntity>, ICountService<TEntity>, IUpdateService<TEntity>, IDeleteService<TEntity>, IDeleteRange<TEntity>, IUpdateRange<TEntity>, IAddRange<TEntity> where TEntity : class
    {
        Task<List<TResult>> SelectAsyncList<TResult>(Expression<Func<TEntity, bool>> predicate, Expression<Func<TEntity, TResult>> selectPredicate);
		Task<List<TEntity>> ExecuteEntityAsync<T>(string procName, params T[] sqlParam) where T : class;
		Task<int> ExcecuteQueryAsync(string query);
		/// <summary>  
		/// Gets all.  
		/// </summary>  
		/// <returns></returns>  
		Task<List<TEntity>> GetAll();
		Task<TEntity> Get(Guid id);
		void Add(TEntity entity);
		void AddRange(IEnumerable<TEntity> entities);
		void Remove(TEntity entity);
		void RemoveRange(IEnumerable<TEntity> entities);

		bool Any(Expression<Func<TEntity, bool>> predicate);
		Task<List<TEntity>> ExecuteProcAsync<TEntity>(string procName, IEnumerable<Parameters> param = null) where TEntity : class;

	}
}
