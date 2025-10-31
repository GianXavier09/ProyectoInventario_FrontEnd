import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core'; // 1. Importar ChangeDetectorRef
import { CartService, CartItem } from '../cart.service';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { Router, RouterLink } from '@angular/router'; 

import { OrderService, OrderItemDTO, OrderRequestDTO } from '../../order/order.service';
import { AuthService } from '../../auth/auth.service'; // Importamos AuthService

@Component({
  selector: 'app-cart',
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterLink], 
  templateUrl: './cart.component.html', // Apunta al HTML que ya tienes
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  cartItems: CartItem[] = [];
  total: number = 0;
  compraExitosa = false; // Variable para mostrar/ocultar la vista de éxito

  // --- Inyección de Servicios ---
  private cartService = inject(CartService);
  private router = inject(Router);
  private orderService = inject(OrderService);
  private authService = inject(AuthService);

  // 2. Inyectar el ChangeDetectorRef
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    // Nos suscribimos a los items del carrito
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal(): void {
    this.total = this.cartService.getTotal();
  }

  updateQuantity(item: CartItem, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const quantity = parseInt(inputElement.value, 10);
    
    if (!isNaN(quantity) && quantity >= 0) {
      this.cartService.updateQuantity(item.product.productid, quantity);
    } else {
      // Si el valor no es válido, reseteamos al valor anterior
      inputElement.value = item.quantity.toString();
    }
  }

  removeFromCart(productId: number): void {
    if (confirm('¿Seguro que quieres eliminar este producto del carrito?')) {
      this.cartService.removeFromCart(productId);
    }
  }

  clearCart(): void {
    if (confirm('¿Seguro que quieres vaciar todo el carrito?')) {
      this.cartService.clearCart();
    }
  }

  /**
   * Este es el método que se llama al "Finalizar Compra"
   */
  proceedToCheckout(): void {
    
    if (this.cartItems.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    // 3. Usamos el nombre de usuario del token (asumiendo que auth.service.ts tiene getUserName())
    const customerName = prompt("Ingresa tu nombre completo:", this.authService.getUserName() || "");
    const shippingAddress = prompt("Ingresa tu dirección de envío:");

    if (!customerName || !shippingAddress) {
      alert("El nombre y la dirección son obligatorios para continuar.");
      return;
    }

    // Convertimos los items del carrito al formato DTO que espera el backend
    const itemsDTO: OrderItemDTO[] = this.cartItems.map(item => ({
      productId: item.product.productid,
      quantity: item.quantity
    }));

    // Creamos el DTO principal
    const orderRequest: OrderRequestDTO = {
      customerName: customerName,
      shippingAddress: shippingAddress,
      items: itemsDTO
    };

    console.log("Enviando orden al backend:", orderRequest);

    // Llamamos al servicio que hace el POST al backend
    this.orderService.placeOrder(orderRequest).subscribe({
      
      // BLOQUE DE ÉXITO (next):
      next: (response) => {
        console.log("Orden creada con éxito:", response);
        
        this.cartService.clearCart(); // Vaciamos el carrito del localStorage
        this.compraExitosa = true;    // Ponemos la variable de éxito en true
        
        // ¡LA MAGIA! Forzamos a Angular a que actualice la vista AHORA
        this.cdr.detectChanges();
      },
      
      // BLOQUE DE ERROR (error):
      // Esto arregla el error "[object Object]" / "Error desconocido"
      error: (err) => {
        // Logueamos el error completo en la consola para depurarlo
        console.error("RESPUESTA COMPLETA DEL ERROR:", err); 
        
        let errorMessage = 'Hubo un error desconocido.';

        // 1. Si el backend envía un string simple (ej. "Stock insuficiente")
        if (typeof err.error === 'string') {
            errorMessage = err.error;
        
        // 2. Si el backend envía un objeto JSON de error (ej. { "message": "..." })
        } else if (err.error && typeof err.error.message === 'string') {
            errorMessage = err.error.message;
        
        // 3. Si es un error de token vencido
        } else if (err.status === 403 || err.status === 401) {
            errorMessage = 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.';
            this.authService.logout(); // Limpiamos el token viejo
            this.router.navigate(['/login']); // Enviamos al login
        
        // 4. Si es otro tipo de error HTTP (ej. 500 Internal Server Error)
        } else if (typeof err.message === 'string') {
            errorMessage = err.message;
        }
        
        // Mostramos la alerta de error correcta
        alert(`Error al procesar tu orden: ${errorMessage}`);
      }
    });
  }
}