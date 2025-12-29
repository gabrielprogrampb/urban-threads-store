export enum Category {
  Caps = 'Caps',
  Tshirts = 'T-shirts',
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  imageUrl: string;
  description: string;
  isFeatured: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export interface User {
  email: string;
  name?: string;
  role: 'user' | 'admin';
}
