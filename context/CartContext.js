/**
 * CartContext.js
 *
 * This file provides global state management for a shopping cart using React's Context API and useReducer hook.
 *
 * Features:
 * - Centralized cart state shared across components
 * - Supports adding, updating, and removing products in the cart
 * - Handles increasing/decreasing item quantity and clearing the cart
 *
 * Exports:
 * - CartProvider: Wraps the app to provide cart context
 * - useCart: Hook to access cart state and dispatch actions
 */

import React, { createContext, useReducer, useContext } from 'react';

// Create a Context for the cart
const CartContext = createContext();

// Reducer function to handle different cart actions
const reducer = (state, action) => {
  switch (action.type) {
    // Add item to cart or increase quantity if already exists
    case 'ADD_TO_CART':
      const existing = state.find(item => item.id === action.payload.id);
      if (existing) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];

    // Increase item quantity
    case 'INCREASE_QUANTITY':
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    // Decrease item quantity
    case 'DECREASE_QUANTITY':
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

    // Remove item when quantity reaches zero
    case 'DECREASE_TO_ZERO':
      return state.filter(item => item.id !== action.payload.id);

    // Remove item completely from cart
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload);

    // Clear all items from cart
    case 'CLEAR_CART':
      return [];

    // Default fallback
    default:
      return state;
  }
};

// CartProvider wraps app components with cart state
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(reducer, []);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);
