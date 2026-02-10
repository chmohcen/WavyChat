# Quick Start Guide

## Installation & Setup

### 1. Prerequisites
```bash
node --version  # Should be v18 or higher
npm --version   # Should be v9 or higher
```

### 2. Install Dependencies
```bash
cd chat-frontend
npm install
```

### 3. Start Development Server
```bash
ng serve
ng serve --open  # Opens in browser automatically
```

The app will be available at `http://localhost:4200`

### 4. Build for Production
```bash
ng build
ng build --configuration production
```

## Project Commands

```bash
# Start dev server with auto-reload
ng serve

# Run tests
ng test

# Run lint
ng lint

# Generate new component
ng generate component components/my-component

# Generate new service
ng generate service services/my-service
```

## File Structure Quick Reference

```
├── src/
│   ├── app/
│   │   ├── components/          # Reusable UI components
│   │   ├── services/            # Business logic & state
│   │   ├── models/              # TypeScript interfaces
│   │   ├── app.ts               # Root component
│   │   └── app.routes.ts        # Route configuration
│   ├── styles.scss              # Global styles
│   ├── index.html               # HTML template
│   └── main.ts                  # Entry point
├── angular.json                 # Angular CLI config
├── package.json                 # Dependencies
└── tsconfig.json                # TypeScript config
```

## Key Features

✅ **Responsive Design**
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

✅ **Real-time Features**
- Message sending with auto-reply simulation
- Chat search and filtering
- Unread badges
- User status indicators

✅ **Modern Angular**
- Standalone components
- RxJS Observables
- Async pipe for data binding
- TypeScript strict mode

## Common Tasks

### View Available Components
All components are in `src/app/components/`:
- **layout** - Main container
- **sidebar** - Chat list & search
- **chat-area** - Active chat view
- **chat-header** - User info & actions
- **message-list** - Message history
- **message-input** - Send message

### Modify Styling
Edit component `.scss` files or global `styles.scss`:
- Colors defined with hex values
- Breakpoints at 768px, 480px
- BEM-like naming with &__ and &--

### Update Mock Data
Edit `src/app/services/chat.service.ts`:
- `generateMockChats()` - Chat list data
- `generateMockMessages()` - Message history
- `generateReply()` - Simulated responses

### Add New Colors
Update in relevant component `.scss` or global styles:
```scss
$primary: #0084ff;
$success: #31a24c;
```

## Debugging

### View Console Errors
Open browser DevTools: `F12` or `Cmd+Option+I`

### Enable Source Maps
Already enabled in dev mode for debugging `.ts` files

### Use RxJS DevTools
Chrome extension: "RxJS DevTools"

### Angular DevTools
Chrome extension: "Angular DevTools"

## Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome  | ✅ Latest |
| Firefox | ✅ Latest |
| Safari  | ✅ Latest |
| Edge    | ✅ Latest |
| Mobile  | ✅ iOS & Android |

## Troubleshooting

### Port 4200 Already in Use
```bash
ng serve --port 4300
```

### Node Modules Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
ng build  # Full compilation check
```

### Styles Not Applied
- Clear browser cache (Ctrl+Shift+Del)
- Check CSS specificity
- Use DevTools inspector

## Performance

- **Bundle Size**: ~86KB (development)
- **Page Load**: < 1s (fresh load)
- **First Paint**: < 500ms

## Next Steps

1. **Explore Components** - Look at `src/app/components/`
2. **Read DEVELOPMENT.md** - Deep dive into implementation
3. **Check Models** - Understand data structures
4. **Modify Styles** - Try changing colors/layout
5. **Extend Features** - Add new chat features

## Resources

- [Angular Documentation](https://angular.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [SCSS Guide](https://sass-lang.com/guide)
- [RxJS Guide](https://rxjs.dev/guide)

## Get Help

Check these files for documentation:
- **README-CHAT.md** - Features & architecture
- **DEVELOPMENT.md** - Implementation details
- **Code comments** - Inline explanations

Happy coding! 🚀
