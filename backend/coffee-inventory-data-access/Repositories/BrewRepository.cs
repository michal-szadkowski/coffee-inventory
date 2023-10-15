using DataAccess.Entities;

namespace DataAccess.Repositories;

public class BrewRepository : BaseRepository<Brew>
{
    public BrewRepository(MongoAccess mongoAccess)
        : base(mongoAccess, "brews") { }
}
