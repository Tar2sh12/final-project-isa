using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VAXSchedular.core.Entities
{
	public class Vaccine
	{
        public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
        public decimal Price { get; set; }

        public int QuantityAvalible { get; set; }

        public string PreCautions { get; set; }

        public int TimeGapBetweenDoses { get; set; }

        public int VaccinationCenterId { get; set; }

        public VaccinationCenter VaccinationCenter { get; set; }
    }
}
