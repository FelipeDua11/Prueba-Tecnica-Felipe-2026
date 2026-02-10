# 🌱 Seed Data para Microservicios ABC Company

Este documento explica cómo inicializar los microservicios con datos de ejemplo para facilitar el desarrollo y testing.

## 📋 Microservicios Configurados

### 1. Usuarios Service (PostgreSQL)
**Datos Iniciales:**
- **5 usuarios** con diferentes roles
- Admin: `admin` / `password`
- Usuario: `user` / `password`
- Manager: `manager` / `password`
- Employee1: `employee1` / `password`
- Employee2: `employee2` / `password`

**Campos:**
- Id, Username, Email, Role, CreatedAt, UpdatedAt, IsActive

### 2. Pedidos Service (MongoDB)
**Datos Iniciales:**
- **5 pedidos** con diferentes estados
- Estados: Pending, Processing, Completed, Shipped, Delivered
- Productos variados (Laptops, Mouse, Keyboard, Monitor, Webcam)
- Montos totales: $1200, $50, $195, $800, $75

**Campos:**
- OrderNumber, UserId, Items[], TotalAmount, Status, ShippingAddress, PaymentId

### 3. Pagos Service (PostgreSQL)
**Datos Iniciales:**
- **6 pagos** con diferentes métodos y estados
- Métodos: CreditCard, PayPal, BankTransfer
- Estados: Completed, Processing, Failed, Refunded
- Montos: $1200, $50, $800, $75, $195, $300

**Campos:**
- PaymentNumber, OrderId, UserId, Amount, Currency, Status, PaymentMethod, TransactionId

## 🚀 Uso

### Opción 1: Script Automático (Recomendado)
```bash
cd backend/scripts
./seed-all-services.sh
```

### Opción 2: Manual por Servicio
```bash
# Usuarios Service
cd backend/usuarios-service/UsuariosService
dotnet run

# Pedidos Service
cd backend/pedidos-service/PedidosService
dotnet run

# Pagos Service
cd backend/pagos-service/PagosService
dotnet run
```

## 🔧 Configuración de Bases de Datos

### PostgreSQL (Usuarios y Pagos)
```bash
# Conexiones por defecto:
# Usuarios: Host=localhost;Database=usuarios_db;Username=postgres;Password=password
# Pagos: Host=localhost;Database=pagos_db;Username=postgres;Password=password
```

### MongoDB (Pedidos)
```bash
# Conexión por defecto:
# mongodb://localhost:27017/pedidos_db
```

## 📊 Datos de Demo

### Usuarios Creados:
| ID | Username | Email | Role |
|----|----------|-------|------|
| 1 | admin | admin@abc.com | Admin |
| 2 | user | user@abc.com | User |
| 3 | manager | manager@abc.com | User |
| 4 | employee1 | employee1@abc.com | User |
| 5 | employee2 | employee2@abc.com | User |

### Pedidos Creados:
| Order | User | Status | Total |
|-------|------|--------|-------|
| ORD-001 | Admin | Completed | $1200 |
| ORD-002 | User | Processing | $50 |
| ORD-003 | Manager | Pending | $195 |
| ORD-004 | Employee1 | Shipped | $800 |
| ORD-005 | Employee2 | Delivered | $75 |

### Pagos Creados:
| Payment | Order | Status | Method | Amount |
|---------|-------|--------|--------|--------|
| PAY-001 | ORD-001 | Completed | CreditCard | $1200 |
| PAY-002 | ORD-002 | Processing | PayPal | $50 |
| PAY-003 | ORD-004 | Completed | BankTransfer | $800 |
| PAY-004 | ORD-005 | Completed | CreditCard | $75 |
| PAY-005 | ORD-003 | Failed | CreditCard | $195 |
| PAY-006 | ORD-006 | Refunded | PayPal | $300 |

## 🎯 Beneficios

1. **Datos Realistas**: Información coherente entre servicios
2. **Testing Facilitado**: Datos para pruebas manuales y automáticas
3. **Demo Ready**: Aplicación lista para presentaciones
4. **Desarrollo Ágil**: No requiere creación manual de datos

## ⚠️ Notas

- Los datos se crean solo si la base de datos está vacía
- Ejecutar el script cada vez que se limpien las bases de datos
- Las credenciales de demo son las mismas que en el frontend
