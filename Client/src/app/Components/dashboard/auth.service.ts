import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from '../../Models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/auth';
  private userSubject = new BehaviorSubject<UserProfile | null>(null);
  private reposSubject = new BehaviorSubject<any[]>([]);
  constructor(private http: HttpClient) {
    this.fetchUser();
  }

  getUserObservable(): Observable<UserProfile | null> {
    return this.userSubject.asObservable();
  }

  fetchUser(): void {
    this.http
      .get<UserProfile>(`${this.baseUrl}/user`, { withCredentials: true })
      .subscribe({
        next: (user) => {
          this.userSubject.next(user);
        },
        error: (error) => {
          console.error('Erro fetching user:', error);
          this.userSubject.next(null);
        },
        complete: () => {
          console.log('fetching success.');
        },
      });

    this.userSubject.subscribe((user) => console.log('User atualizado:', user));
  }

  fetchRepos(githubUsername: string): void {
    this.http
      .get<any[]>(`https://api.github.com/users/${githubUsername}/repos`)
      .subscribe({
        next: (repos) => {
          this.reposSubject.next(repos); // Atualiza os repositórios
        },
        error: (error) => {
          console.error('Erro fetching repos:', error);
          this.reposSubject.next([]); // Caso erro, retorna lista vazia
        },
        complete: () => {
          console.log('Repos fetched successfully.');
        },
      });
  }

  loginWithGitHub(): void {
    window.location.href = `${this.baseUrl}/github`;
  }

  logout(): void {
    this.http
      .get(`${this.baseUrl}/logout`, { withCredentials: true })
      .subscribe(() => {
        this.userSubject.next(null);
      });
  }
}
