import { Component, OnInit } from '@angular/core';
import { Product, ProductListDTO } from '../../dashboard/product/product';
import { ProductService } from '../../dashboard/product/product.service';
import { CommonModule, CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-tienda',
  standalone: true, // <-- Añade esta línea
  imports: [CommonModule], // CurrencyPipe ya está en CommonModule
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.css'
})
export class TiendaComponent implements OnInit {

  productos: ProductListDTO[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.productos = data.filter(p => p.estado && p.stock > 0);
    });

  }

}
