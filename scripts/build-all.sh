#!/bin/bash

# 🏗️ Script para construir todos los servicios de ABC Company
# Autor: ABC Company Dev Team
# Última actualización: Febrero 2026

set -e  # Detener en caso de error

echo "🔨 Construyendo todos los servicios de ABC Company..."
echo "=================================================="

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir mensajes coloreados
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar si estamos en el directorio correcto
if [ ! -f "docker-compose.yml" ]; then
    print_error "docker-compose.yml no encontrado. Por favor ejecuta este script desde la raíz del proyecto."
    exit 1
fi

# 1. Construir Frontend
print_status "📦 Construyendo frontend (React + TypeScript)..."
cd frontend

# Verificar si node_modules existe
if [ ! -d "node_modules" ]; then
    print_status "📥 Instalando dependencias de frontend..."
    npm install
fi

# Construir frontend
npm run build
if [ $? -eq 0 ]; then
    print_success "Frontend construido exitosamente"
else
    print_error "Error construyendo frontend"
    exit 1
fi
cd ..

# 2. Construir Microservicios Backend
services=("usuarios-service" "pedidos-service" "pagos-service")

for service in "${services[@]}"; do
    print_status "🔧 Construyendo microservicio: $service..."
    cd backend/$service
    
    # Verificar si .NET está instalado
    if ! command -v dotnet &> /dev/null; then
        print_error ".NET SDK no encontrado. Por favor instala .NET 8 SDK."
        exit 1
    fi
    
    # Restaurar paquetes
    print_status "📥 Restaurando paquetes NuGet..."
    dotnet restore
    
    # Construir servicio
    dotnet build --configuration Release
    
    if [ $? -eq 0 ]; then
        print_success "$service construido exitosamente"
    else
        print_error "Error construyendo $service"
        exit 1
    fi
    
    cd ../../
done

# 3. Construir imágenes Docker
print_status "🐳 Construyendo imágenes Docker..."
docker-compose build

if [ $? -eq 0 ]; then
    print_success "Imágenes Docker construidas exitosamente"
else
    print_error "Error construyendo imágenes Docker"
    exit 1
fi

# 4. Verificar construcción
print_status "🔍 Verificando construcción..."

# Verificar frontend build
if [ -d "frontend/dist" ]; then
    print_success "✅ Frontend build verificado"
else
    print_warning "⚠️  Frontend build no encontrado"
fi

# Verificar builds de servicios
for service in "${services[@]}"; do
    if [ -d "backend/$service/bin" ]; then
        print_success "✅ $service build verificado"
    else
        print_warning "⚠️  $service build no encontrado"
    fi
done

# Verificar imágenes Docker
images=("abc-frontend" "abc-usuarios-service" "abc-pedidos-service" "abc-pagos-service")
for image in "${images[@]}"; do
    if docker images | grep -q "$image"; then
        print_success "✅ Imagen Docker $image verificada"
    else
        print_warning "⚠️  Imagen Docker $image no encontrada"
    fi
done

echo ""
echo "=================================================="
print_success "🎉 Todos los servicios construidos exitosamente!"
echo ""
echo "🚀 Para iniciar los servicios:"
echo "   docker-compose up -d"
echo ""
echo "📊 Para ver los logs:"
echo "   docker-compose logs -f"
echo ""
echo "🛑 Para detener los servicios:"
echo "   docker-compose down"
echo ""
echo "🌐 Acceso a la aplicación:"
echo "   Frontend: http://localhost:3000"
echo "   Usuarios API: http://localhost:5001"
echo "   Pedidos API: http://localhost:5002"
echo "   Pagos API: http://localhost:5003"
echo "=================================================="
