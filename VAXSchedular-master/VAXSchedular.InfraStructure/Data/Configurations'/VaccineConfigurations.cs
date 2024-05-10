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
	internal class VaccineConfigurations : IEntityTypeConfiguration<Vaccine>
	{
		public void Configure(EntityTypeBuilder<Vaccine> builder)
		{
			builder.Property(V => V.Name).IsRequired().HasMaxLength(25);
			builder.Property(V => V.Description).IsRequired().HasMaxLength(100);
			builder.Property(V => V.PreCautions).IsRequired().HasMaxLength(75);
			builder.Property(V => V.Price).HasColumnType("decimal(12,2)");

			builder.HasOne(V => V.VaccinationCenter).WithMany(VC => VC.Vaccines).HasForeignKey(V => V.VaccinationCenterId);



		}
	}
}
