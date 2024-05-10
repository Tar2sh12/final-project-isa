using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VAXSchedular.core.Entities;

namespace VAXSchedular.core.Repository.Contract
{
	public interface IPatientRepository<T> where T : User
	{
       Task<T> GetPatientByName(string name);
		Task<T> GetPatientById(int id);
    }
}
