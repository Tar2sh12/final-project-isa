using VAXSchedular.core.Entities;

namespace VAXSchedular.Dtos
{
	public class ReservationToBeBack
	{
		public DoseNumber DoseNumber { get; set; }
		public string VaccineName { get; set; }

		public string VaccinationCenterName { get; set; }

        public string PatientName { get; set; }
    }
}
