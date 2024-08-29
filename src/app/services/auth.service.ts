import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users';
  private user: any;

  constructor(private http: HttpClient) {}

  async login(username: string, password: string): Promise<boolean> {
    try {
      const response = await this.http.post<any>(`${this.apiUrl}/login`, { name: username, password }).toPromise();
      this.user = response;
      return true;
    } catch (err) {
      console.error('Login error:', err);
      return false;
    }
  }

  async register(userData: { name: string; email: string; password: string }): Promise<boolean> {
    try {
      const response = await this.http.post<any>(`${this.apiUrl}/register`, userData).toPromise();
      return true;
    } catch (err) {
      console.error('Registration error:', err);
      return false;
    }
  }

  isAuthenticated(): boolean {
    return !!this.user;
  }

  getUser() {
    return this.user;
  }
}

