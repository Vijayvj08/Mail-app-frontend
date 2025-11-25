import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Mail } from '../../services/mail';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-compose',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './compose.html',
  styleUrl: './compose.css',
})
export class Compose {
  mailService = inject(Mail);
  authService = inject(Auth);
  router = inject(Router);
  toEmail = '';
  subject = '';
  body = '';

  sendMail(){
    const mail = { toEmail: this.toEmail, subject: this.subject, body: this.body};
    this.mailService.sendMail(mail).subscribe({
      next: ()=> {
        alert('Mail Sent!');
        this.router.navigate(['/inbox']);
      },
      error: () => alert('Error sending mail')
    });
  }
}
