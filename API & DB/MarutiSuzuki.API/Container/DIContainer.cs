using MarutiSuzuki.Audit.Business.Login;
using MarutiSuzuki.Audit.Contract;
using MarutiSuzuki.Audit.Contract.Business;
using MarutiSuzuki.Audit.Contract.Repository;
using MarutiSuzuki.Audit.Helper.Email;
using MarutiSuzuki.Audit.Repository.CommonRepository;
using MarutiSuzuki.Audit.Repository.SQLRepository;
using Microsoft.Extensions.DependencyInjection;

namespace MarutiSuzuki.API.Container
{

    public class DIContainer
	{
		public static class SqlContainer
		{
			public static void Injector(IServiceCollection services)
			{
				#region Add Context And UnitOfWork
				//Register Context
				services.AddScoped<IUnitOfWork, UnitOfWork>();
				#endregion

				#region Add Repository And Business								

				services.AddScoped<IEmailSender, EmailSender>();
				services.AddScoped<IUserRepository, UserRepository>();
				services.AddScoped<ILoginRepository, LoginRepository>();
				services.AddScoped<ILoginBusiness, LoginBusiness>();

				#endregion
			}
		}		
	}
}
