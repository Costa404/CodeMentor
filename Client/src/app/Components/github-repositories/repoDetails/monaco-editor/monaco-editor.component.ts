import {
  Component,
  OnInit,
  Input,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import * as monaco from 'monaco-editor';

@Component({
  selector: 'app-monaco-editor',
  templateUrl: './monaco-editor.component.html',
})
export class MonacoEditorComponent implements OnInit, OnChanges {
  @Input() content: string = ''; // Recebe o conteúdo como entrada
  private editor: monaco.editor.IStandaloneCodeEditor | undefined;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    // Referência ao elemento div com ID 'editor'
    const editorContainer = this.el.nativeElement.querySelector('#editor');

    if (editorContainer) {
      // Inicializa o Monaco Editor dentro do div 'editor'
      this.editor = monaco.editor.create(editorContainer, {
        value: this.content, // Passa o conteúdo recebido
        language: 'javascript',
        theme: 'vs-dark',
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Verifica se o conteúdo foi alterado e atualiza o Monaco Editor
    if (changes['content'] && this.editor) {
      this.editor.setValue(this.content); // Atualiza o conteúdo no Monaco Editor
    }
  }
}
