import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GithubRepoService } from './github-repo.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-github-repositories',
  templateUrl: './github-repositories.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class GithubRepositoriesComponent {
  githubUsername: string = '';
  repositories: any[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private githubRepoService: GithubRepoService,
    private router: Router
  ) {}

  // Método para buscar repositórios
  fetchRepos(): void {
    console.log('Botão foi clicado!');

    if (!this.githubUsername) {
      this.error = 'Por favor, insira um nome do user.';
      return;
    }

    this.loading = true;
    this.error = null;

    this.githubRepoService.getRepos(this.githubUsername).subscribe({
      next: (repos) => {
        console.log('Repositórios encontrados:', repos);
        this.repositories = repos;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar os repositórios:', err);
        this.error = 'Erro ao carregar os repositórios';
        this.loading = false;
      },
    });

    this.router.navigate([this.githubUsername]);
  }
}
