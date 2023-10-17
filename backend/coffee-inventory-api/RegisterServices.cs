using API.Services;
using DataAccess;
using DataAccess.Entities;
using DataAccess.Repositories;
using MongoDB.Driver;

namespace API;

public static class RegisterServices
{
    public static void RegisterDataAccessServices(
        this IServiceCollection collection,
        Settings? settings
    )
    {
        if (settings == null)
            throw new Exception("Missing settings section");

        collection.AddSingleton(
            x => new MongoAccess(settings.MongoDBConnection, settings.MongoDBDatabase)
        );

        collection.AddSingleton<IRepository<Coffee>, CoffeeRepository>();
        collection.AddSingleton<IRepository<InventoryItem>, InventoryItemRepository>();
        collection.AddSingleton<IRepository<Brew>, BrewRepository>();
        collection.AddSingleton<IRepository<User>, UserRepository>();
        
        collection.AddSingleton<InventoryService>();
        collection.AddSingleton<UsageService>();
    }
}
