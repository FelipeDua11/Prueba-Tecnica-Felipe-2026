# Definición de Microservicios - ABC Company

## 🏗️ **Arquitectura General**

La plataforma ABC Company implementa una arquitectura de microservicios escalable y desacoplada, siguiendo los principios de Domain-Driven Design (DDD) y patrones de microservicios modernos.

---

## 📋 **Microservicios Implementados**

### 1. **Servicio de Usuarios** (`usuarios-service`)

**Responsabilidad Principal**: Gestión de identidades y accesos
- Autenticación y autorización
- CRUD de usuarios
- Gestión de roles y permisos
- Perfiles de usuario

**Stack Tecnológico**:
- **Runtime**: .NET 8 (ASP.NET Core Web API)
- **Base de Datos**: PostgreSQL 15
- **ORM**: Entity Framework Core
- **Contenedor**: Docker Alpine Linux

**Endpoints Principales**:
```
GET    /health          - Health check del servicio
GET    /status         - Estado detallado del servicio
GET    /api/users      - Listar usuarios
POST   /api/users      - Crear usuario
GET    /api/users/{id} - Obtener usuario por ID
PUT    /api/users/{id} - Actualizar usuario
DELETE /api/users/{id} - Eliminar usuario
```

**Justificación PostgreSQL para Usuarios**:
- **ACID Compliance**: Integridad transaccional crítica para datos de usuarios
- **Consistencia Fuerte**: Requerido para autenticación/autorización
- **Relaciones Complejas**: Usuarios → Roles → Permisos
- **Performance**: Índices eficientes para consultas de autenticación
- **Madurez**: Ecosistema robusto de herramientas y monitoreo

---

### 2. **Servicio de Pedidos** (`pedidos-service`)

**Responsabilidad Principal**: Gestión del ciclo de vida de pedidos
- Creación y seguimiento de pedidos
- Gestión de estados del pedido
- Cálculo de totales y descuentos
- Historial de pedidos por cliente

**Stack Tecnológico**:
- **Runtime**: .NET 8 (ASP.NET Core Web API)
- **Base de Datos**: MongoDB 7
- **Driver**: MongoDB .NET Driver
- **Contenedor**: Docker Alpine Linux

**Endpoints Principales**:
```
GET    /health              - Health check del servicio
GET    /status             - Estado detallado del servicio
GET    /api/orders         - Listar pedidos
POST   /api/orders         - Crear pedido
GET    /api/orders/{id}    - Obtener pedido por ID
PUT    /api/orders/{id}    - Actualizar pedido
DELETE /api/orders/{id}    - Eliminar pedido
GET    /api/orders/user/{userId} - Pedidos por usuario
```

**Justificación MongoDB para Pedidos**:
- **Flexibilidad de Esquema**: Estructuras de pedido variables (items, metadatos)
- **Performance Escritura**: Optimizado para alta frecuencia de creación de pedidos
- **Escalabilidad Horizontal**: Sharding natural por cliente/fecha
- **Datos Semi-estructurados**: Items con atributos variables
- **Consultas Complejas**: Agregaciones para reportes y analytics

---

### 3. **Servicio de Pagos** (`pagos-service`)

**Responsabilidad Principal**: Procesamiento de transacciones financieras
- Procesamiento de pagos
- Gestión de métodos de pago
- Estados de transacción
- Conciliación financiera

**Stack Tecnológico**:
- **Runtime**: .NET 8 (ASP.NET Core Web API)
- **Base de Datos**: PostgreSQL 15
- **ORM**: Entity Framework Core
- **Contenedor**: Docker Alpine Linux

**Endpoints Principales**:
```
GET    /health              - Health check del servicio
GET    /status             - Estado detallado del servicio
GET    /api/payments        - Listar pagos
POST   /api/payments        - Crear pago
GET    /api/payments/{id}   - Obtener pago por ID
PUT    /api/payments/{id}   - Actualizar estado de pago
POST   /api/payments/{id}/refund - Procesar reembolso
GET    /api/payments/order/{orderId} - Pagos por pedido
```

