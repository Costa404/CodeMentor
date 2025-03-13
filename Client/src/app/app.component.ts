import { Component, OnInit } from '@angular/core';
import { AuthService } from './Components/dashboard/auth.service'; // Importa o serviço de autenticação
import { NavbarComponent } from './Components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FolderNavigationService } from './Components/github-repositories/repoDetails/folder-navigation.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private folderNavigationService: FolderNavigationService) {
    console.log(
      '📢 FolderNavigationService injetado no AppComponent:',
      this.folderNavigationService
    );
  }
}
