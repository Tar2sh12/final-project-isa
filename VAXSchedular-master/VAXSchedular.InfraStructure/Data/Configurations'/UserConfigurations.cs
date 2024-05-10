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
	public class UserConfigurations : IEntityTypeConfiguration<User>
	{
		public void Configure(EntityTypeBuilder<User> builder)
		{
			builder.Property(U=>U.Name).IsRequired().HasMaxLength(25);
			builder.Property(U=>U.Email).IsRequired().HasMaxLength(30);
			builder.Property(U => U.PhoneNumber).IsRequired().HasMaxLength(25);
			builder.Property(U=>U.Address).IsRequired().HasMaxLength(30);

			builder.HasOne(U => U.Role).WithMany(R => R.Users).HasForeignKey(U => U.UserRoleId);


		}
	}
}
