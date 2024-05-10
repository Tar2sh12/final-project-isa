using System.ComponentModel.DataAnnotations;

namespace VAXSchedular.Dtos
{
	public class VaccineDtoById
	{
		[Required]
        public int Id { get; set; }
        [Required(ErrorMessage = "name is required")]
		[MaxLength(20, ErrorMessage = "Max length is 20")]
		public string Name { get; set; }

		[Required(ErrorMessage = "Description is required")]
		[MaxLength(40, ErrorMessage = "Max length is 40")]
		public string Description { get; set; }

		[Required(ErrorMessage = "Price is required")]
		[DataType(DataType.Currency)]
		[Range(0.1, double.MaxValue, ErrorMessage = "Value must be greater than zero")]

		public decimal Price { get; set; }


		[Required(ErrorMessage = "Quantity is required")]
		[Range(0, int.MaxValue, ErrorMessage = "At least value should be 0")]
		public int QuantityAvalible { get; set; }


		[Required(ErrorMessage = "Precautions is required")]
		[MaxLength(50, ErrorMessage = "Max length is 50")]

		public string PreCautions { get; set; }

		[Required]
		public int TimeGapBetweenDoses { get; set; }
		[Required]
		[Range(1, int.MaxValue, ErrorMessage = "Value should be greater than zero!")]
		public int VaccinationCenterId { get; set; }
	}
}
