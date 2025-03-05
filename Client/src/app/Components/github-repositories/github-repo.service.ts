import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubRepoService {
  private baseUrl = 'https://api.github.com/users'; // URL da API do GitHub para repositórios públicos

  constructor(private http: HttpClient) {}

  /**
   * Método para obter os repositórios públicos de um usuário do GitHub
   * @param username Nome de usuário do GitHub
   * @returns Observable com a lista de repositórios
   */
  getRepos(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${username}/repos`);
  }

  /**
   * Método para obter os detalhes de um repositório
   * @param username Nome de usuário do GitHub
   * @param repoName Nome do repositório
   * @returns Observable com os detalhes do repositório
   */
  getRepoDetails(username: string, repoName: string): Observable<any> {
    return this.http.get<any>(
      `https://api.github.com/repos/${username}/${repoName}`
    );
  }

  /**
   * Método para obter os arquivos de um repositório
   * @param username Nome de usuário do GitHub
   * @param repoName Nome do repositório
   * @returns Observable com os arquivos do repositório
   */
  getRepoFiles(username: string, repoName: string): Observable<any[]> {
    return this.http.get<any[]>(
      `https://api.github.com/repos/${username}/${repoName}/contents`
    );
  }
}
