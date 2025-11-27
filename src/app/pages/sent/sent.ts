import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Mail } from '../../services/mail';

@Component({
  selector: 'app-sent',
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './sent.html',
  styleUrl: './sent.css',
})
export class Sent implements OnInit{
  mailService = inject(Mail);
  router = inject(Router);

  sentMails: any[] = [];

  ngOnInit(){
    this.loadSentMails();
  }

  loadSentMails() {
    this.mailService.getSentMails().subscribe({
      next: (data) => {
        // Recent mail mela vara reverse panrom
        this.sentMails = data.reverse(); 
      },
      error: (err) => console.error('Error fetching sent mails', err)
    });
  }

  // Click panna Mail Open aagum
  openMail(id: number) {
    this.router.navigate(['/mail', id]);
  }

  // Delete Logic
  deleteMail(id: number) {
    if(confirm('Delete this sent mail?')) {
      this.mailService.deleteMail(id).subscribe({
        next: () => {
          this.sentMails = this.sentMails.filter(m => m.id !== id);
        }
      });
    }
  }
}
