using System.Threading.Tasks;

namespace MarutiSuzuki.Audit.Contract.Operations
{
    /// <summary>
    /// This interface need to be implemented by repositories 
    /// which wants to add new record in entity
    /// </summary>
    /// <typeparam name="TEntity"></typeparam>
    public interface IAddService<TEntity> where TEntity : class
    {
        /// <summary>
        /// Add new record in to entity
        /// </summary>
        /// <param name="entity">Database/DBContext entity</param>
        /// <returns></returns>
        Task AddAsync(TEntity entity);
    }
}
