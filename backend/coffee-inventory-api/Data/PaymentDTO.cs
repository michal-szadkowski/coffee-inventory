namespace API.Data;

public class PaymentDTO
{
    public string Id { get; set; } = string.Empty;
    public string UserId { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public decimal Amount { get; set; }
}
