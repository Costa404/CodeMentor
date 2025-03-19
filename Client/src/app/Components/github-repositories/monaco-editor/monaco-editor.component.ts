import {
  Component,
  OnInit,
  Input,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-monaco-editor',
  templateUrl: './monaco-editor.component.html',
})
export class MonacoEditorComponent implements OnInit, OnChanges {
  @Input() content: string = '';
  private editor: any; // Evita importar diretamente o Monaco

  constructor(private el: ElementRef) {}

  async ngOnInit(): Promise<void> {
    if (typeof window !== 'undefined') {
      const monaco = await import('monaco-editor');

      // Configuração correta dos workers para evitar erro
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
          theme: 'vs-dark',
        });
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['content'] && this.editor) {
      this.editor.setValue(this.content);
    }
  }
}
