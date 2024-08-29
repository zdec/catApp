import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onRegister() {
    try {
      const success = await this.authService.register({ name: this.name, email: this.email, password: this.password });
      if (success) {
        console.log('Registration successful');
        this.router.navigate(['/login']);
      }
    } catch (err) {
      console.error('Registration failed:', err);
    }
  }
}

