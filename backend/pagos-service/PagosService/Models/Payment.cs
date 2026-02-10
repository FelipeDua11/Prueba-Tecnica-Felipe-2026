namespace PagosService.Models;

public class Payment
{
    public int Id { get; set; }
    public required string PaymentNumber { get; set; }
    public required string OrderId { get; set; }
    public required string UserId { get; set; }
    public decimal Amount { get; set; }
    public required string Currency { get; set; } = "USD";
    public required string Status { get; set; } // "Pending", "Processing", "Completed", "Failed", "Refunded"
    public required string PaymentMethod { get; set; } // "CreditCard", "PayPal", "BankTransfer"
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    public string? TransactionId { get; set; }
    public string? FailureReason { get; set; }
    public bool IsRefunded { get; set; }
    public DateTime? RefundedAt { get; set; }
}
