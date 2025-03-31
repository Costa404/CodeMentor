import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RepoDetailsService } from './FileExploreService/file-explore.service';
import { FolderNavigationService } from './FileExploreService/folder-navigation.service';
import { ChatComponent } from './chat/chat.component';
import { MonacoEditorComponent } from './monaco-editor/monaco-editor.component';

import { PathNavigatorComponent } from '../path-navigator/path-navigator.component';

@Component({
  selector: 'app-file-explorer',
  standalone: true,
  imports: [
    CommonModule,
    MonacoEditorComponent,
    ChatComponent,
    PathNavigatorComponent,
    PathNavigatorComponent,
  ],
  templateUrl: './file-explorer-component.component.html',
})
export class FileExplorerComponent implements OnInit {
  path!: string;
  username: string = '';
  repo: string = '';
  repoPath: string = '';
  folderContents: any[] = [];
  isFile: boolean = false;
  fileContent: string = '';
  chatVisible: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private repoDetailsService: RepoDetailsService,
    private folderNavService: FolderNavigationService
  ) {}

  ngOnInit() {
    this.route.url.subscribe((segments) => {
      // console.log('🔄 [ngOnInit] Executando...');

      this.username = this.route.snapshot.paramMap.get('username')!;
      this.repo = this.route.snapshot.paramMap.get('repo')!;

      this.repoPath = segments.map((segment) => segment.path).join('/');

      console.log(
        '🛣 [ngOnInit] Segmentos da URL:',
        segments.map((s) => s.path)
      );
      console.log('📂 [ngOnInit] Caminho do repositório:', this.repoPath);

      this.updatePath();
      this.loadRepoContents();
    });
  }

  updatePath() {
    // console.log('[updatePath] Caminho do repositório:', this.repoPath);
  }

  // ======================
  // new method
  // ======================

  loadRepoContents() {
    if (!this.username || !this.repo) return;

    this.repoDetailsService
      .getRepoFiles(this.username, this.repo, this.repoPath)
      .subscribe({
        next: (response) => {
          console.log('[loadRepoContents] Resposta da API:', response);

          if (Array.isArray(response)) {
            this.folderContents = response;
          } else {
            this.folderContents = [response];
          }
        },
        error: (error) => {
          console.error('[loadRepoContents] Error loading repo:', error);
        },
      });
  }
  // ======================
  // new method
  // ======================
  loadFileContent(file: any) {
    if (file.type === 'file' && file.download_url) {
      this.router.navigate([
        `/${this.username}/${this.repo}/${this.repoPath}/${file.name}`,
      ]);
      this.repoDetailsService.getFileContent(file.download_url).subscribe({
        next: (content) => {
          console.log('✅ Conteúdo recebido:', content);
          this.fileContent = content;
          this.isFile = true;
        },
        error: (error) => {
          console.error('Erro ao carregar arquivo:', error);
        },
      });
    }
  }

  // ======================
  // new method
  // ======================

  navigateToFolder(folder: any) {
    const newPath = this.repoPath
      ? `${this.repoPath}/${folder.name}`
      : folder.name;

    this.folderNavService.navigateAndUpdateRoute(
      newPath,
      this.username,
      this.repo,
      this.router
    );
  }
  // ======================
  // new method
  // ======================

  navigateToCodeAnalysis(file: any) {
    const fileName = file.name;

    // console.log('Arquivo selecionado:', fileName);

    this.router.navigate([`/codeAnalysis/${fileName}`]);
  }
  // ======================
  // new method
  // ======================

  toggleChat() {
    this.chatVisible = !this.chatVisible;
  }
}
