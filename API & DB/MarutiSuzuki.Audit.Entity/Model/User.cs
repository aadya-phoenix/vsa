using System;
using System.Collections.Generic;
using System.Text;

namespace MarutiSuzuki.Audit.Entity.Model
{
    public class User
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid RoleId { get; set; }
        public string Email { get; set; }
        public string MobileNo { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool isActive { get; set; }

    }
}
