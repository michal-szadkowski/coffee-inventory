using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DataAccess.Entities;

public class Coffee : IEntity
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;
    public string Roaster { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Origin { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}
