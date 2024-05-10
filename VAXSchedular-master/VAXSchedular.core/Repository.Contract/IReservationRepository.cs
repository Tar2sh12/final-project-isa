using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VAXSchedular.core.Entities;

namespace VAXSchedular.core.Repository.Contract
{
	public interface IReservationRepository<T> where T : Reservation
	{
		Task<Reservation> GetByForeignPatientId(int id,string name);
		Task<IEnumerable<Reservation>> GetAllForSpecficVaacine(int id);

		Task<IEnumerable<Reservation>> GetAllByForeignPatientId(int id);
	}
}
