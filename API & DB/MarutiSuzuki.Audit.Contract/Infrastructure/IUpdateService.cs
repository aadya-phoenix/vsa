using System.Threading.Tasks;

namespace MarutiSuzuki.Audit.Contract.Operations
{
    /// <summary>
    /// This interface need to be implemented by Repositories
    /// which wants to modify record details in entity
    /// </summary>
    /// <typeparam name="TEntity"></typeparam>
    public interface IUpdateService<TEntity> where TEntity : class
    {
        /// <summary>
        /// Update record in to entity
        /// </summary>
        /// <param name="entity">Database/DBContext entity</param>
        /// <returns></returns>
        Task UpdateAsync(TEntity entity);
    }
}
