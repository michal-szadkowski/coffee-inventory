using DataAccess.Entities;

namespace DataAccess.Repositories;

public class OtherItemRepository : BaseRepository<OtherItem>
{
    public OtherItemRepository(MongoAccess mongoAccess)
        : base(mongoAccess, "otheritems") { }
}
