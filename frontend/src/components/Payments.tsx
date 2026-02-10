import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Payments.css';

interface Payment {
  id: number;
  orderId: string;
  userId: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
}

const Payments: React.FC = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/payments/');
      if (!response.ok) {
        throw new Error('Error al cargar pagos');
      }
      const data = await response.json();
      setPayments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePayment = async () => {
    const newPayment = {
      orderId: "order_" + Date.now(),
      userId: user?.id?.toString() || "1",
      amount: 99.99,
      currency: "USD",
      paymentMethod: "Credit Card"
    };

    try {
      const response = await fetch('http://localhost:8080/api/payments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPayment),
      });

      if (!response.ok) {
        throw new Error('Error al crear pago');
      }

      await fetchPayments();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear pago');
    }
  };

  const handleProcessPayment = async (paymentId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/payments/${paymentId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Completed' }),
      });

      if (!response.ok) {
        throw new Error('Error al procesar pago');
      }

      await fetchPayments();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar pago');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return '#ffc107';
      case 'processing': return '#17a2b8';
      case 'completed': return '#28a745';
      case 'failed': return '#dc3545';
      case 'refunded': return '#6f42c1';
      default: return '#6c757d';
    }
  };

  const getPaymentIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case 'credit card': return '💳';
      case 'debit card': return '💳';
      case 'paypal': return '🅿️';
      case 'bank transfer': return '🏦';
      default: return '💰';
    }
  };

  return (
    <div className="payments-container">
      <div className="payments-header">
        <h2>Gestión de Pagos</h2>
        <button className="create-button" onClick={handleCreatePayment}>
          + Nuevo Pago
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Cargando pagos...</div>
      ) : (
        <div className="payments-grid">
          {payments.map((payment) => (
            <div key={payment.id} className="payment-card">
              <div className="payment-header">
                <div className="payment-icon">
                  {getPaymentIcon(payment.paymentMethod)}
                </div>
                <div className="payment-info">
                  <h3>Pago #{payment.id}</h3>
                  <span 
                    className="status-badge" 
                    style={{ backgroundColor: getStatusColor(payment.status) }}
                  >
                    {payment.status}
                  </span>
                </div>
              </div>
              
              <div className="payment-details">
                <div className="amount">
                  <span className="currency">{payment.currency}</span>
                  <span className="value">${payment.amount.toFixed(2)}</span>
                </div>
                
                <div className="payment-meta">
                  <p><strong>Método:</strong> {payment.paymentMethod}</p>
                  <p><strong>Orden:</strong> {payment.orderId}</p>
                  <p><strong>Usuario:</strong> {payment.userId}</p>
                  {payment.transactionId && (
                    <p><strong>Transacción:</strong> {payment.transactionId}</p>
                  )}
                  <p><strong>Fecha:</strong> {new Date(payment.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="payment-actions">
                {payment.status === 'Pending' && (
                  <button 
                    className="process-button" 
                    onClick={() => handleProcessPayment(payment.id)}
                  >
                    Procesar Pago
                  </button>
                )}
                <button className="view-button">Ver Detalles</button>
                {payment.status === 'Completed' && (
                  <button className="refund-button">Reembolsar</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Payments;
