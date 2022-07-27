using Dapper;
using MarutiSuzuki.Audit.Contract.Repository;
using MarutiSuzuki.Audit.Entity.Model;
using MarutiSuzuki.Audit.Model.ViewModel;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MarutiSuzuki.Audit.Repository.SQLRepository
{
    public class LoginRepository : ILoginRepository
    {
        private readonly IConfiguration configuration;
        public LoginRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public async Task<List<LoginRoleViewModel>> GetLoginDetails(string userName)
        {
            IEnumerable<LoginRoleViewModel> loginRole;

            using (var connection = new SqlConnection(configuration.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                loginRole = await connection.QueryAsync<LoginRoleViewModel>("usp_sel_Users_GetLoginDetailByUserName",
                                new { userName = userName },
                                commandType: CommandType.StoredProcedure);
            }
            return loginRole.ToList();
        }

       
    }
}
