using EventTicketSystem.Models.Entities;

namespace EventTicketSystem.Repositories.UserRepository
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllUsers();
        Task<User?> GetUserById(long userId);

        Task<User?> GetUserByEmail(string userEmail);
    }
}
