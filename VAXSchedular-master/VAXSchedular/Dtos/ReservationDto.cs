using VAXSchedular.core.Entities;

namespace VAXSchedular.Dtos
{
	public class ReservationDto
	{
		public DoseNumber DoseNumber { get; set; }
        public string VaccineName { get; set; }

        public string VaccinationCenterName { get; set; }

        public DateTime ReservationDate { get; set; } = DateTime.Now;

    }
}
