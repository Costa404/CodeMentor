import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubRepoService {
  private baseUrl = 'https://api.github.com/users';

  private userInfoSubject = new BehaviorSubject<any>(null);
  userInfo$ = this.userInfoSubject.asObservable();
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  constructor(private http: HttpClient) {}

  getUserInfo(username: string): void {
    this.loadingSubject.next(true);
    this.http.get<any>(`${this.baseUrl}/${username}`).subscribe({
      next: (user) => {
        this.userInfoSubject.next(user);
        this.loadingSubject.next(false);
      },
      error: (err) => {
        console.error('Erro ao carregar as informações do usuário', err);
        this.loadingSubject.next(false);
      },
    });
  }

  // Método para obter repositórios (retorna um Observable)
  getRepos(username: string): Observable<any[]> {
    this.loadingSubject.next(true);
    return this.http.get<any[]>(`${this.baseUrl}/${username}/repos`).pipe();
  }

  stopLoading(): void {
    this.loadingSubject.next(false); // Método para parar o loading manualmente, se necessário
  }
}
