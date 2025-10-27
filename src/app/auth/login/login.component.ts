import { Component, inject, OnInit } from '@angular/core'; // Asegúrate de importar inject
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true, // Asegúrate que sea standalone si así lo generaste
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Corregido a styleUrls
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  registrationSuccess = false;

  // Inyectamos Router y AuthService usando inject (o en el constructor si prefieres)
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    // Comprobamos si venimos de un registro exitoso
    this.route.queryParams.subscribe(params => {
      if (params['registered'] === 'true') {
        this.registrationSuccess = true;
      }
    });
  }

  login(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor, ingresa usuario y contraseña';
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        const userRole = this.authService.getRole(); // Obtenemos el rol desde el servicio

        if (userRole === 'ADMIN') {
          console.log('Usuario es ADMIN, redirigiendo a /tienda');
          this.router.navigate(['/tienda']); // Redirigir ADMIN a la tienda
        } else {
          // Define a dónde quieres redirigir a otros roles si los hubiera
          // Si solo los ADMIN pueden iniciar sesión, podrías igual redirigir a /tienda
          // o manejar un error específico si un no-ADMIN intenta loguearse.
          console.log('Usuario no es ADMIN (o rol desconocido), redirigiendo a /tienda');
          this.router.navigate(['/tienda']); // Por ahora, redirige a todos a la tienda
        }
      },
      error: (error) => {
        console.error('Error de login:', error);
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    });
  }
}