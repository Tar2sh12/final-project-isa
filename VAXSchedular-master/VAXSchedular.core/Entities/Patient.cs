using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VAXSchedular.core.Entities
{
	public class Patient:User
	{
       

        public ICollection<Reservation> Reservations { get; set; } = new HashSet<Reservation>();
    }
}
