import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  mails: any[] = [];

  ngOnInit() {
    this.mailService.getInbox().subscribe({
      next: (data) => this.mails = data 
    });
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
