import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  nombres = '';
  apellidos = '';
  email = '';
  nomusuario = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    if (!this.nombres || !this.apellidos || !this.email || !this.nomusuario || !this.password) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    const user = {
      nombres: this.nombres,
      apellidos: this.apellidos,
      email: this.email,
      nomusuario: this.nomusuario,
      password: this.password
    };

    this.authService.register(user).subscribe({
      next: () => {
        this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Error en el registro. Inténtelo de nuevo.';
      }
    });
  }
}
