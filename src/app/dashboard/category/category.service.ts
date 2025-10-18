import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './category';
import { CategoryCreateRequest } from '../../model/CategoryCreateRequest';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  getAllCategory(): Observable<Category[]>{
    return this.httpClient.get<Category[]>(
      "http://localhost:8091/api/v1/category")
  }

  getCategoryById(id: number): Observable<Category>{
    return this.httpClient.get<Category>(
      "http://localhost:8091/api/v1/category/"+id)
  }

  createCategory(category: CategoryCreateRequest): Observable<Category>{
    return this.httpClient.post<Category>(
      "http://localhost:8091/api/v1/category", category)
  }

  updateCategory(category: Category): Observable<Category>{
    return this.httpClient.put<Category>(
      "http://localhost:8091/api/v1/category/"+category.categoryid,
       category)
  }
}
