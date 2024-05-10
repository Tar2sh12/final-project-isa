using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using VAXSchedular.core.Entities;

namespace VAXSchedular.InfraStructure.Data
{
	public class ApplicationDbContext:DbContext
	{
        public ApplicationDbContext(DbContextOptions options):base(options) 
        {
            
        }

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.EnableSensitiveDataLogging();
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
		}



		public DbSet<User> Users { get; set; }
        public DbSet<Vaccine> Vaccines { get; set; }

        public DbSet<VaccinationCenter> VaccinationCenters { get; set; }
        public DbSet<Patient> Patients { get; set; }

        public DbSet<Reservation> Reservations { get; set; }

        public DbSet<Certificate> Certificates { get; set; }

        public DbSet<UserRole> UserRoles { get; set; }

    }
}
