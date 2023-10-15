namespace API.Data;

public class InventoryItemDTO
{
    public string Id { get; set; } = string.Empty;

    public string CoffeeId { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;

    public InventoryItemTypeDTO Type { get; set; }

    public DateOnly StartDate { get; set; }
    public DateOnly? EndDate { get; set; }

    public decimal Amount { get; set; }
    public decimal AmountUsed { get; set; }
    public decimal Price { get; set; }
}

public enum InventoryItemTypeDTO
{
    Coffee = 0,
    Other = 1
}
