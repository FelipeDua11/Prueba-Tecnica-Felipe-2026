using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PagosService.Data;
using PagosService.Models;

namespace PagosService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<PaymentsController> _logger;

    public PaymentsController(ApplicationDbContext context, ILogger<PaymentsController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet("health")]
    public IActionResult Health()
    {
        return Ok(new { status = "healthy", service = "pagos-service", timestamp = DateTime.UtcNow });
    }

    [HttpGet("status")]
    public IActionResult Status()
    {
        return Ok(new { 
            status = "running", 
            service = "pagos-service",
            version = "1.0.0",
            timestamp = DateTime.UtcNow,
            database = _context.Database.CanConnect() ? "connected" : "disconnected"
        });
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Payment>>> GetPayments()
    {
        return await _context.Payments.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Payment>> GetPayment(int id)
    {
        var payment = await _context.Payments.FindAsync(id);
        if (payment == null)
        {
            return NotFound();
        }
        return payment;
    }

    [HttpGet("order/{orderId}")]
    public async Task<ActionResult<IEnumerable<Payment>>> GetPaymentsByOrder(string orderId)
    {
        var payments = await _context.Payments.Where(p => p.OrderId == orderId).ToListAsync();
        return Ok(payments);
    }

    [HttpGet("user/{userId}")]
    public async Task<ActionResult<IEnumerable<Payment>>> GetPaymentsByUser(string userId)
    {
        var payments = await _context.Payments.Where(p => p.UserId == userId).ToListAsync();
        return Ok(payments);
    }

    [HttpPost]
    public async Task<ActionResult<Payment>> CreatePayment(Payment payment)
    {
        payment.PaymentNumber = GeneratePaymentNumber();
        payment.CreatedAt = DateTime.UtcNow;
        payment.UpdatedAt = DateTime.UtcNow;
        payment.Status = "Pending";
        payment.IsRefunded = false;

        _context.Payments.Add(payment);
        await _context.SaveChangesAsync();

        // Simulate payment processing
        _ = Task.Run(async () => await ProcessPaymentAsync(payment.Id));

        return CreatedAtAction(nameof(GetPayment), new { id = payment.Id }, payment);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePayment(int id, Payment payment)
    {
        if (id != payment.Id)
        {
            return BadRequest();
        }

        payment.UpdatedAt = DateTime.UtcNow;
        _context.Entry(payment).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!PaymentExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdatePaymentStatus(int id, [FromBody] string status)
    {
        var payment = await _context.Payments.FindAsync(id);
        if (payment == null)
        {
            return NotFound();
        }

        payment.Status = status;
        payment.UpdatedAt = DateTime.UtcNow;

        if (status == "Completed")
        {
            payment.CompletedAt = DateTime.UtcNow;
            payment.TransactionId = GenerateTransactionId();
        }

        var result = await _context.SaveChangesAsync();
        if (result == 0)
        {
            return NotFound();
        }

        return Ok(payment);
    }

    [HttpPost("{id}/refund")]
    public async Task<IActionResult> RefundPayment(int id)
    {
        var payment = await _context.Payments.FindAsync(id);
        if (payment == null)
        {
            return NotFound();
        }

        if (payment.Status != "Completed")
        {
            return BadRequest("Only completed payments can be refunded");
        }

        payment.Status = "Refunded";
        payment.IsRefunded = true;
        payment.RefundedAt = DateTime.UtcNow;
        payment.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return Ok(payment);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePayment(int id)
    {
        var payment = await _context.Payments.FindAsync(id);
        if (payment == null)
        {
            return NotFound();
        }

        _context.Payments.Remove(payment);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool PaymentExists(int id)
    {
        return _context.Payments.Any(e => e.Id == id);
    }

    private static string GeneratePaymentNumber()
    {
        return $"PAY-{DateTime.UtcNow:yyyyMMdd}-{Random.Shared.Next(1000, 9999)}";
    }

    private static string GenerateTransactionId()
    {
        return $"TXN-{Guid.NewGuid():N}";
    }

    private async Task ProcessPaymentAsync(int paymentId)
    {
        // Simulate payment processing delay
        await Task.Delay(Random.Shared.Next(2000, 5000));

        using var scope = HttpContext.RequestServices.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        
        var payment = await context.Payments.FindAsync(paymentId);
        if (payment != null && payment.Status == "Pending")
        {
            // Simulate success/failure (90% success rate)
            var isSuccess = Random.Shared.NextDouble() > 0.1;
            
            payment.Status = isSuccess ? "Completed" : "Failed";
            payment.UpdatedAt = DateTime.UtcNow;
            
            if (isSuccess)
            {
                payment.CompletedAt = DateTime.UtcNow;
                payment.TransactionId = GenerateTransactionId();
            }
            else
            {
                payment.FailureReason = "Payment processing failed";
            }

            await context.SaveChangesAsync();
        }
    }
}
