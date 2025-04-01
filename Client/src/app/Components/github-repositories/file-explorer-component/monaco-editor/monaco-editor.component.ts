import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  Input,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { LoadingSpinnerComponent } from '../../../../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-monaco-editor',
  templateUrl: './monaco-editor.component.html',
  imports: [CommonModule, LoadingSpinnerComponent],
  standalone: true, // Adicione esta linha se for um componente standalone
})
export class MonacoEditorComponent implements OnInit, OnChanges {
  @Input() content: string = '';
  private editor: any;
  isLoading: boolean = true;

  constructor(private el: ElementRef) {}

  async ngOnInit(): Promise<void> {
    if (typeof window === 'undefined') {
      this.isLoading = false;
      return;
    }

    try {
      this.isLoading = true;

      // Carrega o Monaco Editor
      const monaco = await import('monaco-editor');

      // Configuração do worker
      (self as any).MonacoEnvironment = {
        getWorkerUrl: function (moduleId: string, label: string) {
          return `data:text/javascript;base64,${btoa(`
            self.MonacoEnvironment = { baseUrl: '/' };
            importScripts('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.39.0/min/vs/base/worker/workerMain.js');
          `)}`;
        },
      };

      const editorContainer = this.el.nativeElement.querySelector('#editor');
      if (editorContainer) {
        this.editor = monaco.editor.create(editorContainer, {
          value: this.content,
          language: 'javascript',
          theme: 'hc-black',
        });
      }
    } catch (error) {
      console.error('Failed to load Monaco Editor:', error);
    } finally {
      this.isLoading = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['content'] && this.editor && !changes['content'].firstChange) {
      this.editor.setValue(this.content);
    }
  }

  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.dispose();
    }
  }
}
