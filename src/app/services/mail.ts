import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Mail {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/mails';

  getInbox(){
    return this.http.get<any[]>(`${this.baseUrl}/inbox`);
  }

  getSentMails(){
    return this.http.get<any[]>(`${this.baseUrl}/sent`);
  }

  sendMail(mail: any){
    return this.http.post(`${this.baseUrl}/send`, mail);
  }

  deleteMail(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
