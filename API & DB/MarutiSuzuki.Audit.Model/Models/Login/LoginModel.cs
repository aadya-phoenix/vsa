using MarutiSuzuki.Audit.Entity.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MarutiSuzuki.Audit.Model.Models.Login
{
	public class LoginModel
	{
		[Required]
		public string Username { get; set; }
		[Required]
		[DataType(DataType.Password)]
		public string Password { get; set; }
	}
	public class UserModel
	{

		public string Name { get; set; }
		public string FullName { get; set; }		
		public Role Role { get; set; }
		public string ACCESS_LEVEL { get; set; }		
		public string Password { get; set; }

	}
}
