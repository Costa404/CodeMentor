import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FolderNavigationService {
  private folderHistory: string[] = []; // Histórico de pastas
  private currentPath: string = ''; // Caminho da pasta atual

  constructor() {
    console.log('✅ FolderNavigationService foi instanciado!');
  }

  // Obter o caminho da pasta atual
  getCurrentPath(): string {
    console.log('📌 Obtendo caminho atual:', this.currentPath);
    return this.currentPath;
  }

  // Atualizar o caminho para a nova pasta
  navigateToFolder(path: string): void {
    console.log(`📂 Navegando para a pasta: ${path}`);
    this.folderHistory.push(this.currentPath); // Adiciona o caminho atual ao histórico
    this.currentPath = path; // Atualiza o caminho para o novo
  }

  // Voltar para a pasta anterior
  goBack(): string {
    if (this.folderHistory.length > 0) {
      this.currentPath = this.folderHistory.pop() || ''; // Retorna à pasta anterior
    }
    console.log('⬅️ Voltando para:', this.currentPath);
    return this.currentPath;
  }

  // Limpar o histórico e o caminho atual
  reset(): void {
    console.log('🗑️ Resetando histórico e caminho atual');
    this.folderHistory = [];
    this.currentPath = '';
  }
}
