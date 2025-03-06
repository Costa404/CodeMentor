import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GithubRepoService } from './github-repo.service';
import { RepoDetailsComponent } from './repoDetails/repoDetails.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-github-repositories',
  templateUrl: './github-repositories.component.html',

  standalone: true,
  imports: [FormsModule, RepoDetailsComponent, CommonModule],
})
export class GithubRepositoriesComponent implements OnInit {
  githubUsername: string = '';
  repositories: any[] = [];
  loading: boolean = false;
  error: string | null = null;
  selectedRepoDetails: any = null;

  constructor(private githubRepoService: GithubRepoService) {}

  ngOnInit(): void {}

  fetchRepos(): void {
    if (!this.githubUsername) {
      this.error = 'Por favor, insira um nome do user.';
      return;
    }

    this.loading = true;
    this.error = null;
    this.githubRepoService.getRepos(this.githubUsername).subscribe({
      next: (repos) => {
        this.repositories = repos;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar os repositórios';
        this.loading = false;
      },
    });
  }

  fetchRepoDetails(repo: any): void {
    console.log('Repositório selecionado:', repo);
    console.log('rep.name selecionado:', repo.name);
    console.log('Username:', this.githubUsername);

    if (!repo.name) {
      console.error(
        'Erro: Repositório inválido ou nome de user esta undefined!',
        repo
      );
      return;
    }

    const repoName = repo.name;
    const username = this.githubUsername;

    console.log(
      'Buscando detalhes do repositório com nome:',
      repoName,
      'para o usuário:',
      username
    );

    this.githubRepoService.getRepoDetails(username, repoName).subscribe({
      next: (details) => {
        console.log('Detalhes do repositório:', details);
        this.selectedRepoDetails = {
          username: username,
          repo: repo.name,
        };
      },
      error: (err) => {
        console.error('Erro ao obter detalhes do repositório:', err);
        this.error = 'Erro ao carregar os detalhes do repo';
      },
    });

    this.githubRepoService.getRepoFiles(username, repoName).subscribe({
      next: (files) => {
        console.log('Arquivos do repo:', files);
      },
      error: (err) => {
        console.error('Erro ao obter arquivos do rep:', err);
      },
    });
  }
}
