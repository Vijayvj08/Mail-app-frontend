import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Mail } from '../../services/mail';

@Component({
  selector: 'app-mail-detail',
  imports: [CommonModule, DatePipe, RouterLink],
  templateUrl: './mail-detail.html',
  styleUrl: './mail-detail.css',
})
export class MailDetail implements OnInit{
  route = inject(ActivatedRoute);
  mailService = inject(Mail);
  router = inject(Router);
  mail: any = null;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.mailService.getMailById(Number(id)).subscribe({
        next: (data) => this.mail = data,
        error: () => alert('error loading mail')
      });
    }
  }

  replyMail(){
    this.router.navigate(['/compose'],{
      queryParams:{
        to: this.mail.fromEmail,
        subject: this.mail.subject,
      }
    });
  }

  forwardMail() {

    const forwardBody = `
---------- Forwarded message ---------
From: ${this.mail.fromEmail}
Date: ${this.mail.sentAt}
Subject: ${this.mail.subject}

${this.mail.body} `;

    this.router.navigate(['/compose'], {
      queryParams: {
        subject: `Fwd: ${this.mail.subject}`, // Subject munnadi "Fwd:" serthurom
        body: forwardBody  // Mulu message-ayum body-la podurom
      }
    });
  }

}
