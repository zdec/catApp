import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  name: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onLogin() {
    try {
      const success = await this.authService.login(this.name, this.password);
      if (success) {
        console.log('Login successful');
        this.router.navigate(['/protected']);
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  }
}
