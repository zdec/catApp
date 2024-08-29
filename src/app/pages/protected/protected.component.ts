import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-protected',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './protected.component.html',
})
export class ProtectedComponent {
  user: any;

  constructor(private authService: AuthService) {
    this.user = this.authService.getUser();
    console.log('Authenticated user:', this.user);
  }
}
