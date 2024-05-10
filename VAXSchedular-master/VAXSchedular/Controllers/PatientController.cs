using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using VAXSchedular.core.Entities;
using VAXSchedular.core.Repository.Contract;
using VAXSchedular.Dtos;
using VAXSchedular.Helpers;

namespace VAXSchedular.Controllers
{

	public class PatientController : BaseApiController
	{
		private readonly IMapper _mapper;
		private readonly IGenericRepository<User> _patientRepo;
		private readonly IGenericRepository<VaccinationCenter> _vaccCenterRepo;
		private readonly IGenericRepository<Reservation> _reservationRepo;
		private readonly IGenericRepository<Certificate> _certificateRepo;
		private readonly IVaccinationCenterRepository<VaccinationCenter> _vaccinationCenterRepoWithVaccins;
		private readonly IGenericRepository<Vaccine> _vaccineRepo;
		private readonly IPatientRepository<User> _patientRepoWithName;
		private readonly IvaccineRepo<Vaccine> _vacRepo;
		private readonly IUserRepo<User> _userRepo;
		private readonly IReservationRepository<Reservation> _reserveRepoToGetPatient;
		private readonly IGenericRepository<Certificate> _certficateRepo;

		public PatientController(IMapper mapper,
			IGenericRepository<User> PatientRepo,
			IGenericRepository<VaccinationCenter> vaccCenterRepo,
			IGenericRepository<Reservation> reservationRepo,
			IVaccinationCenterRepository<VaccinationCenter> vaccinationCenterRepoWithVaccins,
			IGenericRepository<Vaccine> vaccineRepo, IPatientRepository<User> patientRepoWithName,
			IvaccineRepo<Vaccine> vacRepo, IUserRepo<User> userRepo,IReservationRepository<Reservation> reserveRepoToGetPatient,
			IGenericRepository<Certificate> certficateRepo)
		{
			_mapper = mapper;
			_patientRepo = PatientRepo;
			_vaccCenterRepo = vaccCenterRepo;
			_reservationRepo = reservationRepo;

			_vaccinationCenterRepoWithVaccins = vaccinationCenterRepoWithVaccins;
			_vaccineRepo = vaccineRepo;
			_patientRepoWithName = patientRepoWithName;
			_vacRepo = vacRepo;
			_userRepo = userRepo;
			_reserveRepoToGetPatient = reserveRepoToGetPatient;
			_certficateRepo = certficateRepo;
		}
		[Authorize(Roles = "Patient")]
		[HttpGet("GetAllVaccinationCentersWithVaccines")]
		public async Task<ActionResult<IEnumerable<VaccinationCenterWithVaccinesDto>>> GetAllVaccinationCentersWithVaccines()
		{
			var vaccCenters = await _vaccinationCenterRepoWithVaccins.GetAllWithVaccines();
			if (vaccCenters is null)
				return NotFound();
			var vaccCenterswithVaccinesMapping = _mapper.Map<IEnumerable<VaccinationCenterWithVaccinesDto>>(vaccCenters);
			return Ok(vaccCenterswithVaccinesMapping);
		}



