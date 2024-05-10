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
	public class PatientRepository : IPatientRepository<User>
	{
		private readonly ApplicationDbContext _context;

		public PatientRepository(ApplicationDbContext context)
        {
			_context = context;
		}

		public async Task<User> GetPatientById(int id)
		{
			return await _context.Users.FirstOrDefaultAsync(p => p.Id == id);
		}

		public async Task<User> GetPatientByName(string name)
		{
			return await _context.Patients.FirstOrDefaultAsync(P=>P.Name == name);
		}
	}
}
