import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from './brand';
import { Observable } from 'rxjs';
import { BrandCreateRequest } from '../../model/BrandCreateRequest';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private httpClient: HttpClient) { }

  getAllBrand(): Observable<Brand[]>{
      return this.httpClient.get<Brand[]>(
        "http://localhost:8091/api/v1/brand")
    }
  getBrandById(id: number): Observable<Brand>{
      return this.httpClient.get<Brand>(
        "http://localhost:8091/api/v1/brand/"+id)
    }
  
    createBrand(brand: BrandCreateRequest): Observable<Brand>{
      return this.httpClient.post<Brand>(
        "http://localhost:8091/api/v1/brand", brand)
    }
  
    updateBrand(brand: Brand): Observable<Brand>{
      return this.httpClient.put<Brand>(
        "http://localhost:8091/api/v1/brand/"+brand.brandid,
         brand)
    }
}
