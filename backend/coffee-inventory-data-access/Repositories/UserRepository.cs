using DataAccess.Entities;

namespace DataAccess.Repositories;

public class UserRepository : BaseRepository<User>
{
    public UserRepository(MongoAccess mongoAccess)
        : base(mongoAccess, "users") { }
}
