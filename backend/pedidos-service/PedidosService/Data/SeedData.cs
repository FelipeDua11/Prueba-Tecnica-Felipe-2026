using MongoDB.Driver;
using MongoDB.Bson;
using PedidosService.Models;

namespace PedidosService.Data;

public static class SeedData
{
    public static async Task SeedOrdersAsync(IMongoDatabase database)
    {
        var ordersCollection = database.GetCollection<Order>("orders");
        
        // Check if orders already exist
        var existingOrders = await ordersCollection.CountDocumentsAsync(new BsonDocument());
        if (existingOrders > 0)
        {
            Console.WriteLine("Orders already exist in database");
            return;
        }

        var orders = new List<Order>
        {
            new Order
            {
                OrderNumber = "ORD-001",
                UserId = "1", // Admin user
                Items = new List<OrderItem>
                {
                    new OrderItem
                    {
                        ProductId = "PROD-001",
                        ProductName = "Laptop Dell XPS 15",
                        Quantity = 1,
                        UnitPrice = 1200.00m,
                        TotalPrice = 1200.00m
                    }
                },
                TotalAmount = 1200.00m,
                Status = "Completed",
                ShippingAddress = "123 Main St, City, State 12345",
                PaymentId = "PAY-001",
                CreatedAt = DateTime.UtcNow.AddDays(-30),
                UpdatedAt = DateTime.UtcNow.AddDays(-29)
            },
            new Order
            {
                OrderNumber = "ORD-002",
                UserId = "2", // Regular user
                Items = new List<OrderItem>
                {
                    new OrderItem
                    {
                        ProductId = "PROD-002",
                        ProductName = "Wireless Mouse Logitech",
                        Quantity = 2,
                        UnitPrice = 25.00m,
                        TotalPrice = 50.00m
                    }
                },
                TotalAmount = 50.00m,
                Status = "Processing",
                ShippingAddress = "456 Oak Ave, Town, State 67890",
                PaymentId = "PAY-002",
                CreatedAt = DateTime.UtcNow.AddDays(-15),
                UpdatedAt = DateTime.UtcNow.AddDays(-14)
            },
            new Order
            {
                OrderNumber = "ORD-003",
                UserId = "3", // Manager user
                Items = new List<OrderItem>
                {
                    new OrderItem
                    {
                        ProductId = "PROD-003",
                        ProductName = "Mechanical Keyboard RGB",
                        Quantity = 1,
                        UnitPrice = 150.00m,
                        TotalPrice = 150.00m
                    },
                    new OrderItem
                    {
                        ProductId = "PROD-004",
                        ProductName = "USB-C Hub 7-in-1",
                        Quantity = 1,
                        UnitPrice = 45.00m,
                        TotalPrice = 45.00m
                    }
                },
                TotalAmount = 195.00m,
                Status = "Pending",
                ShippingAddress = "789 Pine Rd, Village, State 11223",
                PaymentId = null,
                CreatedAt = DateTime.UtcNow.AddDays(-7),
                UpdatedAt = DateTime.UtcNow.AddDays(-6)
            },
            new Order
            {
                OrderNumber = "ORD-004",
                UserId = "4", // Employee 1
                Items = new List<OrderItem>
                {
                    new OrderItem
                    {
                        ProductId = "PROD-005",
                        ProductName = "Monitor 27\" 4K",
                        Quantity = 1,
                        UnitPrice = 800.00m,
                        TotalPrice = 800.00m
                    }
                },
                TotalAmount = 800.00m,
                Status = "Shipped",
                ShippingAddress = "321 Elm St, City, State 54321",
                PaymentId = "PAY-003",
                CreatedAt = DateTime.UtcNow.AddDays(-3),
                UpdatedAt = DateTime.UtcNow.AddDays(-2)
            },
            new Order
            {
                OrderNumber = "ORD-005",
                UserId = "5", // Employee 2
                Items = new List<OrderItem>
                {
                    new OrderItem
                    {
                        ProductId = "PROD-006",
                        ProductName = "Webcam HD 1080p",
                        Quantity = 1,
                        UnitPrice = 75.00m,
                        TotalPrice = 75.00m
                    }
                },
                TotalAmount = 75.00m,
                Status = "Delivered",
                ShippingAddress = "654 Maple Dr, Town, State 98765",
                PaymentId = "PAY-004",
                CreatedAt = DateTime.UtcNow.AddDays(-1),
                UpdatedAt = DateTime.UtcNow
            }
        };

        await ordersCollection.InsertManyAsync(orders);
        Console.WriteLine($"Seeded {orders.Count} orders successfully");
    }
}
