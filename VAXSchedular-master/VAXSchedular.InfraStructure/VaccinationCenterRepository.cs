using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VAXSchedular.core.Entities;
using VAXSchedular.core.Repository.Contract;
using VAXSchedular.InfraStructure.Data;

namespace VAXSchedular.InfraStructure
{
	public class VaccinationCenterRepository : IVaccinationCenterRepository<VaccinationCenter>
	{
		private readonly ApplicationDbContext _dbContext;

		public VaccinationCenterRepository(ApplicationDbContext dbContext)
        {
			_dbContext = dbContext;
		}
        public async Task<IEnumerable<VaccinationCenter>> GetAllWithVaccines()
		{
			var vaccinationCenters=await _dbContext.VaccinationCenters.Include(VC=>VC.Vaccines).ToListAsync();
			return vaccinationCenters;
		}


		public async Task<VaccinationCenter> Get(string name)
		{
			var vaccinationCenter =await _dbContext.VaccinationCenters.FirstOrDefaultAsync(VC=>VC.Name==name);
			if (vaccinationCenter == null)
				return null;
			return vaccinationCenter;
		}

		public async Task<VaccinationCenter> Get(int id)
		{
			var vaccinationCenter=await _dbContext.VaccinationCenters.Include(VC=>VC.Vaccines).Where(VC=>VC.Id==id).FirstOrDefaultAsync();
			if (vaccinationCenter == null)
				return null;
			return vaccinationCenter;
		}
	}
}
