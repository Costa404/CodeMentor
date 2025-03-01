import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface AccessTokenResponse {
  access_token: string;
  token_type: string;
}

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css'],
})
export class CallbackComponent implements OnInit {
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const code = params['code'];
      console.log('Código recebido:', code);

      //  Trocar o código por um token de acesso
      if (code) {
        this.exchangeCodeForToken(code).subscribe({
          next: (token: AccessTokenResponse) => {
            console.log('Token de acesso recebido:', token);
          },
          error: (error) => {
            console.error('Erro ao trocar o código por um token:', error);
          },
          complete: () => {
            console.log('Requisição concluída.');
          },
        });
      }
    });
  }

  // Função para fazer a troca do código por um token de acesso

  private exchangeCodeForToken(code: string): Observable<AccessTokenResponse> {
    return this.http.post<AccessTokenResponse>(
      'http://localhost:3000/githubToken',
      { code }
    );
  }
}
