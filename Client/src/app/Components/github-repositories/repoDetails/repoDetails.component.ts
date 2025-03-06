import { Component, OnInit, Input } from '@angular/core';
import { GithubRepoService } from '../github-repo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-repo-details',
  templateUrl: './repoDetails.component.html',
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class RepoDetailsComponent implements OnInit {
  @Input() username!: string;
  @Input() repo!: string;
  repoDetails: any = null;
  repoFiles: any[] = [];
  loading: boolean = false;

  constructor(private githubRepoService: GithubRepoService) {}

  ngOnInit(): void {
    this.loadRepoDetails();
  }

  loadRepoDetails(): void {
    this.loading = true;

    this.githubRepoService.getRepoDetails(this.username, this.repo).subscribe(
      (details) => {
        this.repoDetails = details;
      },
      (error) => {
        console.error('Erro ao obter detalhes do repositório:', error);
      }
    );

    this.githubRepoService.getRepoFiles(this.username, this.repo).subscribe(
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
