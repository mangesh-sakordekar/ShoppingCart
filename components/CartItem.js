import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useCart } from '../context/CartContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CartItem({ item }) {
  const { dispatch } = useCart();
  const increaseQuantity = () => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: { id: item.id } });
  };

  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      dispatch({ type: 'DECREASE_QUANTITY', payload: { id: item.id } });
    } else {
      dispatch({ type: 'REMOVE_FROM_CART', payload: item.id });
    }
  };
  const removeItem = () => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item.id });
  };
  
  return (
    <View style={styles.card}>
        <TouchableOpacity onPress={removeItem} style={styles.deleteButton}>
            <MaterialCommunityIcons name="trash-can-outline" size={20} color="#ff4444" />
        </TouchableOpacity>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.details}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>Unit Price: <Text style={styles.bold}>${item.price}</Text></Text>
            <Text style={styles.price}>Subtotal: <Text style={styles.bold}>${item.price * item.quantity}</Text></Text>
        </View>
        <View style={styles.quantityControls}>
            <TouchableOpacity onPress={decreaseQuantity} style={styles.controlButton}>
                <Text style={styles.controlButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity onPress={increaseQuantity} style={styles.controlButton}>
                <Text style={styles.controlButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 15,
        borderRadius: 8,
        elevation: 3,
    },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
    padding: 6,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  details: {
    alignItems: 'center',
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
  },
  bold: {
    fontWeight: 'bold',
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
  removeButton: {
    backgroundColor: '#ff2222',
    width: 80,
    height: 80,
    borderRadius: 40,  
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  removeText: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
  },
});
