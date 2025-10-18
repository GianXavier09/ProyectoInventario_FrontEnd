import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor, ingresa usuario y contraseña';
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error de login:', error);
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    });
  }
}
