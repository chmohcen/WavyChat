# Chat Application Development Guide

## Architecture Overview

This application follows Angular's component-based architecture with reactive programming patterns using RxJS.

### State Management Pattern

The application uses a centralized service-based state management approach:

```typescript
// Service maintains Observables
private chatsSubject = new BehaviorSubject<Chat[]>(initialData);
chats$ = this.chatsSubject.asObservable();

// Components subscribe to Observables
chats$ = inject(ChatService).chats$;

// Templates use async pipe
<div *ngFor="let chat of chats$ | async">
```

**Benefits:**
- Single source of truth
- Reactive data flow
- Automatic unsubscription with async pipe
- Easy testing and mocking

## Key Implementation Details

### 1. Message Auto-Scrolling

The message list component implements manual scroll-to-bottom:

```typescript
@ViewChild('messagesContainer') messagesContainer: ElementRef;

ngAfterViewChecked() {
  if (this.shouldScroll) {
    this.scrollToBottom();
  }
}

private scrollToBottom() {
  this.messagesContainer.nativeElement.scrollTop = 
    this.messagesContainer.nativeElement.scrollHeight;
}
```

**Why AfterViewChecked?**
- Ensures DOM is fully rendered
- Tracks changes and scrolls when needed
- OnChanges flag prevents excessive scrolling

### 2. Responsive Grid Layout

```scss
.layout {
  display: grid;
  grid-template-columns: 320px 1fr;  // Desktop
}

@media (max-width: 768px) {
  .layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;    // Mobile stack
  }
}
```

**Layout Strategy:**
- Desktop: 2-column layout (sidebar + main)
- Tablet: Adjusts sidebar width
- Mobile: Stack vertically with sidebar on top

### 3. Message Bubbles & Status

The message component uses classes for conditional styling:

```html
<div
  class="message"
  [class.message--own]="message.isOwn"
  [class.message--other]="!message.isOwn"
>
```

```scss
.message {
  &--own {
    justify-content: flex-end;
    .message__bubble {
      background: #0084ff;
      color: #fff;
      border-bottom-right-radius: 4px;
    }
  }

  &--other {
    justify-content: flex-start;
    .message__bubble {
      background: #e5e5ea;
      color: #000;
      border-bottom-left-radius: 4px;
    }
  }
}
```

### 4. Search Filtering

Search uses RxJS pattern with immediate filtering:

```typescript
onSearch(query: string) {
  this.searchQuery = query;
  
  this.chats$.subscribe(chats => {
    if (query.trim()) {
      const filtered = chats.filter(chat =>
        chat.participants[0].name.toLowerCase()
          .includes(query.toLowerCase())
      );
      this.filteredChats$ = of(filtered);
    } else {
      this.filteredChats$ = this.chats$;
    }
  });
}
```

### 5. Mock Data & Simulation

The ChatService generates mock conversations:

```typescript
private generateMockChats(): Chat[] {
  return users.map((user, index) => ({
    id: `chat-${index + 1}`,
    participants: [user],
    lastMessage: 'Hey! How are you doing?',
    lastMessageTime: new Date(Date.now() - index * 3600000),
    unreadCount: Math.floor(Math.random() * 3)
  }));
}
```

Auto-reply simulation:

```typescript
sendMessage(content: string) {
  // ... send user message
  
  // Simulate reply
  setTimeout(() => {
    const reply: Message = {
      // ... reply data
    };
    this.messagesSubject.next([
      ...this.messagesSubject.value, 
      reply
    ]);
  }, 1000);
}
```

## Component Communication

### Parent → Child (Input Properties)

```typescript
// Parent
<app-chat-header [chat]="selectedChat$ | async"></app-chat-header>

// Child
@Input() chat: Chat | null = null;
```

### Child → Parent (Event Emitter)

```typescript
// Parent
<app-message-input (messageSent)="onMessageSent($event)"></app-message-input>

onMessageSent(content: string) {
  this.chatService.sendMessage(content);
}

// Child
@Output() messageSent = new EventEmitter<string>();

onSendMessage() {
  this.messageSent.emit(this.messageText);
}
```

## Styling Patterns

### BEM-like Naming

Components use descriptive class names for clear hierarchy:

```scss
.chat-item {           // Block
  &__avatar {          // Element
    &:hover {          // Modifier
      transform: scale(1.05);
    }
  }

  &--active {          // Alternative modifier
    background: #f0f0f0;
  }
}
```

### Flexbox for Alignment

Flex layout used extensively:

```scss
.sidebar {
  display: flex;
  flex-direction: column;  // Stack vertically
  
  .sidebar__chats {
    flex: 1;              // Take remaining space
    overflow-y: auto;     // Scrollable
  }
}
```

### Custom Scrollbars

WebKit scrollbar styling for consistent look:

```scss
&::-webkit-scrollbar {
  width: 6px;
}

&::-webkit-scrollbar-track {
  background: transparent;
}

&::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 3px;
  
  &:hover {
    background: #bbb;
  }
}
```

## Animation Techniques

