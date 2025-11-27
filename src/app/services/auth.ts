import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private router = inject(Router);
  private baseUrl = 'http://localhost:8080/api/users';

  login(credentials: any){
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  saveToken(token: string){
    localStorage.setItem('token', token);
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  register(userData: any){
    return this.http.post(`${this.baseUrl}/register`,userData);
  }

  resetPassword(data: any){
    return this.http.post(`${this.baseUrl}/reset-password`,data);
  }
}
