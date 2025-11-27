import { Component, inject } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  
  authService =inject(Auth);
  router = inject(Router);

  email = '';
  newPassword = '';
   
  onReset(){
    const data = {email: this.email, password: this.newPassword};

    this.authService.resetPassword(data).subscribe({
      next: () =>{
        alert('password changed successfully');
        this.router.navigate(['/login']);
      },
      error: () =>{
        alert('Email not found!');
      }
        
    });
  }
}
