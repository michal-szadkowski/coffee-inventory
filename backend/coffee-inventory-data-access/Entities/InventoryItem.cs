using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace DataAccess.Entities;

public class InventoryItem : IEntity
{
    [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
    public string Id { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public string Roaster { get; set; } = string.Empty;
    public string Origin { get; set; } = string.Empty;

    public decimal Amount { get; set; }
    public decimal Price { get; set; }

    [BsonRepresentation(BsonType.String)]
    public InventoryItemType Type { get; set; }

    public DateOnly StartDate { get; set; }
    public DateOnly? EndDate { get; set; }
}

public enum InventoryItemType
{
    Coffee = 0,
    Other = 1
}
