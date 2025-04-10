/**
 * App.js
 *
 * This is the entry point of the React Native shopping cart application.
 * It sets up the navigation stack and wraps the entire app in a CartProvider
 * to enable global cart state management using React Context.
 *
 * Screens:
 * - ProductListScreen: Displays the list of products available for purchase.
 * - CartScreen: Displays items added to the cart with checkout functionality.
 *
 * Navigation:
 * - Uses @react-navigation/native and @react-navigation/native-stack for screen navigation.
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import CartProvider for global state management
import { CartProvider } from './context/CartContext';

// Import application screens
import ProductListScreen from './screens/ProductListScreen';
import CartScreen from './screens/CartScreen';

// Create the navigation stack
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // Wrap the app with CartProvider to provide cart state across components
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {/* Home screen showing list of products */}
          <Stack.Screen name="Products" component={ProductListScreen} />
          
          {/* Cart screen showing items added to cart */}
          <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
