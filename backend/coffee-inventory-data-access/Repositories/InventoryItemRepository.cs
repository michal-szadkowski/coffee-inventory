using DataAccess.Entities;

namespace DataAccess.Repositories;

public class InventoryItemRepository : BaseRepository<InventoryItem>
{
    public InventoryItemRepository(MongoAccess mongoAccess)
        : base(mongoAccess, "inventory") { }
}
