using MongoDB.Bson;

namespace DataAccess;

public static class ObjectIdValidator
{
    public static bool IsValid(string id)
    {
        return ObjectId.TryParse(id, out _);
    }
}
