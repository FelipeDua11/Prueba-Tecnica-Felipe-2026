using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using PedidosService.Data;
using PedidosService.Models;

namespace PedidosService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly MongoDbContext _context;
    private readonly ILogger<OrdersController> _logger;

    public OrdersController(MongoDbContext context, ILogger<OrdersController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet("health")]
    public IActionResult Health()
    {
        return Ok(new { status = "healthy", service = "pedidos-service", timestamp = DateTime.UtcNow });
    }

    [HttpGet("status")]
    public IActionResult Status()
    {
        return Ok(new { 
            status = "running", 
            service = "pedidos-service",
            version = "1.0.0",
            timestamp = DateTime.UtcNow,
            database = "connected"
        });
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
    {
        var orders = await _context.Orders.Find(_ => true).ToListAsync();
        return Ok(orders);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrder(string id)
    {
        var order = await _context.Orders.Find(o => o.Id == id).FirstOrDefaultAsync();
        if (order == null)
        {
            return NotFound();
        }
        return Ok(order);
    }

    [HttpGet("user/{userId}")]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByUser(string userId)
    {
        var orders = await _context.Orders.Find(o => o.UserId == userId).ToListAsync();
        return Ok(orders);
    }

    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder([FromBody] OrderRequest orderRequest)
    {
        var order = new Order
        {
            UserId = orderRequest.UserId,
            Items = orderRequest.Items,
            TotalAmount = orderRequest.Items.Sum(item => item.TotalPrice),
            ShippingAddress = orderRequest.ShippingAddress,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            Status = "Pending"
        };
        
        // Generate order number after creating the order object
        order.OrderNumber = GenerateOrderNumber();

        await _context.Orders.InsertOneAsync(order);
        return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateOrder(string id, Order order)
    {
        if (id != order.Id)
        {
            return BadRequest();
        }

        order.UpdatedAt = DateTime.UtcNow;
        
        var result = await _context.Orders.ReplaceOneAsync(o => o.Id == id, order);
        if (result.MatchedCount == 0)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateOrderStatus(string id, [FromBody] string status)
    {
        var order = await _context.Orders.Find(o => o.Id == id).FirstOrDefaultAsync();
        if (order == null)
        {
            return NotFound();
        }

        order.Status = status;
        order.UpdatedAt = DateTime.UtcNow;

        var result = await _context.Orders.ReplaceOneAsync(o => o.Id == id, order);
        if (result.MatchedCount == 0)
        {
            return NotFound();
        }

        return Ok(order);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOrder(string id)
    {
        var result = await _context.Orders.DeleteOneAsync(o => o.Id == id);
        if (result.DeletedCount == 0)
        {
            return NotFound();
        }

        return NoContent();
    }

    private static string GenerateOrderNumber()
    {
        return $"ORD-{DateTime.UtcNow:yyyyMMdd}-{Random.Shared.Next(1000, 9999)}";
    }
}
