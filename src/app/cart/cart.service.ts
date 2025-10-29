// src/app/cart/cart.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductListDTO } from '../dashboard/product/product';

export interface CartItem {
  product: ProductListDTO;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItemsSource = new BehaviorSubject<CartItem[]>(this.getCartItemsFromStorage());
  cartItems$ = this.cartItemsSource.asObservable();

  constructor() { }

  private getCartItemsFromStorage(): CartItem[] {
    const itemsJson = localStorage.getItem('cartItems');
    return itemsJson ? JSON.parse(itemsJson) : [];
  }

  private saveCartItemsToStorage(items: CartItem[]): void {
    localStorage.setItem('cartItems', JSON.stringify(items));
    this.cartItemsSource.next(items);
  }

  // --- REVISA QUE ESTA FUNCIÓN ESTÉ AQUÍ ---
  /**
   * Agrega un producto al carrito.
   * Si ya existe, aumenta la cantidad.
   */
  addToCart(product: ProductListDTO, quantity: number = 1): void {
    const currentItems = this.cartItemsSource.getValue();
    const existingItem = currentItems.find(item => item.product.productid === product.productid);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentItems.push({ product, quantity });
    }
    this.saveCartItemsToStorage(currentItems);
    alert('¡Producto agregado al carrito!');
  }
  // --- HASTA AQUÍ ---

  removeFromCart(productId: number): void {
    const currentItems = this.cartItemsSource.getValue().filter(item => item.product.productid !== productId);
    this.saveCartItemsToStorage(currentItems);
  }

  updateQuantity(productId: number, quantity: number): void {
    const currentItems = this.cartItemsSource.getValue();
    const item = currentItems.find(item => item.product.productid === productId);

    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.saveCartItemsToStorage(currentItems);
      }
    }
  }

  getTotal(): number {
    return this.cartItemsSource.getValue().reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  clearCart(): void {
    localStorage.removeItem('cartItems');
    this.cartItemsSource.next([]);
  }
}