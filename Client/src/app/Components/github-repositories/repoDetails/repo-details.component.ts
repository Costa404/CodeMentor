import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { RepoDetailsService } from './ServicesRepoDetails/repo-details.service';

@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class RepoDetailsComponent implements OnInit {
  username!: string;
  repoName!: string;
  path!: string;
  repoDetails: any = null;
  files: any[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private repoDetailsService: RepoDetailsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      console.log('Params changed:', paramMap); // Verifique se isso é logado
      this.username = paramMap.get('username')!;
      this.repoName = paramMap.get('repo')!;
      this.path = paramMap.get('path') || '';

      this.fetchRepoDetails();
      this.fetchRepoFiles(this.path);
    });
  }
  fetchRepoDetails(): void {
    this.loading = true;
    this.repoDetailsService
      .getRepoDetails(this.username, this.repoName)
      .subscribe({
        next: (details) => {
          this.repoDetails = details;
          this.loading = false;
        },
        error: () => {
          this.error = 'Erro ao carregar os detalhes do repositório.';
          this.loading = false;
        },
      });
  }

  fetchRepoFiles(path: string = ''): void {
    this.loading = true;
    this.repoDetailsService
      .getRepoFiles(this.username, this.repoName, path)
      .subscribe({
        next: (files) => {
          this.files = files;
          this.loading = false;
        },
        error: () => {
          this.error = 'Erro ao carregar os arquivos do repositório.';
          this.loading = false;
        },
      });
  }
  selectFile(file: any): void {
    if (file.type === 'dir') {
      // Se for uma pasta, continua no RepoDetailsComponent
      this.router.navigate([this.username, this.repoName, file.path]);
    } else {
      // Se for um arquivo, redireciona para o Monaco Editor
      this.router.navigate([this.username, this.repoName, file.path], {
        queryParams: { file: true },
      });
    }
  }
}
