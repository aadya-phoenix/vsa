using MarutiSuzuki.Audit.Contract;
using MarutiSuzuki.Audit.Contract.Business;
using MarutiSuzuki.Audit.Model.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MarutiSuzuki.Audit.Business.Login
{
    public class LoginBusiness : ILoginBusiness
    {
        private readonly IUnitOfWork uow;
        public LoginBusiness(IUnitOfWork uow)
        {
            this.uow = uow;
        }

        public async Task<List<LoginRoleViewModel>> GetLoginDetails(string userName)
        {          
           return await uow.Login.GetLoginDetails(userName);
        }
    }
}
