/**
 * ProductItem.js
 *
 * This component displays an individual product item within the product list.
 * 
 * Features:
 * - Displays product thumbnail, name, and price
 * - Shows an "Add to Cart" button if the product is not in the cart
 * - Shows circular '+' and '−' buttons along with quantity if the product is already in the cart
 * 
 * The component interacts with the global CartContext to:
 * - Add items to the cart
 * - Increase or decrease item quantity
 * - Remove item from the cart when quantity is reduced to zero
 *
 */

import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useCart } from '../context/CartContext';

export default function ProductItem({ product, onAddToCart }) {
  const { cart, dispatch } = useCart();

  const imageRef = useRef(null);
  //Check if the item is in the cart and get it quantity
  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  //Button handler to add an item to the cart
  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    onAddToCart(imageRef)
  };

  //Button handler to increase quantity of the item in the cart
  const increaseQuantity = () => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: product });
  };

  //Button handler to decrease quantity of the item in the cart
  const decreaseQuantity = () => {
    if (quantity > 1) {
      dispatch({ type: 'DECREASE_QUANTITY', payload: product });
    } else {
      dispatch({ type: 'DECREASE_TO_ZERO', payload: product });
    }
  };

  return (
    <View style={styles.card}>
        {/**Display the thumbnail of the product */}
        <Image ref={imageRef} source={{ uri: product.image }} style={styles.image} />

        {/**Display the details of the item */}
        <View style={styles.details}>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>
        </View>

        {/**if the current quantity of the item is zero show the 'add to cart' button, else */}
        {/**Display the current quantity of the item and buttons to increase and decrease quantity */}
        {quantity > 0 ? (
            <View style={styles.quantityControls}>
                <TouchableOpacity onPress={decreaseQuantity} style={styles.controlButton}>
                    <Text style={styles.controlButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity onPress={increaseQuantity} style={styles.controlButton}>
                    <Text style={styles.controlButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        ) : (
            <TouchableOpacity onPress={addToCart} style={styles.button}>
                <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
        )}
    </View>
  );
}

{/*Styling rules*/ }
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontSize: 14,
    marginTop: 6,
    color: '#444',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    backgroundColor: '#f1f1f1',
    width: 40,
    height: 40,
    borderRadius: 20, 
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  controlButtonText: {
    fontSize: 20,
    color: '#4a90e2',
    fontWeight: '600',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
