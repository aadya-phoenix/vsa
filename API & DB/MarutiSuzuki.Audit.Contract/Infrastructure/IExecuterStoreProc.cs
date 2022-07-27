using MarutiSuzuki.Audit.Helper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;


namespace MarutiSuzuki.Audit.Contract.Operations
{
    /// <summary>
    /// Use this interface to execute stored procedures for complex data type
    /// </summary>
    /// <typeparam name="QueryEntity"></typeparam>
    public interface IExecuterStoreProc
    {
        IUnitOfWork uow { get; set; }
        /// <summary>
        /// Execute stored procedures for complex data type
        /// </summary>
        /// <param name="procName">Procedure Name</param>
        /// <param name="Param"></param>
        /// <returns></returns>
        List<TEntity> ExecuteProcedure<TEntity>(string procName, IEnumerable<Parameters> param = null) where TEntity : class;

        /// <summary>
        /// Execute stored procedures Async for complex data type
        /// </summary>
        /// <param name="procName">Procedure Name</param>
        /// <param name="Param"></param>
        /// <returns></returns>
        Task<List<TEntity>> ExecuteProcedureAsync<TEntity>(string procName, IEnumerable<Parameters> param = null) where TEntity : class;


        /// <summary>
        /// Execute stored procedure on complex data type to get record without adding complex object in DBContext class
        /// </summary>
        /// <param name="query"></param>
        /// <param name="param"></param>
        /// <returns></returns>
        Task<List<TEntity>> ExecuteProcAsync<TEntity>(string procName, IEnumerable<Parameters> param = null) where TEntity : class;


        /// <summary>
        /// Execute sql/stored procedure on complex data type to get record without adding complex object in DBContext class with same model
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="commandType"></param>
        /// <param name="param"></param>
        /// <returns></returns>
        Task<List<TEntity>> ExecuteSqlScriptAsync<TEntity>(string sql, CommandType commandType, IEnumerable<Parameters> param = null) where TEntity : class;


        /// <summary>
        /// Execute procedure using reader on databse to get record
        /// </summary>
        /// <param name="procName">Procedure Name</param>
        /// <returns></returns>
        Task<List<TEntity>> ExecuteAsync<TEntity>(string procName) where TEntity : class;

        /// <summary>
        /// Execute procedure using perform CUD operations
        /// </summary>
        /// <param name="procName">Procedure Name</param>
        /// <returns></returns>
        //Task<List<ComplexEntity>> ExecuteAsync(string procName);
        //Task<List<ComplexEntity>> ExecuteAsync(string procName, params object[] parameters);

        Task<int> ExceuteNonQueryAsync(string procName, IEnumerable<Parameters> Parameters);

        Task<string> ExecuteScalerProcedureAsync(string procName, IEnumerable<Parameters> param = null);

        /// <summary>
        /// Execute stored procedure on complex data type to get record without adding complex object in DBContext class and with new db context object per request
        /// use this method only with parallel calls
        /// </summary>
        /// <param name="query"></param>
        /// <param name="param"></param>
        /// <returns></returns>
        Task<List<TEntity>> ExecuteProcWithNewContextAsync<TEntity>(string procName, IEnumerable<Parameters> param = null) where TEntity : class;
        
        Task<object> ExecuteScalerObjectProcedureAsync(string procName, IEnumerable<Parameters> param = null);
    }
}
