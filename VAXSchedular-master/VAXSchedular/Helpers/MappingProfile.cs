using AutoMapper;
using VAXSchedular.core.Entities;
using VAXSchedular.Dtos;

namespace VAXSchedular.Helpers
{
	public class MappingProfile:Profile
	{
        public MappingProfile()
        {
            CreateMap<UserRole, UserRoleDto>();
            CreateMap<RegisterDto, User>();
            CreateMap<VaccinationCenterDto, VaccinationCenter>().ReverseMap();
            CreateMap<VaccinationCenterDetails, VaccinationCenter>().ReverseMap();
            CreateMap<VaccineDto, Vaccine>().ReverseMap();
            CreateMap<Vaccine, VaccineDtoById>();
            CreateMap<VaccinationCenter,VaccinationCenterWithVaccinesDto>();
            CreateMap<Reservation,ReservationDto>();
            CreateMap<User, Patient>();
            CreateMap<VaccinationCenter,VaccinationCenterDtoToReturn>();
            CreateMap<VaccinationCenterDto, VaccinationCenterDtoToReturn>();
            CreateMap<UserRole,UserRoleWithIdDto>();

            CreateMap<User, UserDto>();

        }
    }
}
