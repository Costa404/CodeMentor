// import {
//   Component,
//   OnInit,
//   Input,
//   ChangeDetectorRef,
//   AfterViewInit,
// } from '@angular/core';
// import { MonacoEditorComponent } from './monaco-editor/monaco-editor.component';
// import { CommonModule } from '@angular/common';
// import { Router, RouterModule } from '@angular/router';
// import { FolderNavigationService } from './folder-navigation.service';
// import { RepoDataService } from './repo-data.service';

// @Component({
//   selector: 'app-repo-details',
//   templateUrl: './repoDetails.component.html',
//   standalone: true,
//   imports: [MonacoEditorComponent, CommonModule, RouterModule], // Importe o MonacoEditorComponent
// })
// export class RepoDetailsComponent implements OnInit, AfterViewInit {
//   @Input() username!: string;
//   @Input() repo!: string;
//   repoDetails: any = null;
//   repoFiles: any[] = [];
//   loading: boolean = false;
//   selectedFile: any = null;

//   showRepoDetails: boolean = true;
//   showFileContent: boolean = false;

//   constructor(
//     private router: Router, // Injete o Router
//     private repoDataService: RepoDataService, // Injete o RepoDataService
//     private folderNavigationService: FolderNavigationService,
//     private cdRef: ChangeDetectorRef
//   ) {}

//   ngOnInit(): void {
//     this.loadRepoDetails();
//   }

//   async ngAfterViewInit(): Promise<void> {
//     // O Monaco Editor é gerenciado pelo MonacoEditorComponent, então não precisa de lógica aqui.
//   }

//   loadRepoDetails(): void {
//     this.loading = true;
//     console.log(
//       'Carregando detalhes do repositório:',
//       this.username,
//       this.repo
//     );

//     // Usa o RepoDataService para carregar os detalhes do repositório
//     this.repoDataService.getRepoDetails(this.username, this.repo).subscribe({
//       next: (details) => {
//         console.log('Detalhes do repositório carregados:', details);
//         this.repoDetails = details;
//         this.loading = false;
//         this.cdRef.detectChanges();
//       },
//       error: (error) => {
//         console.error('Erro ao obter detalhes do repositório:', error);
//         this.loading = false;
//         this.cdRef.detectChanges();
//       },
//     });

//     // Usa o RepoDataService para carregar a lista de arquivos
//     this.repoDataService.getRepoFiles(this.username, this.repo).subscribe({
//       next: (files) => {
//         console.log('Arquivos do repositório carregados:', files);
//         this.repoFiles = files;
//         this.loading = false;
//         this.cdRef.detectChanges();
//       },
//       error: (error) => {
//         console.error('Erro ao obter arquivos do repositório:', error);
//         this.loading = false;
//         this.cdRef.detectChanges();
//       },
//     });
//   }

//   selectFile(file: any): void {
//     console.log('Arquivo selecionado:', file);

//     if (!file.download_url) {
//       // Se for uma pasta, navega para ela
//       console.log('Navegando para a pasta:', file.path);
//       this.folderNavigationService.navigateToFolder(file.path);
//       this.loadFolderFiles(file.path);
//       this.router.navigate([
//         `/repo/${this.username}/${this.repo}/folder/${file.path}`,
//       ]); // Navega para a rota da pasta
//       return;
//     }

//     // Se for um arquivo, carrega o conteúdo e exibe no Monaco Editor
//     this.selectedFile = file;
//     this.showFileContent = true;
//     this.showRepoDetails = false;
//     this.loading = true;

//     console.log('Carregando conteúdo do arquivo:', file.download_url);

//     this.repoDataService.getFileContent(file.download_url).subscribe({
//       next: (content) => {
//         console.log('Conteúdo do arquivo carregado:', content);
//         this.selectedFile.content = content;
//         this.loading = false;
//         this.cdRef.detectChanges();
//       },
//       error: (error) => {
//         console.error('Erro ao buscar o conteúdo do arquivo:', error);
//         this.loading = false;
//         this.cdRef.detectChanges();
//       },
//     });

//     this.router.navigate([
//       `/repo/${this.username}/${this.repo}/file/${file.path}`,
//     ]); // Navega para a rota do arquivo
//   }

//   loadFolderFiles(folderPath: string): void {
//     console.log('Carregando arquivos da pasta:', folderPath);
//     this.loading = true;

//     this.repoDataService
//       .getRepoFiles(this.username, this.repo, folderPath)
//       .subscribe({
//         next: (files) => {
//           console.log('Arquivos da pasta carregados:', files);
//           this.repoFiles = files;
//           this.loading = false;
//           this.cdRef.detectChanges();
//         },
//         error: (error) => {
//           console.error('Erro ao obter arquivos da pasta:', error);
//           this.loading = false;
//           this.cdRef.detectChanges();
//         },
//       });
//   }

//   goBackToFileList(): void {
//     console.log('Voltando para a lista de arquivos');
//     this.showFileContent = false;
//     this.selectedFile = null;
//     this.showRepoDetails = true;

//     // Volta para a pasta anterior
//     const previousFolderPath = this.folderNavigationService.goBack();
//     if (previousFolderPath) {
//       this.loadFolderFiles(previousFolderPath);
//       console.log('Navegando para a pasta anterior:', previousFolderPath);
//       this.router.navigate([
//         `/repo/${this.username}/${this.repo}/folder/${previousFolderPath}`,
//       ]); // Navega para a pasta anterior
//     } else {
//       console.log('Navegando para a página principal do repositório');
//       this.router.navigate([`/repo/${this.username}/${this.repo}`]); // Navega para a página principal do repositório
//     }
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { GithubRepoService } from '../github-repo.service';
import { MonacoEditorComponent } from './monaco-editor/monaco-editor.component';

@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  standalone: true,
  imports: [CommonModule, MonacoEditorComponent, RouterModule],
})
export class RepoDetailsComponent implements OnInit {
  username!: string;
  repoName!: string;
  repoDetails: any = null;
  files: any[] = [];
  selectedFile: any = null;
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private githubRepoService: GithubRepoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.username = params['username'];
      this.repoName = params['repo'];

      if (this.username && this.repoName) {
        this.fetchRepoDetails();
        this.fetchRepoFiles();
      }
    });
  }

  fetchRepoDetails(): void {
    this.loading = true;
    this.githubRepoService
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

  fetchRepoFiles(): void {
    this.githubRepoService
      .getRepoFiles(this.username, this.repoName)
      .subscribe({
        next: (files) => {
          this.files = files;
        },
        error: () => {
          this.error = 'Erro ao carregar os arquivos do repositório.';
        },
      });
  }

  selectFile(file: any): void {
    console.log('Arquivo selecionado:', file);

    if (!file.download_url) {
      // Se for uma pasta, navega para ela
      console.log('Navegando para a pasta:', file.path);
      this.router.navigate([
        `/repo/${this.username}/${this.repoName}/folder/${file.path}`,
      ]);
      return;
    }

    // Se for um arquivo, carrega o conteúdo e exibe no Monaco Editor
    this.selectedFile = file;
    this.loading = true;

    this.githubRepoService.getFileContent(file.download_url).subscribe({
      next: (content) => {
        console.log('Conteúdo do arquivo carregado:', content);
        this.selectedFile.content = content;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao buscar o conteúdo do arquivo:', error);
        this.loading = false;
      },
    });

    this.router.navigate([
      `/repo/${this.username}/${this.repoName}/file/${file.path}`,
    ]);
  }
}
