using System;
using System.Collections.Generic;
using System.Text;

namespace MarutiSuzuki.Audit.Entity.Model
{
	public class RoleAccess
	{
		public Guid Id { get; set; }
		public Guid PageId { get; set; }
		public Guid RoleId { get; set; }
		public bool Add { get; set; }
		public bool Edit { get; set; }
		public bool Delete { get; set; }
	}
}
