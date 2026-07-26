import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
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
  @Input() isLoading = false;
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  ngAfterViewInit() {
    this.scrollToBottom();
  }
  ngOnInit(): void {
  }


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

  isNewDay(index: number): boolean {
    if (index === 0) {
      return true;
    }

    const current = this.messages[index].timestamp;
    const previous = this.messages[index - 1].timestamp;
    return current.toDateString() !== previous.toDateString();
  }
}
