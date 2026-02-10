import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chat, User } from '../../models/chat.model';

@Component({
  selector: 'app-chat-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss'
})
export class ChatHeaderComponent implements OnInit {
  @Input() chat: Chat | null = null;

  ngOnInit(): void {}

  getStatusColor(status: string): string {
    switch (status) {
      case 'online':
        return '#31a24c';
      case 'away':
        return '#f39c12';
      case 'offline':
        return '#95a5a6';
      default:
        return '#95a5a6';
    }
  }
}