**Justificación PostgreSQL para Pagos**:
- **Consistencia ACID**: Crítico para transacciones financieras
- **Integridad Referencial**: Pagos → Pedidos → Usuarios
- **Auditoría**: Logs transaccionales inmutables
- **Regulaciones Cumplimiento**: Requerimientos de persistencia financiera
- **Consultas Analíticas**: Reportes financieros complejos

---

## 🔄 **Modelo de Comunicación entre Servicios**

### **Comunicación Síncrona (REST API)**

**Patrón Implementados**:
- **API Gateway**: (Opcional) Punto de entrada único
- **Service Discovery**: (Futuro) Registro y descubrimiento dinámico
- **Circuit Breaker**: (Futuro) Tolerancia a fallos

**Flujo de Comunicación**:
```
Frontend → API Gateway → Microservicio → Base de Datos
    ↓
Direct API Calls (JSONPlaceholder)
```

**Formato de Comunicación**:
- **Protocolo**: HTTP/1.1 (REST)
- **Formato**: JSON
- **Autenticación**: JWT Bearer Tokens
- **Versioning**: URL Versioning (/api/v1/)

### **Comunicación Asíncrona (Futuro)**

**Patrones Planeados**:
- **Event-Driven Architecture**: Domain Events
- **Message Queue**: RabbitMQ/Azure Service Bus
- **Event Sourcing**: (Opcional) Para auditoría completa

**Eventos de Dominio**:
```
UsuarioCreado
PedidoCreado
PagoProcesado
PedidoActualizado
PagoReembolsado
```

---

## 🐳 **Estrategia de Contenerización**

### **Principios Docker**:
- **Single Responsibility**: Un proceso por contenedor
- **Immutability**: Imágenes base reproducibles
- **Ephemerality**: Contenedores desechables
- **Configuration**: Inyección de variables de entorno

### **Arquitectura de Contenedores**:
```
┌─────────────────────────────────────────────────────────────┐
│                   Docker Network                        │
├─────────────────────────────────────────────────────────────┤
│  Frontend (Nginx)     │  API Gateway (Opcional)      │
├─────────────────────────────────────────────────────────────┤
│  Usuarios Service       │  Pedidos Service             │
│  + PostgreSQL          │  + MongoDB                   │
├─────────────────────────────────────────────────────────────┤
│  Pagos Service         │  Monitoring (Opcional)       │
│  + PostgreSQL          │  + Logs/Metrics              │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 **Métricas y Monitoreo**

### **Health Checks**:
- **Liveness**: ¿Está vivo el servicio?
- **Readiness**: ¿Está listo para recibir tráfico?
- **Dependencies**: ¿Están disponibles las dependencias?

### **Métricas Recopiladas**:
- **Performance**: Tiempo de respuesta, throughput
- **Business**: Pedidos por minuto, tasa de éxito
- **Infraestructura**: CPU, memoria, disco
- **Errores**: 4xx, 5xx, excepciones

---

## 🔮 **Roadmap de Evolución**

### **Fase 1 (Actual)**: MVP Funcional
- ✅ Microservicios básicos
- ✅ Persistencia independiente
- ✅ Dockerización completa

### **Fase 2 (Corto Plazo)**: Integración
- 🔄 Comunicación entre servicios
- 🔄 API Gateway implementado
- 🔄 Service Discovery

### **Fase 3 (Mediano Plazo)**: Escalabilidad
- 📈 Message Queue para eventos
- 📈 Caching distribuido
- 📈 Load Balancing avanzado

### **Fase 4 (Largo Plazo)**: Optimización
- 🚀 Event Sourcing
- 🚀 CQRS pattern
- 🚀 Auto-scaling

---

## 🎯 **Decisiones Arquitectónicas Clave**

### **1. Polyglot Persistence**
- **Razón**: Cada dominio tiene diferentes requisitos de datos
- **Beneficio**: Optimización específica por caso de uso

### **2. Database per Service**
- **Razón**: Desacoplamiento y autonomía de equipos
- **Beneficio**: Escalabilidad independiente

### **3. API First Design**
- **Razón**: Contratos claros entre frontend y backend
- **Beneficio**: Desarrollo paralelo y testing independiente

### **4. Container-Native**
- **Razón**: Portabilidad y reproducibilidad
- **Beneficio**: Despliegue consistente ambientes

---

*Última actualización: Febrero 2026*
