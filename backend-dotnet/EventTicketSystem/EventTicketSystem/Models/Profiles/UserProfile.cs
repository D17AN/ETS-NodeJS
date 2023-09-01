using AutoMapper;
using EventTicketSystem.Models.DTOs;
using EventTicketSystem.Models.Entities;

namespace EventTicketSystem.Models.AutoMappers
{
    public class UserProfile : Profile
    {
        public UserProfile() 
        {
            CreateMap<User, UserDTO>();
        }
    }
}
