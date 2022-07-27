
using MarutiSuzuki.Audit.Contract;
using MarutiSuzuki.Audit.Contract.Repository;
using MarutiSuzuki.Audit.Entity.Model;
using MarutiSuzuki.Audit.Repository.SQLRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MarutiSuzuki.Audit.Repository.CommonRepository
{
	public class UnitOfWork : IUnitOfWork
	{
		#region Private Variables
		//private readonly DbContext _context;

		public IUserRepository Users { get; }
		public ILoginRepository Login { get; }


		#endregion

		#region Constructor

		/// <summary>
		/// Constructor to initialize DBContext.
		/// </summary>
		/// <param name="DbContext"></param>
		public UnitOfWork(IUserRepository userRepository, ILoginRepository loginRepository)
		{
			Users = userRepository;
			Login = loginRepository;

		}
		#endregion

		#region Public Methods
		/// <summary>
		/// Save changes asynchronously
		/// </summary>
		/// <returns></returns>	
       

        #endregion




    }
}
