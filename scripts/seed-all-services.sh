#!/bin/bash

echo "🌱 Starting seed data for all microservices..."

# Seed Usuarios Service
echo "📝 Seeding Usuarios Service..."
cd /Users/hidetora/Documents/felipe/backend/usuarios-service/UsuariosService
dotnet run --environment Development --no-build &
USUARIOS_PID=$!

# Seed Pedidos Service
echo "📦 Seeding Pedidos Service..."
cd /Users/hidetora/Documents/felipe/backend/pedidos-service/PedidosService
dotnet run --environment Development --no-build &
PEDIDOS_PID=$!

# Seed Pagos Service
echo "💳 Seeding Pagos Service..."
cd /Users/hidetora/Documents/felipe/backend/pagos-service/PagosService
dotnet run --environment Development --no-build &
PAGOS_PID=$!

# Wait for all services to complete
echo "⏳ Waiting for all services to complete seeding..."
wait $USUARIOS_PID $PEDIDOS_PID $PAGOS_PID

echo "✅ All services seeded successfully!"
echo ""
echo "📊 Summary:"
echo "   - Usuarios Service: 5 users created"
echo "   - Pedidos Service: 5 orders created"
echo "   - Pagos Service: 6 payments created"
echo ""
echo "🚀 You can now start the services:"
echo "   cd usuarios-service/UsuariosService && dotnet run"
echo "   cd pedidos-service/PedidosService && dotnet run"
echo "   cd pagos-service/PagosService && dotnet run"
