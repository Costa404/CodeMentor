// repo-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RepoDataService {
  constructor(private http: HttpClient) {}

  getRepoDetails(username: string, repo: string): Observable<any> {
    return this.http.get(`https://api.github.com/repos/${username}/${repo}`);
  }

  getRepoFiles(username: string, repo: string, path?: string): Observable<any> {
    const url = path
      ? `https://api.github.com/repos/${username}/${repo}/contents/${path}`
      : `https://api.github.com/repos/${username}/${repo}/contents`;
    return this.http.get(url);
  }

  getFileContent(downloadUrl: string): Observable<any> {
    return this.http.get(downloadUrl, { responseType: 'text' });
  }
}
