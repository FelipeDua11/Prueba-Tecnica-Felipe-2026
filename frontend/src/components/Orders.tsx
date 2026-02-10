import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Orders.css';

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  shippingAddress: string;
  paymentId?: string;
}

const Orders: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/orders/');
      if (!response.ok) {
        throw new Error('Error al cargar pedidos');
      }
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrder = async () => {
    const newOrder = {
      userId: user?.id?.toString() || "1",
      items: [
        {
          productId: "prod_" + Date.now(),
          productName: "Producto Demo",
          quantity: 1,
          unitPrice: 99.99,
          totalPrice: 99.99
        }
      ],
      shippingAddress: "Dirección de prueba"
    };

    try {
      const response = await fetch('http://localhost:8080/api/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      });

      if (!response.ok) {
        throw new Error('Error al crear pedido');
      }

      await fetchOrders();
      setShowCreateForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear pedido');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return '#ffc107';
      case 'processing': return '#17a2b8';
      case 'shipped': return '#007bff';
      case 'delivered': return '#28a745';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h2>Gestión de Pedidos</h2>
        <button 
          className="create-button" 
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          + Nuevo Pedido
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showCreateForm && (
        <div className="create-form">
          <h3>Crear Nuevo Pedido</h3>
          <p>Se creará un pedido de prueba para el usuario actual.</p>
          <div className="form-actions">
            <button className="submit-button" onClick={handleCreateOrder}>
              Crear Pedido
            </button>
            <button 
              className="cancel-button" 
              onClick={() => setShowCreateForm(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading">Cargando pedidos...</div>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>Pedido #{order.orderNumber}</h3>
                <span 
                  className="status-badge" 
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {order.status}
                </span>
              </div>
              
              <div className="order-info">
                <p><strong>ID:</strong> {order.id}</p>
                <p><strong>Usuario ID:</strong> {order.userId}</p>
                <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
                <p><strong>Dirección:</strong> {order.shippingAddress}</p>
                <p><strong>Creado:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>

              <div className="order-items">
                <h4>Items:</h4>
                {order.items.map((item, index) => (
                  <div key={index} className="item">
                    <span>{item.productName}</span>
                    <span>{item.quantity} x ${item.unitPrice.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="order-actions">
                <button className="edit-button">Editar</button>
                <button className="view-button">Ver Detalles</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
