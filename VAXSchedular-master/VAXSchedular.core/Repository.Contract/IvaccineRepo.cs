using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VAXSchedular.core.Entities;

namespace VAXSchedular.core.Repository.Contract
{
	public interface IvaccineRepo<T> where T : Vaccine
	{

		Task<T> Get(string name);
	}
}
