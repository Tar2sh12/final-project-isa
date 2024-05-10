namespace VAXSchedular.core.Entities
{
	public enum DoseNumber
	{
		First,Second
	}

	public enum ReservationStatus
	{
		Pending,Approved,Rejected
	}
	public class Reservation
	{
        public int Id { get; set; }

        public int PatientId { get; set; }
        public Patient Patient { get; set; }

        public int VaccineId { get; set; }
        public Vaccine Vaccine { get; set; }
        public DoseNumber DoseNumber { get; set; }

        public ReservationStatus ReservationStatus { get; set; }

        public DateTime ReservationDate { get; set; }=DateTime.Now;

        public int VaccinationCenterId { get; set; }
        public VaccinationCenter ApprovedBy { get; set; }
        public Certificate Certificate { get; set; }




    }
}