import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  authService = inject(Auth);
  router = inject(Router);
  email = '';
  password = '';

  onLogin(){
    this.authService.login({email: this.email, password: this.password}).subscribe({
      next: (res: any) =>{
        this.authService.saveToken(res.token);
        this.router.navigate(['/inbox']);
      },
      error: (err) => {
        if(err.error && err.error.message){
          alert(err.error.message);
        }else{
          alert("Login Failed!");
        }
  }
});
  }
}
