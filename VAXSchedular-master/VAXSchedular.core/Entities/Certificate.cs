namespace VAXSchedular.core.Entities
{
	public class Certificate
	{
        public int Id { get; set; }
        public DateTime IssuedAt { get; set; }= DateTime.Now;
		public int ReservationId { get; set; }
		public Reservation Reservation { get; set; }
    
    }
}