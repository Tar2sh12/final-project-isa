
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using VAXSchedular.core.Entities;
using VAXSchedular.core.Repository.Contract;
using VAXSchedular.Helpers;
using VAXSchedular.InfraStructure;
using VAXSchedular.InfraStructure.Data;
using VAXSchedular.SignalR;


namespace VAXSchedular
{
	public class Program
	{
		public async static Task Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);
			#region Configure Services

			// Add services to the container.

			builder.Services.AddControllers();
			// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen();
			builder.Services.AddSwaggerGen(option =>
			{
				option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });
				option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
				{
					In = ParameterLocation.Header,
					Description = "Please enter a valid token",
					Name = "Authorization",
					Type = SecuritySchemeType.Http,
					BearerFormat = "JWT",
					Scheme = "Bearer"
				});
				option.AddSecurityRequirement(new OpenApiSecurityRequirement
	{
		{
			new OpenApiSecurityScheme
			{
				Reference = new OpenApiReference
				{
					Type=ReferenceType.SecurityScheme,
					Id="Bearer"
				}
			},
			new string[]{}
		}
	});
			});
			builder.Services.AddDbContext<ApplicationDbContext>(options =>
			{
				options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
			});

			builder.Services.AddAuthentication(opt =>
			{
				opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
			}).AddJwtBearer(options =>
			{
				options.TokenValidationParameters = new TokenValidationParameters
				{
					ValidateIssuer = false,
					ValidateAudience = false,
					ValidateIssuerSigningKey = true,
					IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration.GetSection("Token").Value))
				};
			});

			builder.Services.AddScoped(typeof(IGenericRepository<>),typeof(GenericRepository<>));
			builder.Services.AddScoped(typeof(IAuthRepository<User>), typeof(AuthRepository));
			builder.Services.AddAutoMapper(typeof(MappingProfile));
			builder.Services.AddScoped(typeof(IVaccinationCenterRepository<VaccinationCenter>), typeof(VaccinationCenterRepository));
			builder.Services.AddScoped(typeof(IPatientRepository<User>), typeof(PatientRepository));
			builder.Services.AddScoped(typeof(IvaccineRepo<Vaccine>), typeof(VaccineRepo));
			builder.Services.AddScoped(typeof(IUserRepo<User>), typeof(UserRepo));
			builder.Services.AddScoped(typeof(IReservationRepository<Reservation>), typeof(ReservationRepository));

			var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
			builder.Services.AddCors(options =>
			{
				options.AddPolicy(name: MyAllowSpecificOrigins,
								policy =>
								{
									policy.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
								});
			});

			builder.Services.AddSignalR();

			#endregion

			var app = builder.Build();

			#region Update Database
			using var scope=app.Services.CreateScope();
			var services=scope.ServiceProvider;
			var _dbContext = services.GetRequiredService<ApplicationDbContext>();
			var loggerFactory=services.GetRequiredService<ILoggerFactory>();
			var logger=loggerFactory.CreateLogger<Program>();

			try
			{
				await _dbContext.Database.MigrateAsync();
			}
			catch (Exception ex)
			{
                 Console.Out.WriteLine(ex);
				logger.LogError(ex,"An error has been occured while Applying Migration");

            }
			#endregion

			#region Middlewares
			// Configure the HTTP request pipeline.
			if (app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI();
			}

			app.UseHttpsRedirection();
			app.MapHub<NotificationHub>("/RealTime");
			app.UseCors(MyAllowSpecificOrigins);
			app.UseAuthorization();


			app.MapControllers();
			
			#endregion

			app.Run();
		}
	}
}
