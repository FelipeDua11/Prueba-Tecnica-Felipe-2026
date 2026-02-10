# 🚀 **Scripts de Utilidad - ABC Company**

Scripts para automatizar operaciones comunes del proyecto ABC Company Platform.

---

## 📋 **Scripts Disponibles**

### **🔨 build-all.sh**
Construye todos los servicios del proyecto (frontend + backend + Docker).

**Uso**:
```bash
./scripts/build-all.sh
```

**Funcionalidades**:
- ✅ Instala dependencias de frontend (si es necesario)
- ✅ Construye aplicación React
- ✅ Construye los 3 microservicios .NET
- ✅ Construye imágenes Docker
- ✅ Verificación de construcción
- ✅ Output coloreado y detallado

**Prerrequisitos**:
- Node.js 18+
- .NET 8 SDK
- Docker Desktop
- Docker Compose

---

### **🧪 test-all.sh** (Próximamente)
Ejecuta todos los tests del proyecto.

**Uso**:
```bash
./scripts/test-all.sh
```

**Funcionalidades**:
- ✅ Tests unitarios de frontend (Jest)
- ✅ Tests E2E de frontend (Cypress)
- ✅ Tests unitarios de backend (xUnit)
- ✅ Tests de integración
- ✅ Reporte de cobertura

---

### **🚀 deploy.sh** (Próximamente)
Despliega la aplicación en producción.

**Uso**:
```bash
./scripts/deploy.sh [environment]
```

**Entornos**:
- `dev` - Desarrollo
- `staging` - Staging
- `prod` - Producción

---

### **🌱 seed-all-services.sh**
Inicializa las bases de datos con datos de prueba.

**Uso**:
```bash
./scripts/seed-all-services.sh
```

**Funcionalidades**:
- ✅ Crea usuarios de demostración
- ✅ Inserta pedidos de ejemplo
- ✅ Agrega métodos de pago
- ✅ Verificación de datos insertados

---

## 🛠️ **Desarrollo de Scripts**

### **Estándares de Código**
- **Shebang**: `#!/bin/bash`
- **Error Handling**: `set -e` para detener en errores
- **Colores**: ANSI color codes para mejor UX
- **Logging**: Mensajes estructurados con timestamps
- **Validación**: Verificación de prerrequisitos

### **Plantilla para Nuevos Scripts**
```bash
#!/bin/bash

# 📝 Descripción del script
# Autor: ABC Company Dev Team
# Última actualización: Fecha

set -e  # Detener en caso de error

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Funciones de utilidad
print_status() { echo -e "${BLUE}[INFO]${NC} $1"; }
print_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
print_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Lógica del script
# ...

print_success "✅ Script ejecutado exitosamente"
```

---

## 🔧 **Mantenimiento**

### **Actualización de Scripts**
1. **Versionar cambios**: Actualizar fecha en comentarios
2. **Testing**: Probar en diferentes entornos
3. **Documentación**: Actualizar README.md
4. **Permisos**: Asegurar `chmod +x` para scripts ejecutables

### **Troubleshooting Común**

**Permiso denegado**:
```bash
chmod +x scripts/nombre-script.sh
```

**Comando no encontrado**:
```bash
# Verificar PATH
echo $PATH

# Ejecutar desde raíz del proyecto
./scripts/nombre-script.sh
```

**Error de Docker**:
```bash
# Verificar Docker Desktop
docker --version
docker-compose --version

# Reiniciar Docker Desktop
```

---

## 📊 **Métricas de Uso**

### **Scripts más utilizados**:
1. `build-all.sh` - Construcción completa
2. `seed-all-services.sh` - Inicialización de datos
3. `test-all.sh` - Ejecución de tests

### **Tiempo de ejecución estimado**:
- `build-all.sh`: 5-10 minutos
- `test-all.sh`: 3-5 minutos
- `seed-all-services.sh`: 1-2 minutos
- `deploy.sh`: 10-20 minutos

---

## 🤝 **Contribución**

### **Cómo agregar nuevos scripts**:
1. **Crear script** en directorio `scripts/`
2. **Hacer ejecutable**: `chmod +x scripts/nuevo-script.sh`
3. **Documentar**: Agregar sección en este README
4. **Testing**: Probar en local y CI/CD
5. **Commit**: Seguir convención de commits

### **Revisión de código**:
- Validar manejo de errores
- Verificar compatibilidad cross-platform
- Revisar documentación
- Testear con diferentes inputs

---

## 📞 **Soporte**

Para ayuda con los scripts:
- **Issues**: GitHub Issues del proyecto
- **Documentation**: Ver README principal del proyecto
- **Team**: Contactar al equipo de DevOps

---

*Última actualización: Febrero 2026*
