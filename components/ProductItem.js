import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useCart } from '../context/CartContext';

export default function ProductItem({ product }) {
  const { cart, dispatch } = useCart();

  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const increaseQuantity = () => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: product });
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      dispatch({ type: 'DECREASE_QUANTITY', payload: product });
    } else {
      dispatch({ type: 'DECREASE_TO_ZERO', payload: product });
    }
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>

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
    borderRadius: 20,  // Makes the button circular
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
