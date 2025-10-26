import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router'; // RouterLink sigue siendo necesario para [routerLink]
// CommonModule ya no es necesario aquí si solo era para *ngIf
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [
    RouterLink // Solo importamos RouterLink
    // Ya no necesitamos CommonModule para @if
  ],
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent {
  private authService = inject(AuthService);

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}