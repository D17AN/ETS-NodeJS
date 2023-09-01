using AutoMapper;
using EventTicketSystem.Exceptions;
using EventTicketSystem.Models.DTOs;
using EventTicketSystem.Models.Entities;
using EventTicketSystem.Models.RequestBodies;
using EventTicketSystem.Repositories.UserRepository;
using System.Security.Cryptography;
using System.Text;

namespace EventTicketSystem.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        private static string ComputeSHA256Hash(string input)
        {
            string hash = String.Empty;

            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] inputBytes = Encoding.UTF8.GetBytes(input);
                byte[] hashBytes = sha256.ComputeHash(inputBytes);

                foreach (byte b in hashBytes)
                {
                    hash += $"{b:x2}";
                }

            }
            return hash;
        }

        public async Task<UserDTO> Login(UserLoginRequestBodyDTO userRequestBody)
        {
            User? user = await _userRepository.GetUserByEmail(userRequestBody.Email);

            if (user == null)
            {
                throw new ElementNotFoundException($"No user associated with {userRequestBody.Email} email exists.");
            }

            string possiblePassword = userRequestBody.Password + user.Salt;
            string possibleHashedPassword = ComputeSHA256Hash(possiblePassword);

            if (possibleHashedPassword.ToLower() != user.HashedPassword.ToLower())
            {
                throw new ArgumentException("Invalid password.");
            }

            return _mapper.Map<UserDTO>(user);
        }
    }
}
