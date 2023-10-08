using System.Collections.Immutable;
using DataAccess.Entities;
using MongoDB.Driver;

namespace DataAccess.Repositories;

public class BaseRepository<T> : IRepository<T>
    where T : IEntity
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
        await collection.InsertOneAsync(item);
        return item;
    }

    public async Task<T> Delete(string id)
    {
        var result = await collection.FindOneAndDeleteAsync(x => x.Id == id);
        return result;
    }

    public async Task<T> Get(string id)
    {
        return (await collection.FindAsync(x => x.Id == id)).SingleOrDefault();
    }

    public async Task<T> Get(Func<T, bool> expression)
    {
        return (await collection.FindAsync(x => expression(x))).SingleOrDefault();
    }

    public async Task<List<T>> GetAll()
    {
        return await (await collection.FindAsync(x => true)).ToListAsync();
    }

    public async Task<T> Update(T item)
    {
        var filter = Builders<T>.Filter.Eq(x => x.Id, item.Id);
        await collection.ReplaceOneAsync(filter, item);
        return item;
    }
}
