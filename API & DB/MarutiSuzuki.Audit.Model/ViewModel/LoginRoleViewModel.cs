using System;
using System.Collections.Generic;
using System.Text;

namespace MarutiSuzuki.Audit.Model.ViewModel
{
	public class LoginRoleViewModel
	{
		public string UserName { get; set; }
		public string Password { get; set; }		
		public Guid RoleId { get; set; }		
		public string RoleName { get; set; }	
	}
}
