import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Mail } from '../../services/mail';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-inbox',
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './inbox.html',
  styleUrl: './inbox.css',
})
export class Inbox implements OnInit{
  mailService = inject(Mail);
  authService = inject(Auth);
  router = inject(Router);
  mails: any[] = [];

  ngOnInit() {
    this.loadMails();
  }

  loadMails() {
    this.mailService.getInbox().subscribe({
      next: (data) => this.mails = data.reverse(),
      error: (err) => console.error('Error fetching mails', err)
    });
  }

  // Row Click panna Full Mail open aagum
  openMail(id: number) {
    this.router.navigate(['/mail', id]);
  }

  deleteMail(id: number){
    if(confirm('Are you sure?')){
      this.mailService.deleteMail(id).subscribe({
        next: () => {
          this.mails = this.mails.filter(mail => mail.id !== id);
          alert('Mail deleted')
        },
        error: () => alert('Failed to delete mail')
      });
    }
  }
}
