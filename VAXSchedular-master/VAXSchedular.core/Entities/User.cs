using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VAXSchedular.core.Entities
{
	public class User
	{
        public int Id { get; set; }
		public string Name { get; set; }
		public string Email { get; set; }

        public byte[] PasswordHash { get; set; }

		public byte[] PasswordSalt { get; set; }

        public string? PhoneNumber { get; set; }

        public int? UserRoleId { get; set; } = 2;

        public UserRole Role { get; set; }

        public bool Status { get; set; }

        public string Address { get; set; }


    }
}
