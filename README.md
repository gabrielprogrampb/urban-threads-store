# 👕 Urban Threads Store

Tienda online de moda urbana especializada en gorras y camisetas.

## 📋 Descripción

Urban Threads Store es una plataforma e-commerce para una tienda de ropa urbana. Incluye catálogo de productos, carrito de compras, proceso de checkout, y un panel de administración completo.

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **Vite** - Build tool
- **React Router DOM** - Navegación SPA
- **Framer Motion** - Animaciones
- **Tailwind CSS** - Framework de estilos
- **Context API** - Estado global

## 📁 Estructura del Proyecto

```
urban-threads-store/
├── components/
│   ├── admin/              # Componentes de administración
│   ├── Header.tsx          # Navegación principal
│   ├── Footer.tsx          # Pie de página
│   └── Cart.tsx            # Carrito de compras
├── context/
│   ├── CartContext.tsx     # Estado del carrito
│   ├── AuthContext.tsx     # Autenticación
│   └── ProductContext.tsx  # Datos de productos
├── data/                   # Datos de productos
├── pages/
│   ├── HomePage.tsx        # Página de inicio
│   ├── ShopPage.tsx        # Catálogo
│   ├── ProductDetailPage.tsx # Detalle de producto
│   ├── CheckoutPage.tsx    # Proceso de compra
│   ├── AccountPage.tsx     # Cuenta del usuario
│   ├── FAQPage.tsx         # Preguntas frecuentes
│   └── admin/              # Páginas de admin
├── App.tsx                 # Componente principal
├── index.tsx               # Punto de entrada
└── types.ts                # Definiciones de tipos
```

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd urban-threads-store
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

## ✨ Funcionalidades

### Para Clientes
- **Catálogo de productos** - Gorras y camisetas
- **Carrito de compras** - Agregar y gestionar productos
- **Proceso de checkout** - Finalizar compra
- **Cuenta de usuario** - Ver pedidos

### Para Administradores
- **Dashboard** - Vista general
- **Gestión de productos** - CRUD completo
- **Gestión de mensajes** - Ver contactos

## 📦 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run preview` | Previsualiza el build |

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
