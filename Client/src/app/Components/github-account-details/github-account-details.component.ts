import { Component, OnInit } from '@angular/core';
import { GithubRepoService } from '../github-repositories/github-repo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-github-account-details',
  imports: [CommonModule],
  templateUrl: './github-account-details.component.html',
  styleUrl: './github-account-details.component.css',
})
export class GithubAccountDetailsComponent implements OnInit {
  userInfo: any;
  error: string | null = null;

  constructor(private githubRepoService: GithubRepoService) {}

  ngOnInit(): void {
    // Subscreve o Observable que contém as informações do usuário
    this.githubRepoService.userInfo$.subscribe({
      next: (user) => {
        this.userInfo = user;
        console.log('userInfo mo detialsGh', this.userInfo);
      },
      error: (err) => {
        this.error = 'Erro ao carregar as informações do user';
      },
    });
  }
}
