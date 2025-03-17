import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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
    return null;
  }

  navigateAndUpdateRoute(
    folderPath: string,
    username: string,
    repo: string,
    router: Router
  ): void {
    this.navigateToFolder(folderPath);
    router.navigate([`/${username}/${repo}/${folderPath}`]);
  }
}
