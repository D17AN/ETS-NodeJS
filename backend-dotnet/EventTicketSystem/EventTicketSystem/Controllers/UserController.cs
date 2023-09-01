using EventTicketSystem.Middlewares.ExceptionHandlingMiddleware;
using EventTicketSystem.Models.DTOs;
using EventTicketSystem.Models.RequestBodies;
using EventTicketSystem.Services.UserService;
using Microsoft.AspNetCore.Mvc;

namespace EventTicketSystem.Controllers
{
    [Route("api")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public UserController(IUserService userService, ILogger<ExceptionHandlingMiddleware> logger) 
        {
            _userService = userService;
            _logger = logger;
        }
        
        [HttpPost("user/login")]
        public async Task<ActionResult<UserDTO>> Login([FromBody] UserLoginRequestBodyDTO userRequestBody)
        {
            UserDTO userDTO = (await _userService.Login(userRequestBody));
            return Ok(userDTO);
        }
    }
}
