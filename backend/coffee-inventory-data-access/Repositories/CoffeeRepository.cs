using DataAccess.Entities;

namespace DataAccess.Repositories;

public class CoffeeRepository : BaseRepository<Coffee>
{
    public CoffeeRepository(MongoAccess database)
        : base(database, "coffee") { }
}
