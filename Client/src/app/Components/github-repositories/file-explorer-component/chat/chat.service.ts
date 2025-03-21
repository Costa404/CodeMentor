import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'http://localhost:8000/codeAnalysis';
  private isOpenSource = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSource.asObservable();
  constructor(private http: HttpClient) {}

  private modalStateSubject = new BehaviorSubject<boolean>(false);
  modalState$ = this.modalStateSubject.asObservable(); //
  openModal() {
    this.isOpenSource.next(true);
  }

  closeModal() {
    this.isOpenSource.next(false);
  }
  analyzeCode(query: string): Observable<any> {
    const payload = { query };
    return this.http.post<any>(this.apiUrl, payload);
  }
}
