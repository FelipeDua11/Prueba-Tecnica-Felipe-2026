using Microsoft.EntityFrameworkCore;
using UsuariosService.Models;

namespace UsuariosService.Data;

public static class SeedData
{
    public static void SeedUsers(ApplicationDbContext context)
    {
        // Check if users already exist
        if (context.Users.Any())
        {
            Console.WriteLine("Users already exist in database");
            return;
        }

        var users = new List<User>
        {
            new User
            {
                Username = "admin",
                Email = "admin@abc.com",
                Role = "Admin",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsActive = true
            },
            new User
            {
                Username = "user",
                Email = "user@abc.com",
                Role = "User",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsActive = true
            },
            new User
            {
                Username = "manager",
                Email = "manager@abc.com",
                Role = "User",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsActive = true
            },
            new User
            {
                Username = "employee1",
                Email = "employee1@abc.com",
                Role = "User",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsActive = true
            },
            new User
            {
                Username = "employee2",
                Email = "employee2@abc.com",
                Role = "User",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsActive = true
            }
        };

        context.Users.AddRange(users);
        context.SaveChanges();
        
        Console.WriteLine($"Seeded {users.Count} users successfully");
    }
}
