using Microsoft.Extensions.Options;
using MongoDB.Driver;
using PedidosService.Models;

namespace PedidosService.Data;

public class MongoDbContext
{
    private readonly IMongoDatabase _database;

    public MongoDbContext(IOptions<MongoSettings> mongoSettings)
    {
        var client = new MongoClient(mongoSettings.Value.ConnectionString);
        _database = client.GetDatabase(mongoSettings.Value.DatabaseName);
    }

    public IMongoCollection<Order> Orders => _database.GetCollection<Order>("orders");
}

public class MongoSettings
{
    public required string ConnectionString { get; set; }
    public required string DatabaseName { get; set; }
}
