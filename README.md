# HNG - Todo App - Stage 3b

# [MY drive link for APK](https://drive.google.com/drive/folders/1wwyQ8Ns4xzcB9efyQjpvUKRw4LSZef3Y?usp=sharing)


A sophisticated Todo List application with theme switching and real-time backend integration using Convex.

 Features
 Pixel-perfect design from Figma specifications

 Light/Dark theme switching with smooth animations

 Real-time synchronization using Convex backend

 Full CRUD operations for todos

 Search and filter functionality

 Due date tracking

 Drag and sort capabilities

 Responsive design for all screen sizes

 Accessibility compliance

 Design Reference
Figma Design

 Quick Start
Prerequisites
Node.js (LTS version recommended)

npm or yarn

Expo CLI

iOS Simulator (for iOS development) or Android Studio (for Android development)

Installation
Clone the repository

bash
git clone <repository-url>
cd ToDoApp
Install dependencies

bash
npm install
Install Expo CLI globally (if not already installed)

bash
npm install -g expo-cli
Environment Setup
Create environment file

bash
cp .env.example .env.local
Configure environment variables in .env.local:

text
CONVEX_DEPLOYMENT=your-convex-deployment
EXPO_PUBLIC_CONVEX_URL=your-convex-url
Convex Setup
Install Convex CLI

bash
npm install -g convex-cli
Initialize Convex in your project

bash
npx convex init
Configure your Convex deployment

bash
npx convex deploy
🛠 Development
Running the App
Start development server:

bash
npx expo start
For clean start:

bash
npx expo start --clear
Building the App
Android APK:

bash
# Development build
eas build --platform android --profile development

# Preview build
eas build --platform android --profile preview

# Production build
eas build --platform android --profile production
iOS Build:

bash
# Development build (requires Apple Developer account)
eas build --platform ios --profile development

# Preview build
eas build --platform ios --profile preview
Fixing Common Issues
Clear cache and reinstall dependencies:

bash
npx expo install --fix
npm cache clean --force
rm -rf node_modules
npm install
Fix Java issues (for Android builds):

Set JAVA_HOME environment variable

Ensure Java JDK 11+ is installed

📁 Project Structure
text
ToDoApp/
├── app/                 # Expo Router app directory\
├── components/          # Reusable components\
├── convex/             # Convex backend functions\
├── hooks/              # Custom React hooks\
├── styles/             # Theme and styling\
├── types/              # TypeScript type definitions\
├── assets/             # Images, icons, fonts\
├── app.json           # Expo configuration\
├── eas.json           # EAS build configuration\
└── package.json       # Dependencies\
🎨 Theming System

The app implements a comprehensive theming system:

Light and dark theme support

Persistent theme preferences across app restarts

Smooth transition animations

Consistent color palette across all components

🔄 Real-time Features
Powered by Convex for:

Real-time todo synchronization

Instant updates across devices

Offline capability with sync

Conflict resolution

📱 Core Functionality
Create: Add new todos with title, description, and due date

Read: View todos with real-time updates

Update: Edit todos or toggle completion status

Delete: Remove todos with swipe gestures

Search: Filter todos by text

Sort: Drag and reorder todos

🧪 Testing
Manual Testing Checklist
Theme switching works smoothly

Todos CRUD operations function correctly

Real-time updates work across tabs/devices

Search and filter functionality

Drag and sort operations

App works on different screen sizes

Accessibility features work properly


