import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service'; 
import { Router, ActivatedRoute } from '@angular/router';
import { Product, ProductListDTO } from '../product'; 
import { FilterPipe } from '../filter.pipe';

@Component({
  selector: 'app-product-lista',
  templateUrl: './product-lista.component.html',
  styleUrls: ['./product-lista.component.css'],
  imports: [CommonModule, FormsModule, FilterPipe],
})
export class ProductListaComponent implements OnInit {

  productos: ProductListDTO[] = [];
  searchQuery: string = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.productos = data;
    });
  }

  onNavigateEditProduct(productId: number): void {
    this.router.navigate([productId], {relativeTo: this.route});
  }

  onNavigateCreateProduct(): void {
    this.router.navigate(['nuevo'], {relativeTo: this.route});
  }

}