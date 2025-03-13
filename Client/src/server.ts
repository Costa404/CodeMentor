import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine, isMainModule } from '@angular/ssr/node';
import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import bootstrap from './main.server';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(serverDistFolder, 'index.server.html');

const app = express();
const commonEngine = new CommonEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.get(
  '**',
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  })
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.get('**', (req, res, next) => {
  const { protocol, originalUrl, baseUrl, headers } = req;

  commonEngine
    .render({
      bootstrap,
      documentFilePath: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      publicPath: browserDistFolder,
      providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
    })
    .then((html) => res.send(html))
    .catch((err) => next(err));
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export default app;
// import {
//   Component,
//   OnInit,
//   Input,
//   ChangeDetectorRef,
//   AfterViewInit,
// } from '@angular/core';
// import { GithubRepoService } from '../github-repo.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Observable } from 'rxjs';

// @Component({
//   selector: 'app-repo-details',
//   templateUrl: './repoDetails.component.html',
//   imports: [FormsModule, CommonModule],
//   standalone: true,
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
//     private githubRepoService: GithubRepoService,
//     private cdRef: ChangeDetectorRef
//   ) {}

//   ngOnInit(): void {
//     this.loadRepoDetails();
//   }

//   ngAfterViewInit(): void {
//     // Inicializar o Monaco Editor após o conteúdo estar pronto
//     if (
//       this.selectedFile &&
//       this.selectedFile.content &&
//       typeof window !== 'undefined'
//     ) {
//       setTimeout(() => {
//         this.initializeMonacoEditor();
//       }, 0); // Após renderizar a div, inicializa o Monaco Editor
//     }
//   }

//   loadRepoDetails(): void {
//     this.loading = true;

//     this.githubRepoService.getRepoDetails(this.username, this.repo).subscribe(
//       (details) => {
//         this.repoDetails = details;
//         this.loading = false;
//         this.cdRef.detectChanges();
//       },
//       (error) => {
//         console.error('Erro ao obter detalhes do repositório:', error);
//         this.loading = false;
//         this.cdRef.detectChanges();
//       }
//     );

//     this.githubRepoService.getRepoFiles(this.username, this.repo).subscribe(
//       (files) => {
//         this.repoFiles = files;
//         this.loading = false;
//         this.cdRef.detectChanges();
//       },
//       (error) => {
//         console.error('Erro ao obter arquivos do repositório:', error);
//         this.loading = false;
//         this.cdRef.detectChanges();
//       }
//     );
//   }

//   selectFile(file: any): void {
//     console.log('Arquivo selecionado:', file); // Log para verificar o arquivo selecionado
//     this.selectedFile = file;
//     this.showFileContent = true;
//     this.loading = true; // Ativar o estado de carregamento

//     // Buscar o conteúdo do arquivo usando a URL de download
//     this.githubRepoService.getFileContent(file.download_url).subscribe(
//       (content) => {
//         console.log('Conteúdo do arquivo carregado:', content); // Log para verificar o conteúdo
//         this.selectedFile.content = content; // Adicionar o conteúdo ao arquivo selecionado
//         this.loading = false; // Desativar o estado de carregamento
//         this.cdRef.detectChanges(); // Forçar a detecção de mudanças

//         // Inicializar o Monaco Editor após o conteúdo ser carregado
//         this.initializeMonacoEditor();
//       },
//       (error) => {
//         console.error('Erro ao buscar o conteúdo do arquivo:', error);
//         this.loading = false; // Desativar o estado de carregamento
//         this.cdRef.detectChanges(); // Forçar a detecção de mudanças
//       }
//     );
//   }

//   async initializeMonacoEditor(): Promise<void> {
//     console.log('Inicializando Monaco Editor...');

//     if (typeof window !== 'undefined' && this.selectedFile?.content) {
//       try {
//         // Impede o Monaco de tentar usar Web Workers, forçando a utilização de um worker vazio
//         (window as any).MonacoEnvironment = {
//           getWorkerUrl: () =>
//             'data:text/javascript;charset=utf-8,' +
//             encodeURIComponent('self.onmessage = function(){}'),
//         };

//         const monaco = await import(/* @vite-ignore */ 'monaco-editor');
//         console.log('Monaco Editor importado com sucesso.');

//         const editorElement = document.getElementById('editor');
//         if (editorElement) {
//           monaco.editor.create(editorElement, {
//             value: this.selectedFile.content,
//             language: 'javascript',
//             theme: 'vs',
//             readOnly: true, // Modo somente leitura
//             automaticLayout: true,
//           });
//           console.log('Monaco Editor inicializado com sucesso.');
//         } else {
//           console.error('Elemento editor não encontrado no DOM.');
//         }
//       } catch (error) {
//         console.error('Erro ao importar ou inicializar Monaco Editor:', error);
//       }
//     } else {
//       console.error('Janela ou conteúdo do arquivo não está disponível.');
//     }
//   }

//   goBackToFileList(): void {
//     this.showFileContent = false;
//     this.selectedFile = null;
//   }

//   goBackToRepos(): void {
//     this.showRepoDetails = false;
//   }
// }
// <!-- <div *ngIf="loading">Carregando...</div>
// <div *ngIf="showRepoDetails">
//   <h2>Detalhes do Repositório</h2>
//   <div *ngIf="loading">Carregando...</div>
//   <div *ngIf="repoDetails">
//     <div class="d-flex gap-3">
//       <p><strong>Nome:</strong> {{ repoDetails.name }}</p>
//       <p><strong>Descrição:</strong> {{ repoDetails.description }}</p>
//       <p><strong>Estrelas:</strong> {{ repoDetails.stargazers_count }}</p>
//     </div>
//   </div>

//   <h3>Arquivos do Repositório</h3>
//   <ul>
//     <li *ngFor="let file of repoFiles" (click)="selectFile(file)">
//       {{ file.name }}
//     </li>
//   </ul>
// </div>

// <div *ngIf="showFileContent">
//   <div id="editor" style="height: 500px; width: 100%"></div>
//   <button (click)="goBackToFileList()">Voltar para a lista de arquivos</button>
// </div> -->
