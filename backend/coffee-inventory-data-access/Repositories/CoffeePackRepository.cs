using DataAccess.Entities;

namespace DataAccess.Repositories;

public class CoffeePackRepository : BaseRepository<CoffeePack>
{
    public CoffeePackRepository(MongoAccess mongoAccess)
        : base(mongoAccess, "coffeepacks") { }
}
