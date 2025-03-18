import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RepoDetailsService } from '../github-repositories/repoDetails/ServicesRepoDetails/repo-details.service';
import { FolderNavigationService } from '../github-repositories/repoDetails/ServicesRepoDetails/folder-navigation.service';
import { MonacoEditorComponent } from '../github-repositories/repoDetails/monaco-editor/monaco-editor.component';

@Component({
  selector: 'app-file-explorer',
  standalone: true,
  imports: [CommonModule, MonacoEditorComponent],
  templateUrl: './file-explorer-component.component.html',
})
export class FileExplorerComponent implements OnInit {
  username: string = '';
  repo: string = '';
  repoPath: string = ''; // Caminho dentro do repositório
  folderContents: any[] = []; // Lista de arquivos e pastas
  isFile: boolean = false;
  fileContent: string = ''; // Conteúdo do arquivo

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private repoService: RepoDetailsService,
    private folderNavService: FolderNavigationService
  ) {}

  ngOnInit() {
    this.route.url.subscribe((segments) => {
      console.log('🔄 [ngOnInit] Executando...');

      this.username = this.route.snapshot.paramMap.get('username')!;
      this.repo = this.route.snapshot.paramMap.get('repo')!;

      // Concatena os segmentos da URL para formar o caminho do repositório, incluindo o nome do arquivo
      this.repoPath = segments.map((segment) => segment.path).join('/');

      console.log(
        '🛣 [ngOnInit] Segmentos da URL:',
        segments.map((s) => s.path)
      );
      console.log('📂 [ngOnInit] Caminho do repositório:', this.repoPath);

      // Atualiza e carrega os conteúdos
      this.updatePath();
      this.loadRepoContents();
    });
  }

  updatePath() {
    console.log('[updatePath] Caminho do repositório:', this.repoPath);
  }

  loadRepoContents() {
    if (!this.username || !this.repo) return;

    this.repoService
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
          console.error(
            '[loadRepoContents] Erro ao carregar repositório:',
            error
          )
      );
  }
  loadFileContent(file: any) {
    console.log('📄 [loadFileContent] Tentando carregar:', file.name);

    if (file.type === 'file' && file.download_url) {
      console.log('🔗 [loadFileContent] URL do arquivo:', file.download_url);

      // Navegar para a URL do arquivo, incluindo o nome do arquivo
      this.router.navigate([
        `/${this.username}/${this.repo}/${this.repoPath}/${file.name}`,
      ]);

      // Agora faz a requisição para pegar o conteúdo do arquivo
      this.repoService.getFileContent(file.download_url).subscribe({
        next: (content) => {
          console.log('✅ [loadFileContent] Conteúdo recebido:', content);
          this.fileContent = content; // Guarda o conteúdo do arquivo
          this.isFile = true; // Sinaliza que um arquivo foi carregado
          console.log('🖥 [loadFileContent] isFile agora é:', this.isFile);
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

  goBack() {
    const prevPath = this.folderNavService.goBack();
    if (prevPath) {
      this.router.navigate([`/${this.username}/${this.repo}/${prevPath}`]);
    } else {
      this.router.navigate([`/${this.username}/${this.repo}`]);
    }
  }
}
