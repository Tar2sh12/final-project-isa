using VAXSchedular.core.Entities;

namespace VAXSchedular.Dtos
{
	public class PatientDto
	{
        public int Id { get; set; }
        public string Name { get; set; }
		public string Email { get; set; }
		public string Address { get; set; }
		public string PhoneNumber { get; set; }

        public string VaccineName { get; set; }

        public DoseNumber DoseNumber { get; set; }
    }
}
