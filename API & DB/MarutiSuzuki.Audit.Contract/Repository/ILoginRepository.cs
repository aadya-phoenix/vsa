using MarutiSuzuki.Audit.Entity.Model;
using MarutiSuzuki.Audit.Model.ViewModel;
using MarutiSuzuki.Audit.Repository.CommonRepository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MarutiSuzuki.Audit.Contract.Repository
{
    public interface ILoginRepository 
    {
        Task<List<LoginRoleViewModel>> GetLoginDetails(string userName);
    }
}
