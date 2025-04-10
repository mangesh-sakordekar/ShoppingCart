import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
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
    case 'INCREASE_QUANTITY':
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      
    case 'DECREASE_QUANTITY':
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
    case 'DECREASE_TO_ZERO':
      return state.filter(item => item.id !== action.payload.id);
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(reducer, []);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
