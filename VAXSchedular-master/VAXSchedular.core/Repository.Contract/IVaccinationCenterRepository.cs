using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VAXSchedular.core.Entities;

namespace VAXSchedular.core.Repository.Contract
{
	public interface IVaccinationCenterRepository<T> where T : VaccinationCenter
	{
		Task<IEnumerable<VaccinationCenter>> GetAllWithVaccines();
		Task<VaccinationCenter> Get(string name);
		Task<VaccinationCenter> Get(int id);
	}
}
