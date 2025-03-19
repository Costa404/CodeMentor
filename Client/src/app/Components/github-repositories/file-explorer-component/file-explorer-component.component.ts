import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RepoDetailsService } from './FileExploreService/file-explore.service';
import { FolderNavigationService } from './FileExploreService/folder-navigation.service';
import { MonacoEditorComponent } from '../monaco-editor/monaco-editor.component';

@Component({
  selector: 'app-file-explorer',
  standalone: true,
  imports: [CommonModule, MonacoEditorComponent],
  templateUrl: './file-explorer-component.component.html',
})
export class FileExplorerComponent implements OnInit {
  repoName!: string;
  path!: string;
  repoDetails: any = null;
  files: any[] = [];
  loading: boolean = false;
  error: string | null = null;
  username: string = '';
  repo: string = '';
  repoPath: string = '';
  folderContents: any[] = [];
  isFile: boolean = false;
  fileContent: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private repoDetailsService: RepoDetailsService,
    private folderNavService: FolderNavigationService
  ) {}

  ngOnInit() {
    this.route.url.subscribe((segments) => {
      console.log('🔄 [ngOnInit] Executando...');

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
    console.log('[updatePath] Caminho do repositório:', this.repoPath);
  }

  loadRepoContents() {
    if (!this.username || !this.repo) return;

    this.repoDetailsService
      .getRepoFiles(this.username, this.repo, this.repoPath)
      .subscribe(
        (response) => {
          console.log('[loadRepoContents] Resposta da API:', response);

          if (Array.isArray(response)) {
            // Se a resposta for um array, é uma pasta
            this.folderContents = response;
          } else {
            // Se a resposta for um objeto, é um arquivo
            this.folderContents = [response];
          }
        },
        (error) =>
          console.error('[loadRepoContents]  Error loading rep:', error)
      );
  }
  loadFileContent(file: any) {
    if (file.type === 'file' && file.download_url) {
      this.router.navigate([
        `/${this.username}/${this.repo}/${this.repoPath}/${file.name}`,
      ]);

      this.repoDetailsService.getFileContent(file.download_url).subscribe({
        next: (content) => {
          console.log('✅ [loadFileContent] content recebido:', content);
          this.fileContent = content;
          this.isFile = true;
        },
        error: (error) => {
          console.error('[loadFileContent] Erro ao carregar arquivo:', error);
        },
      });
    } else {
      console.warn('⚠️ [loadFileContent] Arquivo inválido ou sem URL.');
    }
  }

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

  selectFile(file: any): void {
    if (file.type === 'dir') {
      this.router.navigate([this.username, this.repoName, file.path]);
    } else {
      this.router.navigate([this.username, this.repoName, file.path]);
    }
  }

  navigateToCodeAnalysis(file: any) {
    // Acessando apenas o necessário
    const fileName = file.name;
    const fileUrl = file.download_url;

    // Lógica para navegação
    console.log('Arquivo selecionado:', fileName);

    // Por exemplo, você pode navegar para uma página de análise de código:
    this.router.navigate([`/codeAnalysis/${fileName}`]);
  }
}
