using API.Data;
using AutoMapper;
using DataAccess.Entities;
using DataAccess.Repositories;

namespace API.Services;

public class InventoryService
{
    private readonly IRepository<InventoryItem> inventoryRepo;
    private readonly IMapper mapper;
    private readonly UsageService usage;

    public InventoryService(
        IRepository<InventoryItem> inventoryRepo,
        UsageService usage,
        IMapper mapper
    )
    {
        this.inventoryRepo = inventoryRepo;
        this.usage = usage;
        this.mapper = mapper;
    }

    public async Task<InventoryItemDTO[]> GetAllAvailable()
    {
        throw new NotImplementedException();
    }

    public async Task<InventoryItemDTO[]> GetAll()
    {
        var result = await inventoryRepo.GetAll();
        return (await FillUsages(mapper.Map<List<InventoryItemDTO>>(result))).ToArray();
    }

    public async Task<InventoryItemDTO?> Create(InventoryItemDTO item)
    {
        item.AmountUsed = 0;
        var result = await inventoryRepo.Create(mapper.Map<InventoryItem>(item));
        var dto = mapper.Map<InventoryItemDTO>(result);

        return (await FillUsages(new List<InventoryItemDTO> { dto })).First();
    }

    public async Task<InventoryItemDTO?> Delete(string id)
    {
        var result = await inventoryRepo.Delete(id);
        var dto = mapper.Map<InventoryItemDTO>(result);

        return (await FillUsages(new List<InventoryItemDTO> { dto })).First();
    }

    public async Task<InventoryItemDTO?> Update(InventoryItemDTO item)
    {
        var result = await inventoryRepo.Update(mapper.Map<InventoryItem>(item));
        if (result == null) return default;
        var dto = mapper.Map<InventoryItemDTO>(result);
        return (await FillUsages(new List<InventoryItemDTO> { dto })).First();
    }

    public async Task<List<InventoryItemDTO>> FillUsages(List<InventoryItemDTO> items)
    {
        var usages = await usage.GetTotalUsageOf(items.Select(x => x.Id));
        items.ForEach(x => x.AmountUsed = 0);
        foreach (var usage in usages)
        {
            var item = items.First(x => x.Id == usage.ItemId);
            item.AmountUsed = usage.Amount;
        }

        return items;
    }
}
