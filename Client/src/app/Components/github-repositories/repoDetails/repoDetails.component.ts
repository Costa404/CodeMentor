import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
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
  selectedFile: any = null; 
  constructor(
    private githubRepoService: GithubRepoService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadRepoDetails();
  }

  loadRepoDetails(): void {
    this.loading = true;

    // Carrega os detalhes do repositório
    this.githubRepoService.getRepoDetails(this.username, this.repo).subscribe(
      (details) => {
        this.repoDetails = details;
        this.cdRef.detectChanges(); // Força a atualização da UI
      },
      (error) => {
        console.error('Erro ao obter detalhes do repositório:', error);
        this.loading = false;
        this.cdRef.detectChanges(); // Força a atualização da UI em caso de erro
      }
    );

    // Carrega os arquivos do repositório
    this.githubRepoService.getRepoFiles(this.username, this.repo).subscribe(
      (files) => {
        this.repoFiles = files; // Atualiza a lista de arquivos
        this.loading = false;
        this.cdRef.detectChanges(); // Força a atualização da UI
      },
      (error) => {
        console.error('Erro ao obter arquivos do repositório:', error);
        this.loading = false;
        this.cdRef.detectChanges(); 
      }
    );
  }


  selectFile(file: any): void {
    this.selectedFile = file;
    this.cdRef.detectChanges(); /
  }
}
