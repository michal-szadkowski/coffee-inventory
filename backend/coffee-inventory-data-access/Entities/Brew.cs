using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DataAccess.Entities;

public class Brew : IEntity
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;
    public List<BrewUsage> CoffeeUsage { get; set; } = new List<BrewUsage>();
    public List<BrewUsage> OtherUsage { get; set; } = new List<BrewUsage>();
}

public class BrewUsage
{
    [BsonRepresentation(BsonType.ObjectId)]
    string Id { get; set; } = string.Empty;
    double Amount { get; set; } = 0;
}
