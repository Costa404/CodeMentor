import { Component, OnInit, Input } from '@angular/core';
import { GithubRepoService } from './github-repo.service';

@Component({
  selector: 'app-repo-details',
  templateUrl: './repoDetails.component.html',

  standalone: true,
})
export class RepoDetailsComponent implements OnInit {
  @Input() username!: string;
  @Input() repoName!: string;
  repoDetails: any = null;
  repoFiles: any[] = [];
  loading: boolean = false;

  constructor(private githubRepoService: GithubRepoService) {}

  ngOnInit(): void {
    this.loadRepoDetails();
  }

  loadRepoDetails(): void {
    this.loading = true;

    this.githubRepoService
      .getRepoDetails(this.username, this.repoName)
      .subscribe(
        (details) => {
          this.repoDetails = details;
        },
        (error) => {
          console.error('Erro ao obter detalhes do repositório:', error);
        }
      );

    this.githubRepoService.getRepoFiles(this.username, this.repoName).subscribe(
      (files) => {
        this.repoFiles = files;
        this.loading = false;
      },
      (error) => {
        console.error('Erro ao obter arquivos do repositório:', error);
        this.loading = false;
      }
    );
  }
}
