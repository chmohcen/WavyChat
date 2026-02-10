# Modern Chat Application

A beautiful, responsive chat UI built with Angular, SCSS, RxJS, and modern web technologies.

## Features

✨ **Modern Design**
- Clean and minimal interface inspired by WhatsApp and Discord
- Smooth animations and transitions
- Professional color scheme (#0084ff primary, neutral grays)
- Custom scrollbars and polished UI elements

📱 **Responsive Layout**
- Mobile-first design
- Adapts seamlessly from mobile (320px+) to desktop (1920px+)
- Flexible grid-based layout
- Touch-friendly interface

💬 **Chat Features**
- Real-time message sending with optimistic updates
- Auto-scroll to latest messages
- Message timestamps and read status indicators
- User presence indicators (online, away, offline)
- Typing animation support

🎨 **Interactive Elements**
- Emoji picker with smooth animations
- Search conversations by name
- Unread message badges
- Active chat highlighting
- User avatars generated from DiceBear API

⚡ **Reactive State Management**
- RxJS Observables for state management
- Centralized ChatService
- Real-time data binding with async pipe
- Optimistic UI updates

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── layout.component.ts
│   │   │   ├── layout.component.html
│   │   │   └── layout.component.scss
│   │   ├── sidebar/
│   │   │   ├── sidebar.component.ts
│   │   │   ├── sidebar.component.html
│   │   │   └── sidebar.component.scss
│   │   ├── chat-area/
│   │   │   ├── chat-area.component.ts
│   │   │   ├── chat-area.component.html
│   │   │   └── chat-area.component.scss
│   │   ├── chat-header/
│   │   │   ├── chat-header.component.ts
│   │   │   ├── chat-header.component.html
│   │   │   └── chat-header.component.scss
│   │   ├── message-list/
│   │   │   ├── message-list.component.ts
│   │   │   ├── message-list.component.html
│   │   │   └── message-list.component.scss
│   │   └── message-input/
│   │       ├── message-input.component.ts
│   │       ├── message-input.component.html
│   │       └── message-input.component.scss
│   ├── services/
│   │   └── chat.service.ts
│   ├── models/
│   │   └── chat.model.ts
│   ├── app.ts
│   ├── app.html
│   ├── app.scss
│   └── app.routes.ts
├── styles.scss
├── index.html
└── main.ts
```

## Components

### LayoutComponent
The main container that manages the grid layout with sidebar and chat area. Handles responsive breakpoints for mobile and desktop views.

**Features:**
- CSS Grid layout (320px sidebar on desktop)
- Responsive breakpoints at 768px and 480px
- Mobile: Sidebar becomes horizontal header

### SidebarComponent
Left panel showing user profile, search, and chat list.

**Features:**
- User avatar with online status indicator
- Search input with real-time filtering
- Scrollable chat list with avatars, names, and last messages
- Unread badges with animations
- Active chat highlighting

### ChatAreaComponent
Main container for the active chat, combining header, messages, and input.

**Features:**
- Flexible layout with header, content, and footer
- Full viewport height and width management

### ChatHeaderComponent
Header showing active chat information and action buttons.

**Features:**
- User avatar with status indicator
- User name and status
- Voice and video call buttons
- More options menu

### MessageListComponent
Scrollable message history with auto-scroll to latest.

**Features:**
- Incoming/outgoing message bubbles with different styling
- Timestamps and read status (dual checkmarks)
- Message grouping by sender
- Automatic scroll to bottom on new messages
- Smooth fade-in animation for new messages

### MessageInputComponent
Input area with emoji picker and send button.

**Features:**
- Expandable textarea
- Emoji picker with 12 common emojis
- Shift+Enter for new line, Enter to send
- Send button with disabled state while empty
- Smooth animations

## Services

### ChatService
Centralized state management using RxJS BehaviorSubjects.

**Observables:**
- `currentUser$` - Current user information
- `chats$` - List of all chats
- `selectedChat$` - Currently active chat
- `messages$` - Messages in active chat
- `searchQuery$` - Chat search query

**Methods:**
- `selectChat(chat)` - Change active chat
- `sendMessage(content)` - Send and broadcast message
- `searchChats(query)` - Filter chats by name
- `markChatAsRead(chatId)` - Clear unread count

**Mock Data:**
- 5 sample chats with different users
- 8 messages per conversation
- Automatic reply simulation (1 second delay)

## Models

### User
```typescript
{
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
}
```

### Chat
```typescript
{
  id: string;
  participants: User[];
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  currentUser: User;
}
```

### Message
```typescript
{
  id: string;
  chatId: string;
  sender: User;
  content: string;
  timestamp: Date;
  isRead: boolean;
  isOwn: boolean;
}
```

## Styling Approach

### Color Palette
- Primary: #0084ff (Facebook blue)
- Secondary: #f39c12 (Away status)
- Success: #31a24c (Online status)
- Light Gray: #f5f5f5, #e5e5ea
- Dark Gray: #666, #999, #000

### Responsive Breakpoints
- Desktop: 1024px+ (sidebar 280-320px)
- Tablet: 768px - 1023px
- Mobile: 480px - 767px
- Small Mobile: < 480px

### Key SCSS Features
- Nested selectors for component organization
- CSS custom properties for colors
- Smooth transitions (0.2s ease)
- Custom scrollbar styling
- Flexbox for layout alignment
- Gradient animations for badges

## Getting Started

### Prerequisites
- Node.js (v18+)
- Angular CLI 19+

### Installation

```bash
cd chat-frontend
npm install
```

### Development Server

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

## Usage

1. **View Chats**: The sidebar displays available conversations with the latest message preview
2. **Search**: Type in the search box to filter conversations by user name
3. **Select Chat**: Click a chat to open it and view message history
4. **Send Message**: Type in the input area and press Enter or click Send
5. **Add Emoji**: Click the emoji button to select from predefined emojis
6. **View Status**: User status badges show online (green), away (yellow), or offline (gray)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance Optimizations

- OnPush change detection strategy (can be added)
- TrackBy in *ngFor loops for chat list
- Lazy loading for heavy components
- Custom scrollbar for optimal UX
- Minimal DOM operations

## Accessibility

- Semantic HTML structure
- ARIA labels for icon buttons
- Focus-visible outlines on interactive elements
- Proper color contrast ratios
- Keyboard navigation support

## Future Enhancements

- [ ] Message search and filtering
- [ ] Conversation pinning
- [ ] Message reactions
- [ ] Typing indicators
- [ ] Voice/Video call UI
- [ ] Image sharing
- [ ] Message editing and deletion
- [ ] Group chats
- [ ] User profiles
- [ ] Settings/preferences panel
- [ ] Dark mode
- [ ] Message encryption

## License

MIT
