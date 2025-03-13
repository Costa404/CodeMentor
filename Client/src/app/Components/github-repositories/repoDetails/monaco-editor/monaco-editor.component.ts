// monaco-editor.component.ts
import { Component, Input, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-monaco-editor',
  templateUrl: './monaco-editor.component.html',
  standalone: true,
})
export class MonacoEditorComponent implements AfterViewInit, OnDestroy {
  @Input() content: string = '';
  private monacoEditor: any = null;
  private monacoInstance: any = null;

  async ngAfterViewInit(): Promise<void> {
    if (typeof window !== 'undefined') {
      this.monacoInstance = await import('monaco-editor');
      this.initializeMonacoEditor();
    }
  }

  ngOnDestroy(): void {
    if (this.monacoEditor) {
      this.monacoEditor.dispose();
    }
  }

  private initializeMonacoEditor(): void {
    (window as any).MonacoEnvironment = {
      getWorkerUrl: () =>
        'data:text/javascript;charset=utf-8,' +
        encodeURIComponent('self.onmessage = function(){}'),
    };

    const editorElement = document.getElementById('editor');
    if (editorElement) {
      this.monacoEditor = this.monacoInstance.editor.create(editorElement, {
        value: this.content,
        language: 'javascript',
        theme: 'vs',
        readOnly: true,
        automaticLayout: true,
      });
    }
  }
}
