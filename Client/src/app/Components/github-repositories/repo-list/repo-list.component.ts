import { GithubRepoService } from './../github-repo.service';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubAccountDetailsComponent } from '../../github-account-details/github-account-details.component';
import { formatDistanceToNowStrict } from 'date-fns';
import { enUS } from 'date-fns/locale';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  imports: [
    CommonModule,
    GithubAccountDetailsComponent,
    GithubAccountDetailsComponent,
  ],
  styleUrls: ['./repo-list.css'],
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
    this.loading = true;

    if (!this.githubUsername) {
      this.error = 'Por favor, insira um nome do usuário.';
      this.loading = false;
      return;
    }

    this.githubRepoService.getRepos(this.githubUsername).subscribe({
      next: (repos) => {
        this.repositories = repos;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar os repos:', err);
        this.error = 'Erro ao carregar os repos';
        this.loading = false;
      },
    });
  }

  fetchRepoDetails(repo: any): void {
    this.router.navigate([this.githubUsername, repo.name]);
  }

  formatTimeAgo(dateString: string): string {
    return formatDistanceToNowStrict(new Date(dateString), {
      locale: enUS,
    });
  }
}
