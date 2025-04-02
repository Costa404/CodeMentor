import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { ChatService } from './chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class ChatComponent implements OnInit {
  @Input() fileContent: string = '';

  chatMessages: { sender: string; message: string }[] = [];
  userQuery: string = '';
  isLoading: boolean = false;

  isOpen$: any;

  constructor(
    private chatService: ChatService,
    private cdr: ChangeDetectorRef
  ) {
    this.isOpen$ = this.chatService.isOpen$;
  }

  ngOnInit() {
    if (this.fileContent) {
      this.analyzeCode();
    }
    this.chatService.closeModal();
    this.cdr.detectChanges();
  }

  analyzeCode() {
    if (!this.fileContent) return;

    this.isLoading = true;
    const requestPayload = JSON.stringify({ query: this.fileContent });

    this.chatService.analyzeCode(requestPayload).subscribe({
      next: (response) => {
        this.chatMessages.push({ sender: 'AI', message: response.suggestion });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro na análise:', error);
        this.isLoading = false;
      },
    });
  }

  askMore() {
    if (!this.userQuery.trim()) return;

    this.isLoading = true;
    const requestPayload = JSON.stringify({ query: this.userQuery });

    this.chatService.analyzeCode(requestPayload).subscribe({
      next: (response) => {
        console.log('Resposta da IA:', response.suggestion);
        this.chatMessages.push({ sender: 'User', message: this.userQuery });
        this.chatMessages.push({ sender: 'AI', message: response.suggestion });
        this.userQuery = '';
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao perguntar:', error);
        this.isLoading = false;
      },
    });
  }

  openChat() {
    this.chatService.openModal();
  }

  closeChat() {
    this.chatService.closeModal();
  }
}
