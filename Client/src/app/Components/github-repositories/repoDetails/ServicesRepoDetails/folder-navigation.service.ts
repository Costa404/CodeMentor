// folder-navigation.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FolderNavigationService {
  private folderHistory: string[] = [];

  navigateToFolder(folderPath: string): void {
    this.folderHistory.push(folderPath);
  }

  goBack(): string | null {
    if (this.folderHistory.length > 0) {
      return this.folderHistory.pop() || null;
    }
    return null;
  }
}
