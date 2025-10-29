import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

import { AuthService } from './auth/auth.service';
import { CartService } from './cart/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    RouterLink    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
// Inyectamos los servicios
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private router = inject(Router);

  // Variables Observables para el template
  isLoggedIn$: Observable<boolean>;
  cartItemCount$: Observable<number>;

  constructor() {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    
    // Mapeamos el array de items del carrito a solo su cantidad
    this.cartItemCount$ = this.cartService.cartItems$.pipe(
      map(items => items.reduce((count, item) => count + item.quantity, 0))
    );
  }

  ngOnInit(): void {
    // Esto es para que el botón de "Ir al Dashboard" o "Tienda" aparezca o desaparezca
    // si el usuario está en esa ruta
  }

  // Función para saber si estamos en la tienda
  isTiendaRoute(): boolean {
    return this.router.url.includes('/tienda');
  }

  // Función para saber si estamos en el dashboard
  isAdminRoute(): boolean {
    return this.router.url.includes('/dashboard');
  }

  // Función para cerrar sesión
  logout(): void {
    this.authService.logout();
  }
}

