import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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

}
