using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VAXSchedular.core.Entities;
using VAXSchedular.core.Repository.Contract;

namespace VAXSchedular.InfraStructure.Data
{
	public class UserRepo : IUserRepo<User>
	{
		private readonly ApplicationDbContext _context;

		public UserRepo(ApplicationDbContext context)
        {
			_context = context;
		}
        public async Task<User> GetUserByIdAsync(int id)
		{
			return await _context.Users.AsNoTracking().FirstOrDefaultAsync(U=>U.Id == id);
		}
	}
}
