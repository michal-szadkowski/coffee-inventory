using API.Data;
using AutoMapper;
using DataAccess;
using DataAccess.Entities;
using DataAccess.Repositories;

namespace API.Services;

public class InventoryService
{
    private IRepository<Coffee> coffeeRepo;
    private IRepository<InventoryItem> inventoryRepo;
    private UsageService usage;
    private IMapper mapper;

    public InventoryService(
        IRepository<Coffee> coffeeRepo,
        IRepository<InventoryItem> inventoryRepo,
        UsageService usage,
        IMapper mapper
    )
    {
        this.coffeeRepo = coffeeRepo;
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
        if (
            item.Type == InventoryItemTypeDTO.Other || (await coffeeRepo.Get(item.CoffeeId)) != null
        )
        {
            var result = await inventoryRepo.Create(mapper.Map<InventoryItem>(item));
            var dto = mapper.Map<InventoryItemDTO>(result);

            return (await FillUsages(new List<InventoryItemDTO>() { dto })).First();
        }
        return null;
    }

    public async Task<InventoryItemDTO?> Delete(string id)
    {
        var result = await inventoryRepo.Delete(id);
        var dto = mapper.Map<InventoryItemDTO>(result);

        return (await FillUsages(new List<InventoryItemDTO>() { dto })).First();
    }

    public async Task<InventoryItemDTO?> Update(InventoryItemDTO item)
    {
        ObjectIdValidator.IsValid(item.CoffeeId);
        var result = await inventoryRepo.Update(mapper.Map<InventoryItem>(item));
        var dto = mapper.Map<InventoryItemDTO>(result);
        return (await FillUsages(new List<InventoryItemDTO>() { dto })).First();
    }

    public async Task<List<InventoryItemDTO>> FillUsages(List<InventoryItemDTO> items)
    {
        var usages = await usage.GetTotalUsageOf(items.Select(x => x.Id));
        foreach (var usage in usages)
        {
            var item = items.First(x => x.Id == usage.ItemId);
            item.AmountUsed = usage.Amount;
        }
        return items;
    }
}
