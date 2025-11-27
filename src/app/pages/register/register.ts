import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  authService = inject(Auth);
  router = inject(Router);

  name = '';
  email = '';
  password = '';
  confirmpassword = '';

  onRegister(){

    if(this.confirmpassword == this.password){
      const user = { name: this.name, email: this.email, password: this.password};

    this.authService.register(user).subscribe({
      next:() => {
        alert('Registration Successful! Please Login');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        alert('Registration Failed! Email might already exist');
      }
    });
    }
    else{
      alert('Password and confirm password not match!')
    }
  }
}
