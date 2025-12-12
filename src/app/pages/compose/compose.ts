import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Mail } from '../../services/mail';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-compose',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './compose.html',
  styleUrl: './compose.css',
})
export class Compose implements OnInit{
  
  
  mailService = inject(Mail);
  authService = inject(Auth);
  router = inject(Router);
  route = inject(ActivatedRoute);

  toEmail = '';
  subject = '';
  body = '';
  isSending = false;

  ngOnInit() {
    // Reply panni vandhirundha, data va edukkurom
    this.route.queryParams.subscribe(params => {
      if (params['to']) {
        this.toEmail = params['to'];
      }
      if (params['subject']) {
        this.subject = params['subject'];
      }
      if (params['body']) {
        this.body = params['body'];
      }
    });
  }

  sendMail(){
    if(!this.toEmail || !this.subject || !this.body){
      alert('Please fill all fields!');
    }
    this.isSending = true;
    const mail = { toEmail: this.toEmail, subject: this.subject, body: this.body};
    this.mailService.sendMail(mail).subscribe({
      next: ()=> {
        alert('Mail Sent!');
        this.router.navigate(['/inbox']);
      },
      error: () => {
        alert('Error sending mail');
      this.isSending = false;
      }
    });
  }
}
