using MongoDB.Driver;

namespace DataAccess;

public class MongoAccess
{
    public IMongoDatabase Database { get; private set; }

    public MongoAccess(string connectionString, string databaseName)
    {
        var mongoClient = new MongoClient(connectionString);
        var database = mongoClient.GetDatabase(databaseName);
        this.Database = database;
    }
}
