import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RepoDetailsService {
  constructor(private http: HttpClient) {}

  getRepoDetails(username: string, repo: string): Observable<any> {
    return this.http.get(`https://api.github.com/repos/${username}/${repo}`);
  }

  getRepoFiles(
    username: string,
    repo: string,
    path: string = ''
  ): Observable<any[]> {
    const base = `https://api.github.com/repos/${username}/${repo}/contents`;
    return this.http.get<any[]>(path ? `${base}/${path}` : base);
  }

  /** Obtém o conteúdo de um arquivo */
  /** Obtém o conteúdo de um arquivo via URL de download */
  getFileContent(downloadUrl: string): Observable<string> {
    console.log(
      '📥 [getFileContent] Buscando conteúdo do arquivo em:',
      downloadUrl
    );
    return this.http.get(downloadUrl, { responseType: 'text' }).pipe(
      tap((content) =>
        console.log(
          '✅ [getFileContent] Conteúdo recebido:',
          content.substring(0, 100) + '...'
        )
      ),
      catchError((error) => {
        console.error('❌ [getFileContent] Erro ao obter conteúdo:', error);
        return throwError(() => new Error('Erro ao carregar o arquivo.'));
      })
    );
  }
}
