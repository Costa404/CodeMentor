import { UserInfo } from './../../Models/profile.model';
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
  userInfo: UserInfo | null = null;

  constructor(
    private githubRepoService: GithubRepoService,
    private router: Router
  ) {}

  // Método para buscar informações do usuário e repositórios
  fetchRepos(): void {
    console.log('Botão foi clicado!');

    if (!this.githubUsername) {
      this.error = 'Por favor, insira um nome do usuário.';
      return;
    }

    // Buscar as informações do usuário
    this.githubRepoService.getUserInfo(this.githubUsername); // Atualiza o BehaviorSubject

    // Assinar o userInfo$ para receber as atualizações
    this.githubRepoService.userInfo$.subscribe({
      next: (userInfo: UserInfo) => {
        this.userInfo = userInfo;
        console.log('Informações do usuário:', this.userInfo);
      },
      error: (err) => {
        console.error('Erro ao carregar as informações do usuário:', err);
        this.error = 'Erro ao carregar as informações do usuário';
      },
    });

    // Buscar os repositórios do usuário
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

    // Navegar para a página do usuário
    this.router.navigate([this.githubUsername]);
  }
}
