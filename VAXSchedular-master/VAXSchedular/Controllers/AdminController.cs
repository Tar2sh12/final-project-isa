using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using VAXSchedular.core.Entities;
using VAXSchedular.core.Repository.Contract;
using VAXSchedular.Dtos;

namespace VAXSchedular.Controllers
{
    [Authorize(Roles ="Admin")]
    public class AdminController : BaseApiController
    {
        private readonly IGenericRepository<User> _userRepo;
        private readonly IGenericRepository<Vaccine> _vaccineRepo;
        private readonly IGenericRepository<VaccinationCenter> _vacinationCenterRepo;
        private readonly IMapper _mapper;

        public AdminController(IGenericRepository<User> userRepo, IGenericRepository<Vaccine> vaccineRepo, IGenericRepository<VaccinationCenter> vacinationCenterRepo, IMapper mapper)
        {
            _userRepo = userRepo;
            _vaccineRepo = vaccineRepo;
            _vacinationCenterRepo = vacinationCenterRepo;
            _mapper = mapper;
        }

        [HttpGet("GetAllVaccinationCenters")]
        public async Task<ActionResult<IEnumerable<VaccinationCenterDetails>>>GetAllVaccinationCenters()
        {
            var vaxCenter = await _vacinationCenterRepo.GetAll();

            if(vaxCenter == null)
            {
                return NotFound("No Vaccination center is found");
            }

            var mappedVax=_mapper.Map<IEnumerable <VaccinationCenterDetails>>(vaxCenter);
            return Ok(mappedVax);
        }
        
        [HttpGet("GetAllPatients")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers()
        {
            var users = await _userRepo.GetAll();
            var mappedUsers=new List<UserDto>();

            if (users == null)
                return NotFound("No Users Found");

			foreach (var user in users)
			{
				if (user.UserRoleId==2)
                {
					var mappedUser = _mapper.Map<UserDto>(user);
                      mappedUsers.Add(mappedUser);
				}
			}
			return Ok(mappedUsers);
        }

        

        [HttpGet("GetByID")]
        public async Task<ActionResult<VaccinationCenterDtoToReturn>> GetByID(int id)
        {
            var vaxCenter= await _vacinationCenterRepo.Get(id);
            if(vaxCenter == null)
                return NotFound("No Vaccination center is found");

            var mappedVax = _mapper.Map<VaccinationCenterDtoToReturn>(vaxCenter);

            return Ok(mappedVax);
        }

        [HttpPost("CreateVaccinationCenter")]
        public async Task<ActionResult> CreateVaccinationCenterAsync(VaccinationCenterDto dto)
        {
            if (dto == null)
            {
                return BadRequest();
            }

            var mappedVaxCenter = _mapper.Map<VaccinationCenter>(dto);
            mappedVaxCenter.UserRoleId = 3;

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(dto.Password, out passwordHash, out passwordSalt);

            mappedVaxCenter.PasswordHash= passwordHash;
            mappedVaxCenter.PasswordSalt= passwordSalt;
            mappedVaxCenter.Status = true;

            await _vacinationCenterRepo.Add(mappedVaxCenter);

           
            return Ok();
        }
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        [HttpPut("UpdateVaccinationCenter")]
        public async Task<ActionResult>UpdateVaccinationCenter(VaccinationCenterDetails dto)
        {
            var vax=await _vacinationCenterRepo.Get(dto.Id);
            vax.PhoneNumber = dto.PhoneNumber;
            vax.Address = dto.Address;
            vax.Email = dto.Email;
            vax.Name = dto.Name;
            await _vacinationCenterRepo.Update(vax);
            return Ok();
        }



        [HttpDelete("DeleteVaccinationById")]
        public async Task<ActionResult<VaccinationCenterDto>>DeleteById(int id)
        {
            var vaxCenter = await _vacinationCenterRepo.Get(id);

            if (vaxCenter == null)
                return NotFound("No Vaccination center is found");
            await _vacinationCenterRepo.Delete(vaxCenter);
            return Ok(vaxCenter);

        }

        /*[HttpPut("ApproveUser")]
        public async Task<ActionResult>ApproveUsers()
        {
            var users=await _userRepo.GetAll();
            foreach (var user in users)
            {
                if(user.UserRoleId!=1)     
                      user.Status=true;
                await _userRepo.Update(user);
            }
            return Ok();
        }*/


        [HttpPut("ApproveUserById")]
        public async Task<ActionResult>ApproveUserById(int id)
        {
            var user=await _userRepo.Get(id);
            if(user.UserRoleId!=1&&user.UserRoleId!=3)
                user.Status=true;
            await _userRepo.Update(user);
            return Ok();
            
        }


        [HttpPut("RejectUserById")]
        public async Task<ActionResult> RejectUserById(int id)
        {
            var user = await _userRepo.Get(id);
            if (user.UserRoleId != 1&&user.UserRoleId!=3)
            {
				user.Status = false;
				await _userRepo.Delete(user);
			}

            return Ok();

        }



        [HttpPost("CreateVaccine")]
        public async Task<ActionResult<VaccineDto>> CreateVaccine(VaccineDto dto)
        {
            if (dto is null)
                return BadRequest("Please enter missing Data");

            var vaccine=_mapper.Map<Vaccine>(dto);

            await _vaccineRepo.Add(vaccine);

            return Ok(dto);
        }


        [HttpGet("getAllVaccines")]
        public async Task<ActionResult<IEnumerable<VaccineDtoById>>> GetAllVaccines()
        {
           
            var vaccines = await _vaccineRepo.GetAll();
            if(vaccines is null)
                return NotFound("Cannot found any vaccines to return");

            var mappedVaccines=_mapper.Map<IEnumerable<VaccineDtoById>>(vaccines);
            return Ok(mappedVaccines);
        }


        [HttpGet("GetVaccineById")]
        public async Task<ActionResult<VaccineDto>> GetVaccineById(int id)
        {
            var vaccine= await _vaccineRepo.Get(id);
            if (vaccine is null)
                return NotFound("Cannot dound vaccine By associated Id");
            var mappedVaccine=_mapper.Map<VaccineDto>(vaccine);

            return Ok(mappedVaccine);
        }

        [HttpPut("UpdateVaccine")]
        public async Task<ActionResult<VaccineDto>> UpdateVaccine(VaccineDtoById dto)
        {
            if (dto is null)
                return BadRequest("Enter Valid Data");

            var Vaccine = await _vaccineRepo.Get(dto.Id);
            if (dto is null)
                return NotFound("No vaccine by this id");
            Vaccine.Name = dto.Name;
            Vaccine.Description = dto.Description;
            Vaccine.PreCautions = dto.PreCautions;
            Vaccine.Price = dto.Price;
            Vaccine.QuantityAvalible = dto.QuantityAvalible;
            Vaccine.TimeGapBetweenDoses = dto.TimeGapBetweenDoses;
            Vaccine.VaccinationCenterId = dto.VaccinationCenterId;


            await _vaccineRepo.Update(Vaccine);

            return Ok(Vaccine);

        }

        [HttpDelete("DeleteVaccine")]
        public async Task<ActionResult> DeleteVaccine(int id)
        {
            var vaccineToDelete= await _vaccineRepo.Get(id);

            if(vaccineToDelete is null)
                return NotFound("No vaccine is found to delete");

           await _vaccineRepo.Delete(vaccineToDelete);

            return Ok();
        }

    }
}
