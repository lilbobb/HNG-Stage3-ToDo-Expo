import React from 'react';
import { Stack } from 'expo-router';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { ThemeProvider } from '../contexts/ThemeContext';

// Expo automatically reads from .env, no need for dotenv
const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  console.error('Missing EXPO_PUBLIC_CONVEX_URL environment variable');
  // You can provide a fallback or throw an error
}

const convex = new ConvexReactClient(convexUrl!);

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <ThemeProvider>
        <Stack>
          <Stack.Screen 
            name="index" 
            options={{ 
              headerShown: false
            }} 
          />
        </Stack>
      </ThemeProvider>
    </ConvexProvider>
  );
}