import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GithubRepoService } from './github-repo.service';
import { RepoDetailsComponent } from './repoDetails.component';

@Component({
  selector: 'app-github-repositories',
  templateUrl: './github-repositories.component.html',

  standalone: true,
  imports: [FormsModule, RepoDetailsComponent],
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
      this.error = 'Por favor, insira um nome de usuário do GitHub.';
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

  fetchRepoDetails(repoName: string): void {
    this.githubRepoService
      .getRepoDetails(this.githubUsername, repoName)
      .subscribe({
        next: (details) => {
          this.selectedRepoDetails = details;
        },
        error: (err) => {
          this.error = 'Erro ao carregar os detalhes do repositório';
        },
      });
  }
}
