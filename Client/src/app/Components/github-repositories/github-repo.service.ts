// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class GithubRepoService {
//   private baseUrl = 'https://api.github.com/users'; // URL da API do GitHub para repositórios públicos

//   constructor(private http: HttpClient) {}

//   /**
//    * Método para obter os repositórios públicos de um user no GitHub
//    * @param username Nome de um user no GitHub
//    * @returns Observable com a lista de repositórios
//    */
//   getRepos(username: string): Observable<any[]> {
//     return this.http.get<any[]>(`${this.baseUrl}/${username}/repos`);
//   }

//   /**
//    * Método para obter os detalhes de um repositório
//    * @param username Nome de um user no GitHub
//    * @param repoName Nome do repositório
//    * @returns Observable com os detalhes do repositório
//    */
//   getRepoDetails(username: string, repo: string): Observable<any> {
//     const url = `https://api.github.com/repos/${username}/${repo}`;
//     console.log('URL da API:', url); // Verifique a URL gerada
//     return this.http.get<any>(url);
//   }

//   /**
//    * Método para obter os arquivos de um repositório
//    * @param username Nome de um user no GitHub
//    * @param repoName Nome do repositório
//    * @returns Observable com os arquivos do repositório
//    */
//   getRepoFiles(
//     username: string,
//     repoName: string,
//     path: string = ''
//   ): Observable<any[]> {
//     const base = `https://api.github.com/repos/${username}/${repoName}/contents`;
//     const url = path ? `${base}/${path}` : base; // Evita barra extra no final
//     return this.http.get<any[]>(url);
//   }

//   /**
//    * Método para obter o conteúdo de um arquivo a partir da URL de download
//    * @param downloadUrl URL de download do arquivo
//    * @returns Observable com o conteúdo do arquivo (texto)
//    */
//   getFileContent(downloadUrl: string): Observable<string> {
//     return this.http.get(downloadUrl, { responseType: 'text' });
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubRepoService {
  private baseUrl = 'https://api.github.com/users';

  constructor(private http: HttpClient) {}

  /** Obtém os repositórios públicos de um usuário */
  getRepos(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${username}/repos`);
  }
}
