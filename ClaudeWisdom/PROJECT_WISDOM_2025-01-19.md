# Project Wisdom Dump - January 19, 2025

## 📁 Project Overview
**Leep Inc Music Collaboration Platform**
- **Location**: `/mnt/c/Users/racer/OneDrive/Documents/VS Code Projects/Leep_Inc/Leep_Inc`
- **Type**: React + Vite frontend with Node.js/Express backend
- **Purpose**: Music collaboration platform for artists to share stems, remix, and network

## 🚀 Getting Up to Speed - Quick Start Guide

### 1. Development Environment Setup
```bash
# Navigate to project directory
cd "/mnt/c/Users/racer/OneDrive/Documents/VS Code Projects/Leep_Inc/Leep_Inc"

# Install dependencies (if not done)
npm install

# Start development server
npm run dev
# Server runs on: http://localhost:5173

# Build for production
npm run build

# Preview production build
npm run preview
```

### 2. Project Structure Understanding
```
Leep_Inc/
├── backend/                 # Node.js/Express API
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── uploads/            # File upload storage
├── src/                    # Frontend React app
│   ├── pages/              # Route components
│   │   ├── Landing/        # Homepage with animations
│   │   ├── Pricing/        # 3-tier pricing plans
│   │   ├── About/          # Company info & team
│   │   ├── Contact/        # Contact form & FAQ
│   │   ├── Messages/       # Chat interface
│   │   ├── Profile/        # User profiles
│   │   ├── Discovery/      # Music discovery
│   │   └── Collaboration/  # Collab tools
│   ├── components/
│   │   └── common/
│   │       ├── Button.jsx  # Reusable button
│   │       └── Navigation.jsx # Site navigation
│   └── styles/
│       └── globals.css     # All styling + CSS variables
├── Test Folder/            # Reference implementations
├── package.json            # Frontend dependencies
├── tailwind.config.js      # Tailwind configuration
└── vite.config.js          # Vite bundler config
```

### 3. Available Pages & URLs
- **Landing**: `http://localhost:5173/` - Homepage with animations
- **Pricing**: `http://localhost:5173/pricing` - Subscription plans
- **About**: `http://localhost:5173/about` - Company info
- **Contact**: `http://localhost:5173/contact` - Contact form
- **Messages**: `http://localhost:5173/messages` - Chat interface
- **Profile**: `http://localhost:5173/profile` - User profiles
- **Discovery**: `http://localhost:5173/discovery` - Music discovery
- **Collaboration**: `http://localhost:5173/collab` - Collaboration tools

## 🎨 Design System & Styling

### CSS Variables (Brand Colors)
```css
:root {
  --color-primary: #FFCB05;     /* Bright yellow */
  --color-secondary: #121212;   /* Dark background */
  --color-accent: #1DB954;      /* Spotify green */
  --color-muted: #2C2C2C;       /* Card backgrounds */
  --color-border: #333333;      /* Soft dividers */
}
```

### Key CSS Classes
- `.card-base` - Standard card styling
- `.btn-primary` / `.btn-secondary` - Button styles
- `.section-title` - Page headings
- `.navigation` - Top nav bar
- Page-specific classes: `.about-page`, `.contact-page`, `.messages-page`

### Styling Approach
- **Custom CSS classes** in `globals.css` (not Tailwind utilities)
- **CSS variables** for consistent theming
- **Standard Tailwind utilities** for layout (`p-4`, `rounded-md`, etc.)
- **No @apply directives** (caused build issues with Tailwind v4)

## 🛠️ Technical Implementation Notes

### Major Issues Resolved
1. **Tailwind CSS v4 Compatibility**
   - Problem: Custom colors in `tailwind.config.js` not working with @apply
   - Solution: Use CSS variables + custom classes instead of Tailwind theme extension
   - All @apply directives converted to standard CSS

2. **Build System**
   - Vite + React + TailwindCSS v4 working properly
   - No more "unknown utility class" errors
   - Clean production builds

3. **Navigation**
   - Added sticky header navigation
   - All pages accessible via menu
   - Mobile responsive design

