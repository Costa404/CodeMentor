import { GithubRepoService } from './../github-repo.service';
// repo-list.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubAccountDetailsComponent } from '../../github-account-details/github-account-details.component';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  imports: [
    CommonModule,
    GithubAccountDetailsComponent,
    GithubAccountDetailsComponent,
  ],
})
export class RepoListComponent {
  githubUsername: string = '';
  repositories: any[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private githubRepoService: GithubRepoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.githubUsername = params.get('username')!;
      this.fetchRepos();
    });
  }

  fetchRepos(): void {
    this.loading = true; // Começar o carregamento

    if (!this.githubUsername) {
      this.error = 'Por favor, insira um nome do usuário.';
      this.loading = false; // Interromper o carregamento em caso de erro
      return;
    }

    // Buscar os repositórios do usuário
    this.githubRepoService.getRepos(this.githubUsername).subscribe({
      next: (repos) => {
        this.repositories = repos;
        this.loading = false; // Finalizar o carregamento
      },
      error: (err) => {
        console.error('Erro ao carregar os repositórios:', err);
        this.error = 'Erro ao carregar os repositórios';
        this.loading = false; // Finalizar o carregamento em caso de erro
      },
    });
  }

  fetchRepoDetails(repo: any): void {
    this.router.navigate([this.githubUsername, repo.name]);
  }
}
