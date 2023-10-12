using System.Collections.Immutable;
using DataAccess.Entities;
using MongoDB.Bson;
using MongoDB.Driver;

namespace DataAccess.Repositories;

public class BaseRepository<T> : IRepository<T>
    where T : class, IEntity
{
    protected IMongoCollection<T> collection;

    public BaseRepository(MongoAccess mongoAccess, string collectionName)
    {
        var collection = mongoAccess.Database?.GetCollection<T>(collectionName);
        if (collection == null)
            throw new Exception("Collection can't be null");
        this.collection = collection;
    }

    public async Task<T> Create(T item)
    {
        item.Id = string.Empty;
        await collection.InsertOneAsync(item);
        return item;
    }

    public async Task<T?> Delete(string id)
    {
        if (ObjectIdValidator.IsValid(id))
        {
            var result = await collection.FindOneAndDeleteAsync(x => x.Id == id);
            return result;
        }
        return default;
    }

    public async Task<T?> Get(string id)
    {
        if (ObjectIdValidator.IsValid(id))
            return (await collection.FindAsync(x => x.Id == id)).SingleOrDefault();
        return default;
    }

    public async Task<T?> Get(Func<T, bool> expression)
    {
        return (await collection.FindAsync(x => expression(x))).SingleOrDefault();
    }

    public async Task<List<T>> GetAll()
    {
        return await (await collection.FindAsync(x => true)).ToListAsync();
    }

    public async Task<T?> Update(T item)
    {
        if (item == null || !ObjectIdValidator.IsValid(item.Id))
            return default;
        string id = item.Id;
        var filter = Builders<T>.Filter.Eq(x => x.Id, id);
        var result = await collection.ReplaceOneAsync(filter, item);
        if (result.IsModifiedCountAvailable && result.ModifiedCount > 0)
            return item;
        else
            return default;
    }
}
