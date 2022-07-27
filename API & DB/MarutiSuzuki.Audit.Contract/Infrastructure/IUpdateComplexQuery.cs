using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MarutiSuzuki.Audit.Contract.Infrastructure
{
    public interface IUpdateComplexQuery<TEntity> where TEntity : class
    {
        Task<int> UpdateComplexData(TEntity complexdata);

    }
}
