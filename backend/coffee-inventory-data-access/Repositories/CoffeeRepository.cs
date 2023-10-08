using DataAccess.Entities;
using MongoDB.Driver;

namespace DataAccess.Repositories;

public class CoffeeRepository : BaseRepository<Coffee>
{
    public CoffeeRepository(MongoAccess database)
        : base(database, "coffee") { }
}
