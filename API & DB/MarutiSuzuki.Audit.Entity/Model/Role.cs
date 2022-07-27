using System;
using System.Collections.Generic;
using System.Text;

namespace MarutiSuzuki.Audit.Entity.Model
{
	public class Role
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
		public bool Active { get; set; }
	}
}
