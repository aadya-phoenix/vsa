
using Microsoft.AspNetCore.JsonPatch;
using System;
using System.Threading.Tasks;

namespace MarutiSuzuki.Audit.Contract.Infrastructure
{
	public interface IPatchService<TEntity> where TEntity : class
    {
        Task<int> Patch(Guid key, JsonPatchDocument<TEntity> data);
    }
}
