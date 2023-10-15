using API.Data;
using DataAccess.Entities;
using DataAccess.Repositories;

namespace API.Services;

public class UsageService
{
    private IRepository<InventoryItem> inventoryRepo;
    private IRepository<Brew> brewRepo;

    public UsageService(
        IRepository<InventoryItem> inventoryRepository,
        IRepository<Brew> brewRepository
    )
    {
        this.inventoryRepo = inventoryRepository;
        this.brewRepo = brewRepository;
    }

    // Needs rework
    public async Task<List<UsageDTO>> GetTotalUsageOf(IEnumerable<string> ids)
    {
        var outList = new List<UsageDTO>();
        var brews = await brewRepo.GetAll();
        var usages = brews.SelectMany(x => x.Usage).Where(x => ids.Contains(x.ItemId));
        var groups = usages.GroupBy(x => x.ItemId);
        foreach (var grp in groups)
        {
            var sum = grp.Sum(x => x.Amount);
            outList.Add(new UsageDTO() { ItemId = grp.Key, Amount = sum });
        }
        return outList;
    }
}
