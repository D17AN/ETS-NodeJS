using EventTicketSystem.Models;
using EventTicketSystem.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace EventTicketSystem.Repositories.UserRepository
{
    public class UserRepository : IUserRepository
    {
        private readonly EventTicketSystemContext _dbContext;

        public UserRepository(EventTicketSystemContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await _dbContext.Users.ToListAsync();
        }

        public async Task<User?> GetUserByEmail(string userEmail)
        {
            User? user = await _dbContext.Users.FirstOrDefaultAsync(user => user.UserEmail == userEmail);
            
            return user;
        }

        public async Task<User?> GetUserById(long userId)
        {
            User? user = await _dbContext.Users.FirstOrDefaultAsync(user => user.UserId == userId);

            return user;
        }
    }
}
