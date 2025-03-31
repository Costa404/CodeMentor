import { Component } from '@angular/core';
import { ChatComponent } from '../github-repositories/file-explorer-component/chat/chat.component';
import { CommonModule } from '@angular/common';

import { ChatService } from '../github-repositories/file-explorer-component/chat/chat.service';
import { GithubRepositoriesComponent } from '../github-repositories/github-repositories.component';
import { PopularReposComponent } from './popular-repos/popular-repos.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  imports: [
    ChatComponent,
    CommonModule,
    GithubRepositoriesComponent,
    PopularReposComponent,
    PopularReposComponent,
  ],
})
export class HomepageComponent {
  constructor(private chatService: ChatService) {}

  openChat() {
    this.chatService.openModal();
  }
}
