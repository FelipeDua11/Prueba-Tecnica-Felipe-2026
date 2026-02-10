using Microsoft.EntityFrameworkCore;
using PagosService.Models;

namespace PagosService.Data;

public static class SeedData
{
    public static void SeedPayments(ApplicationDbContext context)
    {
        // Check if payments already exist
        if (context.Payments.Any())
        {
            Console.WriteLine("Payments already exist in database");
            return;
        }

        var payments = new List<Payment>
        {
            new Payment
            {
                PaymentNumber = "PAY-001",
                OrderId = "ORD-001",
                UserId = "1", // Admin user
                Amount = 1200.00m,
                Currency = "USD",
                Status = "Completed",
                PaymentMethod = "CreditCard",
                CreatedAt = DateTime.UtcNow.AddDays(-30),
                UpdatedAt = DateTime.UtcNow.AddDays(-29),
                CompletedAt = DateTime.UtcNow.AddDays(-28),
                TransactionId = "TXN-123456789",
                IsRefunded = false
            },
            new Payment
            {
                PaymentNumber = "PAY-002",
                OrderId = "ORD-002",
                UserId = "2", // Regular user
                Amount = 50.00m,
                Currency = "USD",
                Status = "Processing",
                PaymentMethod = "PayPal",
                CreatedAt = DateTime.UtcNow.AddDays(-15),
                UpdatedAt = DateTime.UtcNow.AddDays(-14),
                TransactionId = "TXN-987654321",
                IsRefunded = false
            },
            new Payment
            {
                PaymentNumber = "PAY-003",
                OrderId = "ORD-004",
                UserId = "4", // Employee 1
                Amount = 800.00m,
                Currency = "USD",
                Status = "Completed",
                PaymentMethod = "BankTransfer",
                CreatedAt = DateTime.UtcNow.AddDays(-3),
                UpdatedAt = DateTime.UtcNow.AddDays(-2),
                CompletedAt = DateTime.UtcNow.AddDays(-1),
                TransactionId = "TXN-456789123",
                IsRefunded = false
            },
            new Payment
            {
                PaymentNumber = "PAY-004",
                OrderId = "ORD-005",
                UserId = "5", // Employee 2
                Amount = 75.00m,
                Currency = "USD",
                Status = "Completed",
                PaymentMethod = "CreditCard",
                CreatedAt = DateTime.UtcNow.AddDays(-1),
                UpdatedAt = DateTime.UtcNow,
                CompletedAt = DateTime.UtcNow.AddHours(-12),
                TransactionId = "TXN-789123456",
                IsRefunded = false
            },
            new Payment
            {
                PaymentNumber = "PAY-005",
                OrderId = "ORD-006",
                UserId = "3", // Manager user
                Amount = 195.00m,
                Currency = "USD",
                Status = "Failed",
                PaymentMethod = "CreditCard",
                CreatedAt = DateTime.UtcNow.AddDays(-7),
                UpdatedAt = DateTime.UtcNow.AddDays(-6),
                TransactionId = "TXN-111222333",
                FailureReason = "Insufficient funds",
                IsRefunded = false
            },
            new Payment
            {
                PaymentNumber = "PAY-006",
                OrderId = "ORD-007",
                UserId = "1", // Admin user - refunded payment
                Amount = 300.00m,
                Currency = "USD",
                Status = "Refunded",
                PaymentMethod = "PayPal",
                CreatedAt = DateTime.UtcNow.AddDays(-45),
                UpdatedAt = DateTime.UtcNow.AddDays(-44),
                CompletedAt = DateTime.UtcNow.AddDays(-43),
                TransactionId = "TXN-444555666",
                IsRefunded = true,
                RefundedAt = DateTime.UtcNow.AddDays(-30)
            }
        };

        context.Payments.AddRange(payments);
        context.SaveChanges();
        
        Console.WriteLine($"Seeded {payments.Count} payments successfully");
    }
}
