using MongoDB.Bson;
using MongoDB.Driver;

namespace DataAccess;

public class MongoAccess
{
    public IMongoDatabase Database { get; private set; }

    public MongoAccess(string connectionString, string databaseName)
    {
        var mongoClient = new MongoClient(connectionString);
        var database = mongoClient?.GetDatabase(databaseName);

        if (database == null)
            throw new Exception("Can't access database");

        var isMongoLive = database.RunCommandAsync((Command<BsonDocument>)"{ping:1}").Wait(1000);

        if (isMongoLive == false)
            throw new Exception("Can't access database");

        this.Database = database;
    }
}
