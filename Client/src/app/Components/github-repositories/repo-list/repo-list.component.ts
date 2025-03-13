import { GithubRepoService } from './../github-repo.service';
// repo-list.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  imports: [CommonModule],
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
    this.router.navigate([this.githubUsername, repo.name]);
  }
}
