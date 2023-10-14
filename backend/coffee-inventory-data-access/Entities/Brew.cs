using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace DataAccess.Entities;

public class Brew : IEntity
{
    [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
    public string Id { get; set; } = string.Empty;
    public DateTime Time { get; set; }
    public List<Usage> Usage { get; set; } = new List<Usage>();
    public decimal CoffeeOut { get; set; }
    public int TimeInSeconds { get; set; }
    public string Comment { get; set; } = string.Empty;
}

public class Usage
{
    public string ItemId { get; set; } = string.Empty;
    public decimal Amount { get; set; } = 0;
}
