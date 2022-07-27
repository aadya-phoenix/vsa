using MarutiSuzuki.Audit.Contract.Repository;
using MarutiSuzuki.Audit.Repository.SQLRepository;
using System;


namespace MarutiSuzuki.Audit.Contract
{
    // <summary>
    /// Interface for the UnitOfWork class.
    /// </summary>
    public interface IUnitOfWork 
	{

		IUserRepository Users { get; }
        ILoginRepository Login { get; }

    }
}
