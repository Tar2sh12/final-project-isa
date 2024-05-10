using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;
using VAXSchedular.core.Entities;
using VAXSchedular.core.Repository.Contract;
using VAXSchedular.Dtos;
using VAXSchedular.SignalR;

namespace VAXSchedular.Controllers
{

	public class VaccinaationCenterController : BaseApiController
	{
		private readonly IGenericRepository<VaccinationCenter> _vaccinationCenterRepo;
		private readonly IGenericRepository<Reservation> _reservationRepo;
		private readonly IGenericRepository<User> _patientRepo;
		private readonly IVaccinationCenterRepository<VaccinationCenter> _vaccCenterRepo;
		private readonly IReservationRepository<Reservation> _reserveRepoWithVaccinesMany;
		private readonly IGenericRepository<Certificate> _certificateRepo;
		private readonly IGenericRepository<Vaccine> _vaccineRepo;
		private readonly IHubContext <NotificationHub> _notificationHub;

		public VaccinaationCenterController(IGenericRepository<VaccinationCenter> vaccinationCenterRepo,IGenericRepository<Reservation> reservationRepo,IGenericRepository<User> patientRepo,IVaccinationCenterRepository<VaccinationCenter> vaccCenterRepo,IReservationRepository<Reservation> reserveRepoWithVaccinesMany,IGenericRepository<Certificate> certificateRepo,IGenericRepository<Vaccine> vaccineRepo,IHubContext<NotificationHub> notificationHub)
        {
			_vaccinationCenterRepo = vaccinationCenterRepo;
			_reservationRepo = reservationRepo;
			_patientRepo = patientRepo;
			_vaccCenterRepo = vaccCenterRepo;
			_reserveRepoWithVaccinesMany = reserveRepoWithVaccinesMany;
			_certificateRepo = certificateRepo;
			_vaccineRepo = vaccineRepo;
			_notificationHub = notificationHub;
		}


		//[Authorize(Roles = "Vaccination Center")]
		//[HttpPut("ApproveReservationStatus")]

		//public async Task<ActionResult> ApproveVaccinationCenter()
		//{
		//	var id = Int32.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
		//	var reservations= await _reservationRepo.GetAll();
			

		//	foreach(var reservation in reservations)
		//	{
		//		if (reservation.VaccinationCenterId == id)
		//		{
		//			reservation.ReservationStatus = ReservationStatus.Approved;
		//			await _reservationRepo.Update(reservation);
		//		}
		//	}
		//	return Ok();
		//}

[Authorize(Roles = "Vaccination Center")]
        [HttpPut("ApproveReservationById")]
        public async Task<ActionResult>ApproveReservationById(int id)
        {
            var vaxId = Int32.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var vaccinationCenter = await _vaccinationCenterRepo.Get(vaxId);
            var reservation = await _reservationRepo.Get(id);
            var vaccine = await _vaccineRepo.Get(reservation.VaccineId);
            if (reservation.VaccinationCenterId == vaxId)
            {
                reservation.ReservationStatus = ReservationStatus.Approved;
                await _reservationRepo.Update(reservation);
                await _notificationHub.Clients.All.SendAsync(reservation.PatientId.ToString(), $"You reservation number.{reservation.Id} on {vaccine.Name} ,Dose:{reservation.DoseNumber} has been approved by {vaccinationCenter.Name}");

            }
            return Ok();
        }


	[Authorize(Roles = "Vaccination Center")]
    [HttpPut("RejectReservationById")]
    public async Task<ActionResult> RejectReservationById(int id)
    {
        var vaxId = Int32.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        var reservation = await _reservationRepo.Get(id);
        var vaccine =await  _vaccineRepo.Get(reservation.VaccineId);
        var vaccinationCenter = await _vaccinationCenterRepo.Get(vaxId);
        if (reservation.VaccinationCenterId == vaxId)
        {
            reservation.ReservationStatus = ReservationStatus.Rejected;
            await _reservationRepo.Update(reservation);
            await _notificationHub.Clients.All.SendAsync(reservation.PatientId.ToString(), $"You reservation number.{reservation.Id} on {vaccine.Name} ,Dose:{reservation.DoseNumber} has been rejected by {vaccinationCenter.Name}");

        }
        return Ok();
    }


        [Authorize(Roles ="Vaccination Center")]
		[HttpGet("ViewPatientsAssociatedWithVaccine")]
		public async Task<ActionResult<IEnumerable<PatientDto>>> GetPatientsWithItsVaccines()
		{
			var id = Int32.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
			var vaccinationCenter=await _vaccCenterRepo.Get(id);

			var patientsDto=new List<PatientDto>();
			foreach(var vaccine in vaccinationCenter.Vaccines)
			{
				var reservations=await _reserveRepoWithVaccinesMany.GetAllForSpecficVaacine(vaccine.Id);
				foreach(var reservation in reservations)
				{
					var user = await _patientRepo.Get(reservation.PatientId);
					
					var patientDto=new PatientDto()
					{
						Id=reservation.Id,
						Email = user.Email,
						Name = user.Name,
						PhoneNumber=user.PhoneNumber,
						Address = user.Address,
						VaccineName=vaccine.Name,
						DoseNumber=reservation.DoseNumber
					};
					patientsDto.Add(patientDto);
					

				}
			}
			return Ok(patientsDto);

		}

		[Authorize(Roles = "Vaccination Center")]
		[HttpPost("createCertificateForSpecficUserSecondDose")]
		public async Task<ActionResult> CreateCertificate(int id)
		{
			var reservation=await _reservationRepo.Get(id);
			if(reservation.DoseNumber==DoseNumber.Second&&reservation.ReservationStatus==ReservationStatus.Approved)
			{
				var certificate = new Certificate()
				{
					ReservationId = reservation.Id,
					Reservation = reservation
				};
				await _certificateRepo.Add(certificate);
			}
			else
			{
				return BadRequest("You Cannot create certificate for this reservation Now");
			}
					
			return Ok();
		}






		



    }
}
