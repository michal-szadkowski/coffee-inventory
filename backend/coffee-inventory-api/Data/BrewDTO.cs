namespace API.Data;

public class BrewDTO
{
    public string Id { get; set; } = string.Empty;
    public List<UsageDTO> Usage { get; set; } = new List<UsageDTO>();
    public decimal CoffeeOut { get; set; }
    public int TimeInSeconds { get; set; }
    public string Comment { get; set; } = string.Empty;
}

public class UsageDTO
{
    public string ItemId { get; set; } = string.Empty;
    public decimal Amount { get; set; } = 0;
}
