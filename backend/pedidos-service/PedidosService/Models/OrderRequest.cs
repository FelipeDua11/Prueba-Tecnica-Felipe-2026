namespace PedidosService.Models;

public class OrderRequest
{
    public required string UserId { get; set; }
    public List<OrderItem> Items { get; set; } = new();
    public required string ShippingAddress { get; set; }
}
