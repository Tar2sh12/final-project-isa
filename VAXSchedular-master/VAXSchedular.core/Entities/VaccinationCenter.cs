namespace VAXSchedular.core.Entities
{
	public class VaccinationCenter:User
	{
       

        public ICollection<Vaccine> Vaccines { get; set; }=new HashSet<Vaccine>();
    }
}