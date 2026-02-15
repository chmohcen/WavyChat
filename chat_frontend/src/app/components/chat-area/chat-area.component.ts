import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { ChatHeaderComponent } from '../chat-header/chat-header.component';
import { MessageListComponent } from '../message-list/message-list.component';
import { MessageInputComponent } from '../message-input/message-input.component';
import { Chat, Message } from '../../models/chat.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat-area',
  standalone: true,
  imports: [
    CommonModule,
    ChatHeaderComponent,
    MessageListComponent,
    MessageInputComponent
  ],
  templateUrl: './chat-area.component.html',
  styleUrl: './chat-area.component.scss'
})
export class ChatAreaComponent implements OnInit {
  selectedChat$: Observable<Chat | null>;
  messages$: Observable<Message[]>;

  constructor(private chatService: ChatService) {
    this.selectedChat$ = this.chatService.selectedChat$;
    this.messages$ = this.chatService.messages$;
  }

  ngOnInit(): void {}

  onMessageSent(content: string): void {
    this.chatService.sendMessage(content);
  }
}
