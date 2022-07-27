using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace MarutiSuzuki.Audit.Contract.Operations
{
    public interface ISelectFirstOrDefaultService<TEntity> where TEntity : class
    {
        /// <summary>
        /// Get filterd data as per linq expression
        /// </summary>
        /// <param name="predicate">linq expression</param>
        /// <returns></returns>
        Task<TEntity> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> predicate);

    }
}
