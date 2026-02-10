# 📁 **Estructura Recomendada del Repositorio**

## 🎯 **Estructura Actual vs Recomendada**

### **📂 Estructura Actual**
```
abc-company/
├── .dockerignore
├── README.md
├── docker-compose.yml
├── arquitectura/
├── backend/
├── docs/
├── frontend/
├── nginx/
├── screenshots/
└── scripts/
```

### **📂 Estructura Recomendada (Según Esquema del Requerimiento)**
```
abc-company/
├── 📄 README.md                    # Documentación principal
├── 📄 docker-compose.yml            # Orquestación completa
├── 📄 .gitignore                   # Ignorar archivos sensibles
├── 📄 .dockerignore                # Ignorar en Docker
│
├── 📂 frontend/                    # Aplicación React
│   ├── 📄 package.json
│   ├── 📄 vite.config.ts
│   ├── 📄 Dockerfile
│   ├── 📂 public/                  # Assets estáticos
│   │   ├── 📄 index.html
│   │   └── 📄 favicon.ico
│   └── 📂 src/                     # Código fuente
│       ├── 📄 App.tsx              # Componente principal
│       ├── 📄 index.tsx            # Entry point
│       ├── 📄 App.css              # Estilos globales
│       ├── 📂 components/          # Componentes UI
│       │   ├── 📄 Dashboard.tsx
│       │   ├── 📄 Login.tsx
│       │   ├── 📄 Sidebar.tsx
│       │   ├── 📄 ThemeToggle.tsx
│       │   ├── 📄 Users.tsx
│       │   ├── 📄 Orders.tsx
│       │   ├── 📄 Payments.tsx
│       │   ├── 📄 ApiData.tsx
│       │   └── 📄 Settings.tsx
│       ├── 📂 contexts/           # React Context
│       │   ├── 📄 AuthContext.tsx
│       │   └── 📄 ThemeProvider.tsx
│       ├── 📂 hooks/              # Custom hooks
│       │   ├── 📄 useAuth.ts
│       │   └── 📄 useTheme.ts
│       ├── 📂 types/              # TypeScript types
│       │   └── 📄 auth.ts
│       └── 📂 styles/             # CSS por componente
│           ├── 📄 Dashboard.css
│           ├── 📄 Login.css
│           ├── 📄 Sidebar.css
│           └── 📄 ThemeToggle.css
│
├── 📂 backend/                     # Microservicios .NET
│   ├── 📂 usuarios-service/        # Gestión de usuarios
│   │   ├── 📄 usuarios-service.csproj
│   │   ├── 📄 Program.cs           # Startup configuration
│   │   ├── 📄 Dockerfile
│   │   ├── 📂 Controllers/         # API Controllers
│   │   │   ├── 📄 UsersController.cs
│   │   │   └── 📄 HealthController.cs
│   │   ├── 📂 Models/             # Entity models
│   │   │   ├── 📄 User.cs
│   │   │   └── 📄 Role.cs
│   │   ├── 📂 Data/               # Database context + Seed
│   │   │   ├── 📄 ApplicationDbContext.cs
│   │   │   └── 📄 SeedData.cs
│   │   └── 📂 DTOs/               # Data Transfer Objects
│   │       ├── 📄 CreateUserDto.cs
│   │       └── 📄 UserDto.cs
│   │
│   ├── 📂 pedidos-service/         # Gestión de pedidos
│   │   ├── 📄 pedidos-service.csproj
│   │   ├── 📄 Program.cs
│   │   ├── 📄 Dockerfile
│   │   ├── 📂 Controllers/
│   │   │   ├── 📄 OrdersController.cs
│   │   │   └── 📄 HealthController.cs
│   │   ├── 📂 Models/
│   │   │   ├── 📄 Order.cs
│   │   │   └── 📄 OrderItem.cs
│   │   ├── 📂 Data/
│   │   │   ├── 📄 MongoDbContext.cs
│   │   │   └── 📄 SeedData.cs
│   │   └── 📂 DTOs/
│   │       ├── 📄 CreateOrderDto.cs
│   │       └── 📄 OrderDto.cs
│   │
│   └── 📂 pagos-service/           # Gestión de pagos
│       ├── 📄 pagos-service.csproj
│       ├── 📄 Program.cs
│       ├── 📄 Dockerfile
│       ├── 📂 Controllers/
│       │   ├── 📄 PaymentsController.cs
│       │   └── 📄 HealthController.cs
│       ├── 📂 Models/
│       │   ├── 📄 Payment.cs
│       │   └── 📄 PaymentMethod.cs
│       ├── 📂 Data/
│       │   ├── 📄 PaymentDbContext.cs
│       │   └── 📄 SeedData.cs
│       └── 📂 DTOs/
│           ├── 📄 CreatePaymentDto.cs
│           └── 📄 PaymentDto.cs
│
├── 📂 arquitectura/                # Documentación técnica
│   ├── 📄 diagrama-arquitectura.drawio
│   ├── 📄 diagrama-arquitectura.png
│   ├── 📄 definicion-microservicios.md
│   ├── 📄 justificacion-tecnologias.md
│   └── 📄 decisiones-tecnicas.md
│
├── 📂 docs/                        # Documentación adicional
│   ├── 📂 api/                     # Documentación API
│   │   ├── 📄 usuarios-api.md
│   │   ├── 📄 pedidos-api.md
│   │   └── 📄 pagos-api.md
│   ├── 📂 deployment/               # Guías de despliegue
│   │   ├── 📄 docker-deployment.md
│   │   ├── 📄 kubernetes-deployment.md
│   │   └── 📄 production-setup.md
│   └── 📂 development/              # Guías de desarrollo
│       ├── 📄 setup-local.md
│       ├── 📄 testing-guide.md
│       └── 📄 contributing.md
│
├── 📂 screenshots/                 # Capturas de pantalla
│   ├── 📄 desktop-dashboard.png
│   ├── 📄 mobile-dashboard.png
│   ├── 📄 dark-mode.png
│   └── 📄 README.md
│
├── 📂 scripts/                     # Scripts de utilidad
│   ├── 📄 seed-all-services.sh     # Inicializar datos
│   ├── 📄 build-all.sh            # Construir todos los servicios
│   ├── 📄 test-all.sh             # Ejecutar todos los tests
│   └── 📄 deploy.sh               # Script de despliegue
│
├── 📂 nginx/                       # Configuración Nginx
│   ├── 📄 nginx.conf              # Configuración principal
│   └── 📄 Dockerfile              # Nginx container
│
└── 📂 k8s/                        # Manifiestos Kubernetes (futuro)
    ├── 📂 frontend/
    ├── 📂 backend/
    └── 📂 databases/
```

