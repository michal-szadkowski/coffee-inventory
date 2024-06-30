using DataAccess.Entities;
using MongoDB.Driver;

namespace DataAccess.Repositories;

public class BaseRepository<T> : IRepository<T>
    where T : class, IEntity
{
    protected readonly IMongoCollection<T> Collection;

    protected BaseRepository(MongoAccess mongoAccess, string collectionName)
    {
        var collection = mongoAccess.Database?.GetCollection<T>(collectionName);
        Collection = collection ?? throw new Exception("Collection can't be null");
    }

    public async Task<T> Create(T item)
    {
        item.Id = string.Empty;
        await Collection.InsertOneAsync(item);
        return item;
    }

    public async Task<T?> Delete(string id)
    {
        if (!ObjectIdValidator.IsValid(id)) return default;
        var result = await Collection.FindOneAndDeleteAsync(x => x.Id == id);
        return result;
    }

    public async Task<T?> Get(string id)
    {
        return ObjectIdValidator.IsValid(id)
            ? (await Collection.FindAsync(x => x.Id == id)).SingleOrDefault()
            : default;
    }

    public async Task<T?> Get(Func<T, bool> expression)
    {
        return (await Collection.FindAsync(x => expression(x))).SingleOrDefault();
    }

    public async Task<List<T>> GetAll()
    {
        return await (await Collection.FindAsync(x => true)).ToListAsync();
    }

    public async Task<T?> Update(T item)
    {
        if (!ObjectIdValidator.IsValid(item.Id))
            return default;
        var id = item.Id;
        var filter = Builders<T>.Filter.Eq(x => x.Id, id);
        var result = await Collection.ReplaceOneAsync(filter, item);
        return result.MatchedCount > 0 ? item : default;
    }
}