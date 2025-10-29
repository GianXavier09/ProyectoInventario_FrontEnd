import { Component, OnInit, inject } from '@angular/core'; // Importa inject
import { ProductListDTO } from '../../dashboard/product/product';
import { ProductService } from '../../dashboard/product/product.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service'; // Importa AuthService
import { RouterLink } from '@angular/router'; // Importa RouterLink
import { Observable } from 'rxjs';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule, RouterLink], // Añade RouterLink a los imports
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'] // Corregido a styleUrls
})
export class TiendaComponent implements OnInit {

  productos: ProductListDTO[] = [];
  private authService = inject(AuthService); // Inyecta AuthService
  private cartService = inject(CartService); // Inyecta CartService
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  // Puedes quitar el constructor si solo inyectabas ProductService
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.cargarProductos();
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