import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductDTO, ProductListDTO } from './product';
import { ProductCreateRequest } from '../../model/ProductCreateRequest';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8091/api/v1/product";

  constructor(private httpClient: HttpClient) { }

  // Obtener todos los productos
  getAllProducts(): Observable<ProductListDTO[]> {
    return this.httpClient.get<ProductListDTO[]>(this.baseUrl);
  }

  // Obtener un producto por ID
  getProductById(id: number): Observable<ProductDTO> {
    return this.httpClient.get<ProductDTO>(`${this.baseUrl}/${id}`);
  }

  // Crear un nuevo producto
  createProduct(product: ProductCreateRequest): Observable<ProductDTO> {
    return this.httpClient.post<ProductDTO>(this.baseUrl, product);
  }

  // Actualizar un producto existente
  updateProduct(product: ProductDTO): Observable<ProductDTO> {
    return this.httpClient.put<ProductDTO>(
      `${this.baseUrl}/${product.productid}`, product);
  }

  // Eliminar un producto (opcional soporta)
  deleteProduct(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
