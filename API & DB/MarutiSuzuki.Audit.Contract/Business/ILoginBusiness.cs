using MarutiSuzuki.Audit.Model.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MarutiSuzuki.Audit.Contract.Business
{
    public interface ILoginBusiness
    {
        Task<List<LoginRoleViewModel>> GetLoginDetails(string userName);
       
    }
}
