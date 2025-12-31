// =============================================================================
// types.ts - Definiciones de Tipos TypeScript
// =============================================================================
// Descripción: Define todas las interfaces y tipos para la tienda Urban Threads.
// Incluye productos (gorras y camisetas), carrito, mensajes y usuarios.
// =============================================================================

/**
 * Categorías de productos disponibles
 */
export enum Category {
  Caps = 'Caps',           // Gorras
  Tshirts = 'T-shirts',    // Camisetas
}

/**
 * Interfaz para productos de la tienda
 */
export interface Product {
  id: string;              // Identificador único
  name: string;            // Nombre del producto
  price: number;           // Precio
  category: Category;      // Categoría (Gorras o Camisetas)
  imageUrl: string;        // URL de la imagen
  description: string;     // Descripción del producto
  isFeatured: boolean;     // Si es producto destacado
}

/**
 * Item del carrito - Extiende Product con cantidad
 */
export interface CartItem extends Product {
  quantity: number;        // Cantidad en el carrito
}

/**
 * Interfaz para mensajes de contacto
 */
export interface ContactSubmission {
  id: string;              // Identificador único
  name: string;            // Nombre del remitente
  email: string;           // Email del remitente
  message: string;         // Contenido del mensaje
  timestamp: string;       // Fecha y hora de envío
}

/**
 * Interfaz para usuarios
 */
export interface User {
  email: string;           // Correo electrónico
  name?: string;           // Nombre (opcional)
  role: 'user' | 'admin';  // Rol del usuario
}
