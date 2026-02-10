import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../../models/chat.model';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.scss',
})
export class MessageListComponent implements OnInit {
  @Input() messages: Message[] = [];
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  // private shouldScroll = true;
  ngAfterViewInit() {
    this.scrollToBottom();
  }
  ngOnInit(): void {
    // this.scrollToBottom();
  }

  // ngAfterViewChecked(): void {
  //   if (this.shouldScroll && this.messagesContainer) {
  //     this.scrollToBottom();
  //     this.shouldScroll = false;
  //   }
  // }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['messages']) {
  //     this.shouldScroll = true;
  //   }
  // }

  private scrollToBottom(): void {
    try {
      console.log('Scrolling to bottom...');
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;

    } catch (err) {
      console.error('Scroll error:', err);
    }
  }

  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  getMessageGroupKey(message: Message, prevMessage?: Message): boolean {
    if (!prevMessage) return true;

    const timeDiff = message.timestamp.getTime() - prevMessage.timestamp.getTime();
    const fiveMinutes = 5 * 60 * 1000;

    return message.sender.id !== prevMessage.sender.id || timeDiff > fiveMinutes;
  }
}
