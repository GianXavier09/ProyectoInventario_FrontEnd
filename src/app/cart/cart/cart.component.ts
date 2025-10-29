// src/app/cart/cart.component.ts

import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common'; // Necesario para @if, @for, | currency
import { FormsModule } from '@angular/forms'; // Necesario para los inputs de cantidad
import { Router, RouterLink } from '@angular/router'; // Necesario para el botón "Ir a la Tienda"
import { CartItem, CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  // 1. Importamos los módulos que usaremos en el HTML
  imports: [CommonModule, FormsModule, RouterLink], 
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  // Variables para guardar los items y el total
  cartItems: CartItem[] = [];
  total: number = 0;

  // Inyectamos los servicios que necesitamos
  private cartService = inject(CartService);
  private router = inject(Router); // Inyectamos Router para el botón de "Finalizar Compra"

  ngOnInit(): void {
    // Esto es clave: Nos "suscribimos" a los cambios del servicio.
    // Cada vez que el servicio (cartService) cambie, este código se ejecutará
    // y actualizará nuestras variables 'cartItems' y 'total'.
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  // Llama al servicio para calcular el total
  calculateTotal(): void {
    this.total = this.cartService.getTotal();
  }

  // Método para actualizar la cantidad desde el input <input type="number">
  // Usamos (change) en lugar de (ngModel) para simplicidad
  updateQuantity(item: CartItem, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const quantity = parseInt(inputElement.value, 10);
    
    // Validamos que sea un número válido
    if (!isNaN(quantity) && quantity >= 0) {
      this.cartService.updateQuantity(item.product.productid, quantity);
    } else {
      // Si el valor no es válido (ej. "abc"), reseteamos al valor anterior
      inputElement.value = item.quantity.toString();
    }
  }

  // Llama al servicio para remover un item
  removeFromCart(productId: number): void {
    // Pedimos confirmación
    if (confirm('¿Seguro que quieres eliminar este producto del carrito?')) {
      this.cartService.removeFromCart(productId);
    }
  }

  // Llama al servicio para vaciar todo el carrito
  clearCart(): void {
    if (confirm('¿Seguro que quieres vaciar todo el carrito?')) {
      this.cartService.clearCart();
    }
  }

  // Este es el inicio del "PROCESO FINAL"
  proceedToCheckout(): void {
    // Por ahora, solo muestra un mensaje.
    // Más adelante, aquí es donde llamarías al servicio de Backend
    // para procesar la orden y actualizar la BD.
    
    console.log("Iniciando proceso de pago...");
    alert('La función de "Finalizar Compra" aún no está conectada al backend.');

    // Cuando lo implementes con el backend, los pasos serían:
    // 1. Recolectar datos del usuario (dirección, nombre)
    // 2. Crear un objeto "OrderRequestDTO"
    // 3. Llamar a un OrderService (de Angular) que haga el POST al backend
    // 4. Si la respuesta es exitosa (try):
    //    this.cartService.clearCart();
    //    this.router.navigate(['/gracias-por-tu-compra']);
    // 5. Si la respuesta da error (catch):
    //    alert('Error al procesar el pedido: ' + error.message);
  }
}