### Smooth Transitions

```scss
transition: all 0.2s ease;

&:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
```

### Keyframe Animations

```scss
@keyframes messageSlideIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message {
  animation: messageSlideIn 0.3s ease;
}
```

## Reactive Programming with RxJS

### BehaviorSubject Pattern

```typescript
// Create subject with initial value
private chatsSubject = new BehaviorSubject<Chat[]>(initialValue);

// Expose as Observable
chats$ = this.chatsSubject.asObservable();

// Update value
const newChats = [...this.chatsSubject.value, newChat];
this.chatsSubject.next(newChats);
```

**Why BehaviorSubject?**
- Provides last value to new subscribers
- Easily testable
- Type-safe
- No cold start issues

### Async Pipe Benefits

```html
<!-- Auto-unsubscribes on component destroy -->
<div *ngFor="let chat of chats$ | async">

<!-- No memory leaks -->
<!-- No manual subscription management -->
<!-- Automatic change detection -->
```

## Testing Considerations

### Testable Service

```typescript
// Mock ChatService for tests
const mockChatService = {
  chats$: of([...mockChats]),
  selectedChat$: of(mockChats[0]),
  selectChat: jasmine.createSpy('selectChat'),
  sendMessage: jasmine.createSpy('sendMessage')
};

// Use in component test
TestBed.overrideProvider(ChatService, 
  { useValue: mockChatService });
```

### Component Testing

```typescript
it('should display chats from service', (done) => {
  component.chats$ = of([mockChat]);
  fixture.detectChanges();
  
  fixture.whenStable().then(() => {
    const chatElements = fixture.debugElement.queryAll(
      By.css('.chat-item')
    );
    expect(chatElements.length).toBe(1);
    done();
  });
});
```

## Performance Tips

1. **Change Detection**
   - Use OnPush strategy for better performance
   - Reduce unnecessary checks

2. **TrackBy in *ngFor**
   ```html
   <div *ngFor="let chat of chats$ | async; trackBy: trackByFn">
   ```

3. **Lazy Load Components**
   - Heavy modals or tabs can be lazy loaded

4. **Memoization**
   - Cache computed values using shareReplay()

5. **Unsubscribe Pattern**
   - Async pipe handles this automatically
   - Use takeUntil for manual subscriptions

## Common Pitfalls & Solutions

### Memory Leaks
**Problem:** Manual subscriptions without unsubscribe
**Solution:** Use async pipe or takeUntil

### ExpressionChangedAfterCheck
**Problem:** Updating properties after view checks
**Solution:** Use ngAfterViewChecked or ChangeDetectionStrategy.OnPush

### Scroll Not Working
**Problem:** Scrolling before DOM renders
**Solution:** Use ngAfterViewChecked with flag

### Type Errors with Async
**Problem:** Type 'T | null' not assignable to 'T'
**Solution:** Use || [] or [required] input

## Extending the Application

### Adding User Profiles

```typescript
// Add to models
export interface UserProfile {
  bio: string;
  joinDate: Date;
  mutualFriends: number;
}

// Extend service
userProfiles$ = new BehaviorSubject<UserProfile[]>([]);

// Create profile component
@Component({...})
export class UserProfileComponent {
  @Input() userId: string;
  profile$ = this.chatService.getUserProfile(userId);
}
```

### Adding Message Search

```typescript
private searchMessagesSubject = new BehaviorSubject<string>('');
searchResults$ = combineLatest([
  this.messages$,
  this.searchMessagesSubject.asObservable()
]).pipe(
  map(([messages, query]) =>
    messages.filter(m =>
      m.content.toLowerCase().includes(query.toLowerCase())
    )
  )
);

searchMessages(query: string) {
  this.searchMessagesSubject.next(query);
}
```

### Dark Mode Support

```scss
// Use CSS custom properties
:host {
  --bg-primary: #fff;
  --text-primary: #000;
}

@media (prefers-color-scheme: dark) {
  :host {
    --bg-primary: #1a1a1a;
    --text-primary: #fff;
  }
}

// Use in components
background: var(--bg-primary);
color: var(--text-primary);
```

## Debugging Tips

1. **Angular DevTools**
   - Inspect component state
   - View change detection
   - Profile performance

2. **RxJS Debugging**
   ```typescript
   messages$.pipe(
     tap(msg => console.log('Messages:', msg))
   ).subscribe(...)
   ```

3. **Template Debugging**
   ```html
   {{ messages$ | async | json }}
   ```

4. **NetworkTab**
   - Monitor HTTP requests
   - Check response times

## Resources

- [Angular Documentation](https://angular.dev)
- [RxJS Documentation](https://rxjs.dev)
- [SCSS Documentation](https://sass-lang.com)
- [MDN Web Docs](https://developer.mozilla.org)

## Deployment

### Build for Production

```bash
ng build --configuration production
```

### Deploy to Firebase

```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

### Environment Configuration

Create `environment.ts` and `environment.prod.ts` for different configurations:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
```

## Support & Contributing

For bugs and feature requests, please create an issue in the repository.
