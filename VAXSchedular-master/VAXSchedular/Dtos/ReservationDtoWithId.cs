using VAXSchedular.core.Entities;

namespace VAXSchedular.Dtos
{
	public class ReservationDtoWithId
	{
        public int Id { get; set; }
        public DoseNumber DoseNumber { get; set; }
		public string VaccineName { get; set; }

		public string VaccinationCenterName { get; set; }

		public DateTime ReservationDate { get; set; } = DateTime.Now;

        public ReservationStatus Status { get; set; }
    }
}
