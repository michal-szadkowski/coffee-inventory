using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DataAccess.Entities;

public class CoffeePack : IEntity
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    [BsonRepresentation(BsonType.ObjectId)]
    public string CoffeeId { get; set; } = string.Empty;
    public DateOnly StartDate { get; set; }
    public DateOnly? EndDate { get; set; }
    public decimal Weight { get; set; }
    public decimal Price { get; set; }  
}
