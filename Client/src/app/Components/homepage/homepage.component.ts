import { Component } from '@angular/core';
import { ChatComponent } from '../github-repositories/file-explorer-component/chat/chat.component';
import { CommonModule } from '@angular/common';
import { GithubAccountDetailsComponent } from '../github-account-details/github-account-details.component';
import { ChatService } from '../github-repositories/file-explorer-component/chat/chat.service';
import { GithubRepositoriesComponent } from '../github-repositories/github-repositories.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  imports: [ChatComponent, CommonModule, GithubRepositoriesComponent],
})
export class HomepageComponent {
  constructor(private chatService: ChatService) {}

  openChat() {
    this.chatService.openModal();
  }
}
