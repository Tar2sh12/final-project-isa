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
	public class VaccineRepo : IvaccineRepo<Vaccine>
	{
		private readonly ApplicationDbContext _context;

		public VaccineRepo(ApplicationDbContext context)
        {
			_context = context;
		}
        public async Task<Vaccine> Get(string name)
		{
			var returnname=await _context.Vaccines.FirstOrDefaultAsync(V => V.Name == name);
			if(returnname == null)
			{
				return null;
			}
			return returnname;
		}
	}
}
