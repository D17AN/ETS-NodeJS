using EventTicketSystem.Models.DTOs;
using EventTicketSystem.Models.RequestBodies;

namespace EventTicketSystem.Services.UserService
{
    public interface IUserService
    {
        Task<UserDTO> Login(UserLoginRequestBodyDTO userRequestBody);
    }
}