---

## 🔄 **Cambios Necesarios**

### **1. Reorganizar Archivos Existentes**

**Mover a `docs/`**:
```bash
# Mover documentación de backend
mv backend/README-SEEDING.md docs/deployment/

# Mover scripts de backend
mv backend/scripts/* scripts/
```

**Reorganizar `frontend/`**:
```bash
# Crear estructura de componentes
mkdir -p frontend/src/styles
mv frontend/src/components/*.css frontend/src/styles/

# Organizar por tipo
mkdir -p frontend/src/contexts frontend/src/hooks frontend/src/types
```

**Limpiar directorios vacíos**:
```bash
# Eliminar directorios vacíos después de reorganización
rmdir docs/development 2>/dev/null || true
```

### **2. Crear Archivos Faltantes**

**`.gitignore` mejorado**:
```gitignore
# Dependencies
node_modules/
*/node_modules/

# Build outputs
dist/
build/
*/bin/
*/obj/

# Environment files
.env
.env.local
.env.production

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Docker
.dockerignore
```

**`scripts/build-all.sh`**:
```bash
#!/bin/bash
echo "🔨 Construyendo todos los servicios..."

# Frontend
echo "📦 Construyendo frontend..."
cd frontend && npm run build && cd ..

# Backend services
echo "🔧 Construyendo microservicios..."
for service in usuarios-service pedidos-service pagos-service; do
    echo "📦 Construyendo $service..."
    cd backend/$service && dotnet build && cd ../..
done

echo "✅ Todos los servicios construidos exitosamente!"
```

### **3. Actualizar `docker-compose.yml`**

**Referencias actualizadas**:
```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - usuarios-service
      - pedidos-service
      - pagos-service

  usuarios-service:
    build: ./backend/usuarios-service
    ports:
      - "5001:80"
    environment:
      - ConnectionStrings__DefaultConnection=Host=postgres-usuarios;Database=abc_usuarios;Username=abc;Password=password123

  # ... otros servicios
```

---

## 🎯 **Beneficios de Esta Estructura**

### **1. Claridad y Organización**
- ✅ Separación clara por dominio
- ✅ Documentación centralizada
- ✅ Scripts de utilidad organizados
- ✅ Configuración de infraestructura aislada

### **2. Escalabilidad**
- ✅ Fácil agregar nuevos microservicios
- ✅ Documentación por componente
- ✅ Scripts automatizados para operaciones
- ✅ Estructura preparada para Kubernetes

### **3. Mantenimiento**
- ✅ Archivos relacionados juntos
- ✅ Scripts reutilizables
- ✅ Documentación accesible
- ✅ Configuración versionada

### **4. Colaboración**
- ✅ Estructura predecible para nuevos devs
- ✅ Documentación completa
- ✅ Scripts para facilitar onboarding
- ✅ Guías de contribución claras

---

## 🚀 **Comandos de Reorganización**

```bash
# 1. Crear estructura de directorios
mkdir -p docs/{api,deployment,development}
mkdir -p scripts
mkdir -p frontend/src/{styles,contexts,hooks,types}
mkdir -p k8s/{frontend,backend,databases}

# 2. Mover archivos existentes
mv backend/README-SEEDING.md docs/deployment/
mv backend/scripts/* scripts/

# 3. Organizar frontend
mv frontend/src/components/*.css frontend/src/styles/

# 4. Crear archivos de configuración
touch scripts/build-all.sh
touch scripts/test-all.sh
touch scripts/deploy.sh
chmod +x scripts/*.sh

# 5. Actualizar documentación
echo "# 🚀 Scripts de Utilidad\n\nScripts para automatizar operaciones comunes del proyecto ABC Company." > scripts/README.md
```

---

## 📋 **Validación Final**

**✅ Checklist de Organización**:
- [ ] Estructura de directorios creada
- [ ] Archivos movidos a ubicaciones correctas
- [ ] Scripts de utilidad configurados
- [ ] Documentación actualizada
- [ ] Docker compose referenciando paths correctos
- [ ] .gitignore actualizado
- [ ] README principal actualizado

**🏆 Resultado Esperado**:
Un repositorio bien organizado, escalable y fácil de mantener que siga las mejores prácticas de la industria y cumpla con los requisitos del proyecto.

---

*Última actualización: Febrero 2026*
