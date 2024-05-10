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
	internal class ReservationConfigurations : IEntityTypeConfiguration<Reservation>
	{
		public void Configure(EntityTypeBuilder<Reservation> builder)
		{
			builder.HasOne(R => R.Vaccine).WithMany().HasForeignKey(R => R.VaccineId);
			builder.Property(R => R.DoseNumber).HasConversion(
				(DoseNumber) => DoseNumber.ToString(),
				(DoseNumber) => (DoseNumber)Enum.Parse(typeof(DoseNumber), DoseNumber.ToString()));

			builder.Property(R => R.ReservationStatus).HasConversion(
		(ReservationStatus) => ReservationStatus.ToString(),
		(ReservationStatus) => (ReservationStatus)Enum.Parse(typeof(ReservationStatus), ReservationStatus.ToString()));

			builder.HasOne(R => R.ApprovedBy).WithMany().HasForeignKey(R => R.VaccinationCenterId);
			builder.HasOne(R => R.Certificate).WithOne(C => C.Reservation);
		}
	}
}
