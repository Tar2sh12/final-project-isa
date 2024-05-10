using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VAXSchedular.core.Entities;
using VAXSchedular.core.Repository.Contract;
using VAXSchedular.Dtos;

namespace VAXSchedular.Controllers
{
		public class AccountController : BaseApiController
		{
			private readonly IAuthRepository<User> _authRepo;
		private readonly IGenericRepository<User> _userRepo;
			private readonly IGenericRepository<UserRole> _userRoleRepo;
			private readonly IConfiguration _configuration;
			private readonly IMapper _mapper;

			public AccountController(IAuthRepository<User> authRepo, IGenericRepository<User> userRepo, IGenericRepository<UserRole> userRoleRepo, IConfiguration configuration, IMapper mapper)
			{
				_authRepo = authRepo;
				_userRepo = userRepo;
				_userRoleRepo = userRoleRepo;
				_configuration = configuration;
				_mapper = mapper;
			}

			[HttpPost("login")]
			public async Task<ActionResult> Login(LoginDto userForLoginDto)
			{
				var token = await _authRepo.Login(userForLoginDto.Email.ToLower(), userForLoginDto.Password);

				if (token == null)
				{
					return Unauthorized("incorrect Email and Password or You Not Approved yet");
				}

				return Ok(token);

			}

			
			[HttpGet("register")]
			public async Task<ActionResult<IEnumerable<UserRoleWithIdDto>>> GetAllRoles()
			{
				var roles = await _userRoleRepo.GetAll();

				var returnedRoles = _mapper.Map<IEnumerable<UserRoleWithIdDto>>(roles);
				return Ok(returnedRoles);
			}
			[HttpPost("register")]
			public async Task<ActionResult<User>> Register([FromBody] RegisterDto userForRegisterDto)
			{

				userForRegisterDto.Email = userForRegisterDto.Email.ToLower();
				if (await _authRepo.UserExist(userForRegisterDto.Email))
				{
					return BadRequest("Email already exists");
				}
			if (userForRegisterDto.UserRoleId == 1 || userForRegisterDto.UserRoleId == 3)
			{
				return BadRequest("Only Patients can register");

			}
			   var mappedUser=_mapper.Map<User>(userForRegisterDto);

				var user = await _authRepo.Register(mappedUser, userForRegisterDto.Password);

				return Ok(user);

			}


		}



	}