		[Authorize(Roles ="Patient")]
		[HttpPost("Reserve")]
		public async Task<ActionResult<Reservation>> ReserveVaccine(ReservationDto reservationDto)
		{
			var id = Int32.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
			var reservation=await _reserveRepoToGetPatient.GetByForeignPatientId(id,reservationDto.VaccineName);
			var reservationToCreate=new Reservation();
			var vaccine =await  _vacRepo.Get(reservationDto.VaccineName);
			var vaccinationCenter=await _vaccinationCenterRepoWithVaccins.Get(reservationDto.VaccinationCenterName);
			var user = await _patientRepo.Get(id);
			if(reservation is null&&reservationDto.DoseNumber.Equals(DoseNumber.First)||(reservation is not null&& reservationDto.DoseNumber==DoseNumber.First&& reservation.VaccineId!=vaccine.Id))
			{
				reservationToCreate.DoseNumber = reservationDto.DoseNumber;
				reservationToCreate.PatientId = id;
				reservationToCreate.VaccineId=vaccine.Id;
				reservationToCreate.VaccinationCenterId = vaccinationCenter.Id;
				reservationToCreate.ReservationStatus = ReservationStatus.Pending;
				reservationToCreate.Certificate = null;
			}

			if(reservation is null && reservationDto.DoseNumber.Equals(DoseNumber.Second)||(reservation is not null&&reservation.VaccineId!=vaccine.Id && reservationDto.DoseNumber.Equals(DoseNumber.Second)))
			{
				return BadRequest("You Cannot Reserve Second Dose Before First one ya habeby");
			}

			if(reservation is not null&& reservation.DoseNumber==DoseNumber.First&&reservationDto.DoseNumber==DoseNumber.Second)
			{
				if(reservationDto.ReservationDate.Day-reservation.ReservationDate.Day<vaccine.TimeGapBetweenDoses)
				{
					return BadRequest("Please wait untill time gap between doses is reached");
				}
				
				reservationToCreate.DoseNumber = reservationDto.DoseNumber;
				reservationToCreate.PatientId = id;
				reservationToCreate.VaccineId = vaccine.Id;
				reservationToCreate.VaccinationCenterId = vaccinationCenter.Id;
				reservationToCreate.ReservationStatus = ReservationStatus.Pending;
				reservationToCreate.Certificate = null;
			}

			if(reservation is not null&&(reservation.DoseNumber==DoseNumber.Second||reservation.DoseNumber==DoseNumber.First)&&reservationDto.DoseNumber==DoseNumber.First&&reservation.VaccineId==vaccine.Id)
			{
				return BadRequest("You already Reserved Second Dose ya habeby mfesh tany");
			}
			await _reservationRepo.Add(reservationToCreate);

			var reservationToBeBack = new ReservationToBeBack()
			{
				DoseNumber = reservationDto.DoseNumber,
				VaccineName= reservationDto.VaccineName,
				VaccinationCenterName=reservationDto.VaccinationCenterName,
				PatientName=user.Name
			};

			return Ok(reservationToBeBack);


		}

		[Authorize(Roles ="Patient")]
		[HttpGet("getAllReservations")]
		public async Task<ActionResult<IEnumerable<ReservationDtoWithId>>> GetAllReservationsForUser()
		{
			var id = Int32.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
			var patient = await _patientRepo.Get(id);

			var reservations = await _reserveRepoToGetPatient.GetAllByForeignPatientId(id);

			var ReservationsList=new List<ReservationDtoWithId>();
			foreach (var reservation in reservations)
			{
				var vaccine = await _vaccineRepo.Get(reservation.VaccineId);
				var vaccinationCenterName =await  _vaccCenterRepo.Get(reservation.VaccinationCenterId);
				var reservationToBeAdded = new ReservationDtoWithId()
				{
					Id = reservation.Id,
					VaccinationCenterName = vaccinationCenterName.Name,
					VaccineName = vaccine.Name,
					DoseNumber = reservation.DoseNumber,
					ReservationDate = reservation.ReservationDate
				};

			ReservationsList.Add(reservationToBeAdded);
			}

			return Ok(ReservationsList);


		}

		[Authorize(Roles ="Patient")]
		[HttpDelete("DeleteReservation")]
		public async Task<ActionResult> DeleteReservation(int id)
		{
			var deletedEntity = await _reservationRepo .Get(id);
			await _reservationRepo.Delete(deletedEntity);

			return Ok();

		}



		[Authorize(Roles ="Patient")]
		[HttpGet("ViewCertificate")]

		public async Task<ActionResult<CertificateDto>> ViewCertificate(int reservationId)
		{
			var id = Int32.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
			var patient=await _patientRepo.Get(id);

			var reservation=await _reservationRepo.Get(reservationId);

			var certificateDto=new CertificateDto();
			
				if(reservation is not null&&reservation.DoseNumber==DoseNumber.Second&&reservation.ReservationStatus==ReservationStatus.Approved)
				{
					var certificates = await _certficateRepo.GetAll();
					foreach (var cert in certificates)
					{
						if(reservation.Id==cert.ReservationId)
						{
							var vaccinationcenter = await _vaccCenterRepo.Get(reservation.VaccinationCenterId);
							var vaccine = await _vaccineRepo.Get(reservation.VaccineId);

							certificateDto.PatientName = patient.Name;
							certificateDto.VaccinationCenterName = vaccinationcenter.Name;
							certificateDto.VaccineName = vaccine.Name;
							certificateDto.CertificateDate = cert.IssuedAt.ToString();
						}
					}
				}
			return Ok(certificateDto);
		}
	}
}


	

	
