import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { GithubRepoService } from '../github-repo.service';

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
    this.githubRepoService.userInfo$.subscribe({
      next: (user) => {
        this.userInfo = user;
      },
      error: (err) => {
        this.error = 'Erro ao carregar as informações do user';
      },
    });
  }
}
