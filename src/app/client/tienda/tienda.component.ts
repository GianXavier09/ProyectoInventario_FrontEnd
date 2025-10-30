// src/app/client/tienda/tienda.component.ts

// 1. Importa AfterViewInit
import { Component, OnInit, inject, AfterViewInit } from '@angular/core';
import { ProductListDTO } from '../../dashboard/product/product';
import { ProductService } from '../../dashboard/product/product.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service'; // Importa AuthService
import { RouterLink } from '@angular/router'; // Importa RouterLink
import { Observable } from 'rxjs';
import { CartService } from '../../cart/cart.service';

// 2. Declara la variable global de bootstrap
declare var bootstrap: any;

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule, RouterLink], // Añade RouterLink a los imports
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'] // Corregido a styleUrls
})
// 3. Implementa AfterViewInit en la clase
export class TiendaComponent implements OnInit, AfterViewInit {

  productos: ProductListDTO[] = [];
  private authService = inject(AuthService); // Inyecta AuthService
  private cartService = inject(CartService); // Inyecta CartService
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  // 4. Añade el método ngAfterViewInit
  ngAfterViewInit(): void {
    // Inicializar el carrusel después de que la vista se haya renderizado
    // Usa un pequeño retardo para asegurar que el DOM esté completamente listo
    setTimeout(() => {
      const carouselElement = document.getElementById('heroCarousel');
      if (carouselElement) {
        new bootstrap.Carousel(carouselElement, {
          interval: 5000, // Intervalo en milisegundos (5 segundos)
          pause: 'hover' // Pausar al pasar el mouse
        });
      }
    }, 100); // Retardo de 100ms
  }

  cargarProductos(): void {
    this.productService.getAllProducts().subscribe(data => {
      // Filtramos productos activos y con stock como ya lo tenías
      this.productos = data.filter(p => p.estado && p.stock > 0);
    });
  }

  agregarAlCarrito(producto: ProductListDTO): void {
    console.log('¡Click detectado! Producto:', producto.productname);
    this.cartService.addToCart(producto);
  }

  /**
   * Verifica si el usuario actual tiene el rol de ADMIN.
   * @returns {boolean} True si es ADMIN, false en caso contrario.
   */
  isAdmin(): boolean {
    // Obtenemos el rol desde el servicio de autenticación
    return this.authService.getRole() === 'ADMIN';
  }
}