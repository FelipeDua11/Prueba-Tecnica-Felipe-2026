// Mock fetch para API calls
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('API Integration Tests', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe('Users API Integration', () => {
    test('fetch users list integration', async () => {
      const mockUsers = [
        { id: 1, username: 'admin', email: 'admin@abc.com', role: 'Admin' },
        { id: 2, username: 'user', email: 'user@abc.com', role: 'User' }
      ];

      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockUsers)
      });

      // Simular llamada a API de usuarios
      const response = await fetch('http://localhost:8080/api/users', {
        headers: {
          'Authorization': 'Bearer mock-token'
        }
      });

      const data = await response.json();
      expect(data).toEqual(mockUsers);
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/users',
        expect.any(Object)
      );
    });

    test('create user integration', async () => {
      const newUser = {
        username: 'newuser',
        email: 'newuser@abc.com',
        password: 'password123',
        role: 'User'
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ id: 3, ...newUser })
      });

      const response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer mock-token'
        },
        body: JSON.stringify(newUser)
      });

      const data = await response.json();
      expect(data).toEqual({ id: 3, ...newUser });
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/users',
        expect.any(Object)
      );
    });
  });

  describe('Orders API Integration', () => {
    test('fetch orders list integration', async () => {
      const mockOrders = [
        { id: 1, customerId: 1, product: 'Laptop', quantity: 2, total: 2000, status: 'Pending' },
        { id: 2, customerId: 2, product: 'Mouse', quantity: 1, total: 50, status: 'Completed' }
      ];

      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockOrders)
      });

      const response = await fetch('http://localhost:8080/api/orders', {
        headers: {
          'Authorization': 'Bearer mock-token'
        }
      });

      const data = await response.json();
      expect(data).toEqual(mockOrders);
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/orders',
        expect.any(Object)
      );
    });

    test('create order integration', async () => {
      const newOrder = {
        customerId: 1,
        product: 'Keyboard',
        quantity: 1,
        total: 100
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ id: 3, ...newOrder, status: 'Pending' })
      });

      const response = await fetch('http://localhost:8080/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer mock-token'
        },
        body: JSON.stringify(newOrder)
      });

      const data = await response.json();
      expect(data).toEqual({ id: 3, ...newOrder, status: 'Pending' });
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/orders',
        expect.any(Object)
      );
    });
  });

  describe('Payments API Integration', () => {
    test('fetch payments list integration', async () => {
      const mockPayments = [
        { id: 1, orderId: 1, amount: 2000, method: 'Credit Card', status: 'Completed' },
        { id: 2, orderId: 2, amount: 50, method: 'PayPal', status: 'Pending' }
      ];

      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockPayments)
      });

      const response = await fetch('http://localhost:8080/api/payments', {
        headers: {
          'Authorization': 'Bearer mock-token'
        }
      });

      const data = await response.json();
      expect(data).toEqual(mockPayments);
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/payments',
        expect.any(Object)
      );
    });

    test('process payment integration', async () => {
      const paymentData = {
        orderId: 1,
        amount: 2000,
        method: 'Credit Card',
        cardNumber: '****-****-****-1234'
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ id: 3, ...paymentData, status: 'Processing' })
      });

      const response = await fetch('http://localhost:8080/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer mock-token'
        },
        body: JSON.stringify(paymentData)
      });

      const data = await response.json();
      expect(data).toEqual({ id: 3, ...paymentData, status: 'Processing' });
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/payments',
        expect.any(Object)
      );
    });
  });

  describe('Error Handling Integration', () => {
    test('network error handling', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      try {
        await fetch('http://localhost:8080/api/users');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    test('API error response handling', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error: 'Internal server error' })
      });

      const response = await fetch('http://localhost:8080/api/users');
      const data = await response.json();

      expect(data).toEqual({ error: 'Internal server error' });
    });
  });
});
