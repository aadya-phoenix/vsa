using MarutiSuzuki.Audit.Entity.Model;
using MarutiSuzuki.Audit.Repository.CommonRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace MarutiSuzuki.Audit.Repository.SQLRepository
{
    public interface IUserRepository : IGenericRepository<User>
    {
    }
}
