// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { GithubRepoService } from './github-repo.service';
// import { RepoDetailsComponent } from './repoDetails/repoDetails.component';
// import { CommonModule } from '@angular/common';
// import { ActivatedRoute, Router } from '@angular/router';

// @Component({
//   selector: 'app-github-repositories',
//   templateUrl: './github-repositories.component.html',

//   standalone: true,
//   imports: [FormsModule, RepoDetailsComponent, CommonModule],
// })
// export class GithubRepositoriesComponent {
//   githubUsername: string = '';
//   repositories: any[] = [];
//   loading: boolean = false;
//   error: string | null = null;
//   selectedRepoDetails: any = null;

//   showRepoList: boolean = true;
//   constructor(
//     private githubRepoService: GithubRepoService,
//     private router: Router,
//     private route: ActivatedRoute
//   ) {}

//   fetchRepos(): void {
//     if (!this.githubUsername) {
//       this.error = 'Por favor, insira um nome do user.';
//       return;
//     }

//     this.loading = true;
//     this.error = null;
//     this.router.navigate([this.githubUsername]);

//     this.githubRepoService.getRepos(this.githubUsername).subscribe({
//       next: (repos) => {
//         this.repositories = repos;
//         this.loading = false;
//       },
//       error: (err) => {
//         this.error = 'Erro ao carregar os repositórios';
//         this.loading = false;
//       },
//     });
//   }

//   fetchRepoDetails(repo: any): void {
//     console.log('Repositório selecionado:', repo);
//     console.log('rep.name selecionado:', repo.name);
//     console.log('Username:', this.githubUsername);

//     this.router.navigate([this.githubUsername, repo.name]);

//     if (!repo.name) {
//       console.error(
//         'Erro: Repositório inválido ou nome de user está undefined!',
//         repo
//       );
//       return;
//     }

//     const repoName = repo.name;
//     const username = this.githubUsername;

//     console.log(
//       'Buscando detalhes do repositório com nome:',
//       repoName,
//       'para o usuário:',
//       username
//     );
//     console.log('repSelect', this.selectedRepoDetails);

//     this.githubRepoService.getRepoDetails(username, repoName).subscribe({
//       next: (details) => {
//         console.log('Detalhes do repositório:', details);
//         this.selectedRepoDetails = {
//           username: username,
//           repo: repo.name,
//         };

//         // 🔥 Agora esconde a lista quando um repositório for selecionado
//         this.showRepoList = false;
//       },
//       error: (err) => {
//         console.error('Erro ao obter detalhes do repositório:', err);
//         this.error = 'Erro ao carregar os detalhes do repo';
//       },
//     });

//     this.githubRepoService.getRepoFiles(username, repoName).subscribe({
//       next: (files) => {
//         console.log('Arquivos do repo:', files);
//       },
//       error: (err) => {
//         console.error('Erro ao obter arquivos do rep:', err);
//       },
//     });
//   }

//   // goBackToList() {
//   //   this.selectedRepoDetails = null;
//   //   this.showRepoList = true; // 🔥 Mostra a lista de repositórios novamente
//   // }
// }
// github-repositories.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GithubRepoService } from './github-repo.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

  constructor(
    private githubRepoService: GithubRepoService,
    private router: Router
  ) {}

  // Método para buscar repositórios
  fetchRepos(): void {
    console.log('Botão foi clicado!');

    if (!this.githubUsername) {
      this.error = 'Por favor, insira um nome do user.';
      return;
    }

    this.loading = true;
    this.error = null;

    this.githubRepoService.getRepos(this.githubUsername).subscribe({
      next: (repos) => {
        console.log('Repositórios encontrados:', repos);
        this.repositories = repos;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar os repositórios:', err);
        this.error = 'Erro ao carregar os repositórios';
        this.loading = false;
      },
    });

    this.router.navigate([this.githubUsername]);
  }
}
