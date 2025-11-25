import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Mail } from '../../services/mail';

@Component({
  selector: 'app-sent',
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './sent.html',
  styleUrl: './sent.css',
})
export class Sent {
  mailService = inject(Mail);
  sentMails: any[] = [];

  ngOnInit(){
    this.mailService.getSentMails().subscribe({
      next: (data) => this.sentMails = data
    });
  }
}
