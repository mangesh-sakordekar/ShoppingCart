import React from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { useNavigation } from '@react-navigation/native';

export default function CartScreen() {
  const { cart, dispatch } = useCart();

  const navigation = useNavigation();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const checkout = () => {
    Alert.alert('Order placed!', 'Thanks for your purchase.');
    dispatch({ type: 'CLEAR_CART' });
    navigation.goBack();
  };

  const continueShopping = () => {
    navigation.goBack();
  };
  return (
    <View style={{ flex: 1, padding: 10 }}>
        <FlatList
            data={cart}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <CartItem item={item} />}
        />
        <Text style={{ fontSize: 18, marginVertical: 10 }}>Total: ${total}</Text>
        <View style={styles.navButtons}>
            <TouchableOpacity onPress={continueShopping} style={styles.continueShoppingButton}>
                <Text style={styles.buttonText}>Shop More</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={checkout} style={cart.length > 0 ? styles.checkOutButton : styles.disabledButton}
                disabled={cart.length <= 0 }>
                <Text style={styles.buttonText}>Checkout</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    navButtons: {
        flexDirection: 'row',
        alignItems: 'stretch',
        paddingRight: 20,
        paddingTop: 10,
    },
    continueShoppingButton: {
        backgroundColor: '#4a90e2',
        width: '50%',
        height: 60,
        borderRadius: 20,  // Makes the button circular
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    checkOutButton: {
        backgroundColor: '#ff5555',
        width: '50%',
        height: 60,
        borderRadius: 20,  // Makes the button circular
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    disabledButton: {
        backgroundColor: '#cccccc',
        width: '50%',
        height: 60,
        borderRadius: 20,  // Makes the button circular
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
});