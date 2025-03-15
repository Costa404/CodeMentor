// folder-navigation.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FolderNavigationService {
  private folderHistory: string[] = [];

  navigateToFolder(folderPath: string): void {
    console.log('Navegando para pasta:', folderPath);
    this.folderHistory.push(folderPath);
    console.log('Histórico:', this.folderHistory);
  }

  goBack(): string | null {
    if (this.folderHistory.length > 0) {
      return this.folderHistory.pop() || null;
    }
    2;
    return null;
  }
}
