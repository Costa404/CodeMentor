import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepoDetailsService } from '../ServicesRepoDetails/repo-details.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-monaco-editor',
  templateUrl: './monaco-editor.component.html',
  imports: [CommonModule],
  standalone: true,
})
export class MonacoEditorComponent implements OnInit {
  username!: string;
  repoName!: string;
  filePath!: string;
  fileContent!: string;
  @Input() content: string = '';

  constructor(
    private route: ActivatedRoute,
    private repoDetailsService: RepoDetailsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.username = params['username'];
      this.repoName = params['repo'];
      this.filePath = this.route.snapshot.url
        .slice(2)
        .map((segment) => segment.path)
        .join('/'); // Captura o caminho do arquivo

      this.repoDetailsService
        .getFileContent(
          `https://raw.githubusercontent.com/${this.username}/${this.repoName}/main/${this.filePath}`
        )
        .subscribe({
          next: (content) => {
            this.fileContent = content;
          },
          error: () => {
            console.error('Erro ao carregar o arquivo.');
          },
        });
    });
  }
}
