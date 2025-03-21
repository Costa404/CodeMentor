import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubRepoService {
  private baseUrl = 'https://api.github.com/users';

  private userInfoSubject = new BehaviorSubject<any>(null); // Subject que armazena a info
  userInfo$ = this.userInfoSubject.asObservable(); // Observable que pode ser assinado no componente

  private loadingSubject = new BehaviorSubject<boolean>(false); // Adicionando o BehaviorSubject para loading
  loading$ = this.loadingSubject.asObservable(); // Observable para o componente se inscrever

  constructor(private http: HttpClient) {}

  // Método para buscar informações do usuário e atualizar o Subject
  getUserInfo(username: string): void {
    this.loadingSubject.next(true); // Inicia o loading
    this.http.get<any>(`${this.baseUrl}/${username}`).subscribe({
      next: (user) => {
        this.userInfoSubject.next(user); // Atualiza o BehaviorSubject com a nova informação
        this.loadingSubject.next(false); // Finaliza o loading
      },
      error: (err) => {
        console.error('Erro ao carregar as informações do usuário', err);
        this.loadingSubject.next(false); // Finaliza o loading em caso de erro
      },
    });
  }

  // Método para obter repositórios (retorna um Observable)
  getRepos(username: string): Observable<any[]> {
    this.loadingSubject.next(true); // Inicia o loading
    return this.http
      .get<any[]>(`${this.baseUrl}/${username}/repos`)
      .pipe
      // Após a requisição ser completada, o loading será finalizado no componente
      // Aqui não é necessário finalizar o loading pois o componente vai controlar isso
      ();
  }

  stopLoading(): void {
    this.loadingSubject.next(false); // Método para parar o loading manualmente, se necessário
  }
}
