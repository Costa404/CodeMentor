import { UserInfo } from './../../Models/profile.model';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GithubRepoService } from './github-repo.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';

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

  fetchRepos(): void {
    if (!this.githubUsername) {
      this.error = 'Por favor, insira um nome do user.';
      return;
    }

    this.githubRepoService.getUserInfo(this.githubUsername);

    this.githubRepoService.userInfo$.subscribe({
      next: (userInfo: UserInfo) => {
        this.userInfo = userInfo;
        // console.log('Informações do user:', this.userInfo);
      },
      error: (err) => {
        console.error('Erro ao carregar as informações do user:', err);
        this.error = 'Erro ao carregar as informações do user';
      },
    });

    this.loading = true;
    this.error = null;

    this.githubRepoService.getRepos(this.githubUsername).subscribe({
      next: (repos) => {
        // console.log('Repositórios encontrados:', repos);
        this.repositories = repos;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro fetching reps:', err);
        this.error = 'Erro ao fetching reps';
        this.loading = false;
      },
    });

    // Navegar para a página do user
    this.router.navigate([this.githubUsername]);
  }
}
