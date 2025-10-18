import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponse, DecodedToken } from './auth';
import { jwtDecode } from 'jwt-decode';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "http://localhost:8091/api/v1/auth";

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { username, password })
    .pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          const decoded = this.decodeToken(response.token);
          if (decoded) {
            localStorage.setItem('role', decoded.role);
          }
        }  
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  decodeToken(token: string): DecodedToken | null {
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Error al decodificar token:', error);
      return null;
    }
  }
}
