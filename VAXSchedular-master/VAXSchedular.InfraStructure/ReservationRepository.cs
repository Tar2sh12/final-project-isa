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
	public class ReservationRepository : IReservationRepository<Reservation>
	{
		private readonly ApplicationDbContext _dbContext;

		public ReservationRepository(ApplicationDbContext dbContext)
		{
			_dbContext = dbContext;
		}
		public async Task<Reservation> GetByForeignPatientId(int id, string name)
		{
			var vaccine=await _dbContext.Vaccines.FirstOrDefaultAsync(V=>V.Name==name);
			var reservation = await _dbContext.Reservations.Where(r=>r.VaccineId==vaccine.Id).FirstOrDefaultAsync(r => r.PatientId == id);

			
			return reservation;
		}

		public async Task<IEnumerable<Reservation>> GetAllForSpecficVaacine(int id)
		{
			var reservations= await _dbContext.Reservations.Where(R=>R.VaccineId==id).ToListAsync();
			return reservations;
		}

		public async Task<IEnumerable<Reservation>> GetAllByForeignPatientId(int id)
		{

			var resservations=await _dbContext.Reservations.Where(R => R.PatientId ==id).ToListAsync();
			return resservations;
		}
	}
}
