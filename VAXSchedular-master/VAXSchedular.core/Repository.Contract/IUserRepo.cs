using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VAXSchedular.core.Entities;

namespace VAXSchedular.core.Repository.Contract
{
	public interface IUserRepo<T> where T : User
	{
		Task<User>GetUserByIdAsync(int id);
	}
}
