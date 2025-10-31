import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { LoginResponse, DecodedToken } from './auth';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "http://localhost:8091/api/v1/auth";
  private router = inject(Router);
  private http = inject(HttpClient);

  // BehaviorSubject para notificar cambios en el estado de autenticación
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() { }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { username, password })
      .pipe(
        tap((response: LoginResponse) => {
          if (response && response.token) {
            // 1. Guardar el token
            localStorage.setItem('token', response.token);

            // 2. Decodificar el token para obtener los datos del usuario (incluyendo el rol)
            const decodedToken = this.decodeToken(response.token);
            
            if (decodedToken && decodedToken.authorities && decodedToken.authorities.length > 0) {
              // 3. Guardar el rol en localStorage. Asumimos que el rol es la primera autoridad.
              // MODIFICACIÓN: Quitamos el prefijo "ROLE_" antes de guardar.
              const userRole = decodedToken.authorities[0].replace('ROLE_', '');
              localStorage.setItem('role', userRole);
            } else {
              // Manejar el caso donde el token no tiene roles
              console.error('El token no contiene roles (authorities).');
              localStorage.removeItem('role');
            }

            // 4. Notificar que el usuario ha iniciado sesión
            this.isLoggedInSubject.next(true);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('token');
    }
    return null;
  }

  getRole(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('role');
    }
    return null;
  }

  // --- ¡ESTA ES LA NUEVA FUNCIÓN, AHORA BIEN COLOCADA! ---
  /**
   * Devuelve el nombre de usuario (subject) del token decodificado.
   */
  getUserName(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken ? decodedToken.sub : null;
    }
    return null;
  }
  // --- FIN DE LA NUEVA FUNCIÓN ---

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }

  decodeToken(token: string): DecodedToken | null {
    if (!this.isBrowser()) {
      return null;
    }
    try {
      // Usamos la librería jwt-decode que ya importaste
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Error al decodificar token:', error);
      return null;
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

    register(user: any): Observable<any> {
    // Le decimos a HttpClient que espere una respuesta de tipo texto.
    return this.http.post(`${this.baseUrl}/register`, user, { responseType: 'text' });
  }
}

