import { CommonModule } from '@angular/common';
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
  imports: [CommonModule],
})
export class MonacoEditorComponent implements OnInit, OnChanges {
  @Input() content: string = '';
  private editor: any;
  isLoading: boolean = true; // Adiciona estado de loading

  constructor(private el: ElementRef) {}

  async ngOnInit(): Promise<void> {
    if (typeof window !== 'undefined') {
      this.isLoading = true; // Ativa o loading

      const monaco = await import('monaco-editor');

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

      this.isLoading = false; // Desativa o loading quando o Monaco estiver pronto
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['content'] && this.editor) {
      this.editor.setValue(this.content);
    }
  }
}