### Backend API (Port 3001)
```javascript
// Available endpoints:
GET  /api/profile/:id     // User profiles
POST /api/upload          // File uploads
POST /api/swipe          // Swipe functionality  
POST /api/message        // Messaging
POST /api/remix-request  // Collaboration requests
GET  /health             // Health check
```

### Frontend State Management
- React hooks for local state
- No global state library implemented yet
- Form handling with controlled components
- Mock data for development

## 🧩 Key Components Deep Dive

### Landing Page (`src/pages/Landing/`)
- **SubHero**: Animated artist slideshow with rotating features
- **Hero**: Main headline with CTA button
- **Reviews**: Testimonial grid with hover effects
- **Animations**: CSS keyframes for smooth transitions

### Navigation (`src/components/common/Navigation.jsx`)
- Sticky header with logo + navigation links
- React Router Link components
- Responsive design for mobile
- Hover effects using brand colors

### Messages Page (`src/pages/Messages/`)
- Chat interface with sidebar
- Mock conversations and messages
- Real-time UI patterns (ready for WebSocket integration)
- Online status indicators

## 📋 Development Workflow

### Making Changes
1. **Read existing code first** - Use Read tool before editing
2. **Follow existing patterns** - Match current styling approach
3. **Use CSS variables** - Don't hardcode colors
4. **Test navigation** - Ensure all pages are accessible
5. **Check build** - Run `npm run build` to verify no errors

### Common Tasks
```bash
# Add new page
# 1. Create folder in src/pages/NewPage/
# 2. Create index.jsx component
# 3. Add route in App.jsx
# 4. Add navigation link in Navigation.jsx
# 5. Add CSS classes in globals.css

# Fix styling issues
# 1. Check globals.css for existing classes
# 2. Use CSS variables for colors
# 3. Avoid @apply directives
# 4. Test with npm run build
```

### Code Conventions
- **PascalCase** for React components
- **kebab-case** for CSS classes
- **camelCase** for JavaScript variables
- **Page components** in `src/pages/PageName/index.jsx`
- **Shared components** in `src/components/common/`

## 🔍 Debugging Common Issues

### Build Errors
- **"Cannot apply unknown utility class"**: Convert @apply to standard CSS
- **"variant does not exist"**: Use standard CSS media queries instead of responsive prefixes in @apply
- **Missing imports**: Check file paths and component exports

### Styling Issues
- **Colors not working**: Use CSS variables instead of Tailwind classes
- **Layout broken**: Check if using standard Tailwind utilities correctly
- **Responsive issues**: Test mobile navigation and page layouts

### Navigation Problems
- **Page not found**: Check route definition in App.jsx
- **Navigation not updating**: Ensure using React Router Link components

## 📚 Reference Files
- **Test Folder**: Contains reference implementations
- **README.md**: Project documentation and setup guide
- **tailwind.config.js**: Color definitions and theme config
- **package.json**: Dependencies and scripts

## 🎯 Current Status
✅ **Complete working prototype**
✅ **All pages implemented and accessible**  
✅ **Consistent design system**
✅ **Responsive navigation**
✅ **Clean build process**
✅ **Professional styling**

## 🚧 Next Steps (Future Development)
- **Backend integration**: Connect frontend to API endpoints
- **Authentication**: User login/signup system
- **Real-time features**: WebSocket integration for messaging
- **File uploads**: Integrate with backend upload system
- **Database**: Connect to Supabase or chosen database
- **Image assets**: Replace placeholders with real images
- **Testing**: Add unit and integration tests

## 💡 Development Tips
1. **Always read files before editing** - Understand existing structure
2. **Use the TodoWrite tool** - Track progress on complex tasks
3. **Test navigation frequently** - Ensure user can access all features
4. **Check mobile responsiveness** - Navigation adapts to smaller screens
5. **Follow existing patterns** - Maintain code consistency
6. **Use CSS variables** - Easier theming and maintenance

---

*This wisdom dump represents the current state as of January 19, 2025. Update this file when making significant architectural changes.*