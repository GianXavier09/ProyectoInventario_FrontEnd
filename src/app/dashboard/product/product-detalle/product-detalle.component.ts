import { Component, ViewChild, ElementRef } from '@angular/core';
import { Modal } from 'bootstrap';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product, ProductDTO } from '../product';
import { Category } from '../../category/category';
import { Brand } from '../../brand/brand';
import { ProductCreateRequest } from '../../../model/ProductCreateRequest';
import { CategoryService } from '../../category/category.service';
import { BrandService } from '../../brand/brand.service';
import { CommonModule } from '@angular/common';

enum FormType {
  Crear = 0,
  Actualizar = 1
}

@Component({
  selector: 'app-product-detalle',
  imports: [FormsModule, CommonModule],
  templateUrl: './product-detalle.component.html',
  styleUrl: './product-detalle.component.css'
})
export class ProductDetalleComponent {

  productId: string | null = "";
  productName: string = "";
  price: number = 0;
  stock: number = 0;
  estado: boolean = true;
  talla: string = "";

  categoryId: number | null = null;
  brandId: number | null = null;

  categories: Category[] = [];
  brands: Brand[] = [];
  titulo: string = "";
  formType!: FormType;

  mostrarAlerta: boolean = false;
  private modalInstance: any;


  estadoOptions = [
    { label: 'Activo', value: true },
    { label: 'Inactivo', value: false }
  ];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    public router: Router
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get("id");

    if (this.productId !== 'nuevo') {
      this.titulo = "Editar Producto";
      this.formType = FormType.Actualizar;
      this.getProductById(Number(this.productId));
    } else {
      this.titulo = "Registrar Producto";
      this.formType = FormType.Crear;
      this.productId = "";
      this.estado = true;
    }

    this.getAllCategories();
    this.getAllBrands();
  }

  getProductById(id: number) {
    this.productService.getProductById(id)
      .subscribe({
        next: (response) => {
          this.productName = response.productname;
          this.price = response.price;
          this.stock = response.stock;
          this.estado = response.estado;
          this.talla = response.talla;
          this.categoryId = response.categoryid;
          this.brandId = response.brandid;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  getAllCategories() {
    this.categoryService.getAllCategory().subscribe({
      next: (response) => {
        this.categories = response ?? [];
      },
      error: (err) => {
        console.error('Error al obtener categorías', err);
      }
    });
  }

  getAllBrands() {
    this.brandService.getAllBrand().subscribe({
      next: (response) => {
        this.brands = response ?? [];
      },
      error: (err) => {
        console.error('Error al obtener marcas', err);
      }
    });
  }

  registerProduct() {
    console.log("AQUÍ - Iniciando registro");
    console.log("Category ID:", this.categoryId);
    console.log("Brand ID:", this.brandId);

    if (this.categoryId === null || this.brandId === null) {
      console.error('Debe seleccionar una categoría y una marca');
      return;
    }

    if (this.formType === FormType.Crear) {
      const newProduct: ProductCreateRequest = {
        productname: this.productName,
        price: this.price,
        stock: this.stock,
        estado: this.estado,
        talla: this.talla,
        categoryid: this.categoryId,
        brandid: this.brandId
      };

      this.productService.createProduct(newProduct).subscribe({
        next: () => this.router.navigate(['/dashboard/product']),
        error: (err) => console.error("Error al crear producto:", err)
      });

    } else {
      const newProduct: ProductDTO = {
        productid: Number(this.productId),
        productname: this.productName,
        price: this.price,
        stock: this.stock,
        estado: this.estado,
        talla: this.talla,
        categoryid: this.categoryId,
        brandid: this.brandId
      };

      this.productService.updateProduct(newProduct).subscribe({
        next: () => this.router.navigate(['/dashboard/product']),
        error: (err) => console.error("Error al actualizar producto:", err)
      });
    }
  }

  abrirModalConfirmacion() {
  const modalElement = document.getElementById('confirmModal');
  if (modalElement) {
    this.modalInstance = new Modal(modalElement);
    this.modalInstance.show();
  }
}

confirmarGuardar() {
  this.modalInstance.hide(); 
  this.registerProduct();   
}
  cerrarModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  onEstadoChange(event: any) {
    this.estado = event.target.value === 'true';
  }

  onCategoryChange(event: any) {
    this.categoryId = Number(event.target.value);
  }

  onBrandChange(event: any) {
    this.brandId = Number(event.target.value);
  }

}
