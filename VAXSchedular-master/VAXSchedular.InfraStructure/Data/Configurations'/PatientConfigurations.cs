using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VAXSchedular.core.Entities;

namespace VAXSchedular.InfraStructure.Data.Configurations_
{
	internal class PatientConfigurations:IEntityTypeConfiguration<Patient>
	{

		public void Configure(EntityTypeBuilder<Patient> builder)
		{
			builder.HasMany(P => P.Reservations).WithOne(R => R.Patient).HasForeignKey(R => R.PatientId);

		}
	}
}
