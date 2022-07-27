using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MarutiSuzuki.Audit.Contract.Infrastructure
{
    public interface IAddRange<TEntity> where TEntity : class
    {
       Task AddRangeAsync(IEnumerable<TEntity> entities);
    }
}
