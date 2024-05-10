using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VAXSchedular.core.Entities;
using VAXSchedular.core.Repository.Contract;
using VAXSchedular.Dtos;

namespace VAXSchedular.Controllers
{

	public class UserRoleController : BaseApiController
	{

	
			private readonly IGenericRepository<UserRole> _roleRepo;

			public UserRoleController(IGenericRepository<UserRole> roleRepo)
			{
				_roleRepo = roleRepo;
			}


			[HttpPost("create")]
			public async Task<ActionResult> CreateUserType(UserRoleDto userRole)
			{
				if (userRole == null)
				{
					return BadRequest();
				}

				var role = new UserRole()
				{
					Name = userRole.Name
				};

				await _roleRepo.Add(role);

				return Ok();


			}

		}
	}

