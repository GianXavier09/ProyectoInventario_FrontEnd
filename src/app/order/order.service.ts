import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

// --- Definimos aquí las "cajas" (DTOs) que enviaremos al backend ---
// Esto debe coincidir con tus DTOs de Spring Boot

export interface OrderItemDTO {
  productId: number;
  quantity: number;
}

export interface OrderRequestDTO {
  customerName: string;
  shippingAddress: string;
  items: OrderItemDTO[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // URL de tu API de backend
  private baseUrl = "http://localhost:8091/api/v1/orders";

  private http = inject(HttpClient);

  constructor() { }

  /**
   * Envía la orden al backend.
   * La petición irá con el Token JWT gracias al Interceptor que ya tienes.
   */
  placeOrder(orderRequest: OrderRequestDTO): Observable<any> {
    // Hacemos un POST a http://localhost:8091/api/v1/orders/place
    return this.http.post(`${this.baseUrl}/place`, orderRequest);
  }
}