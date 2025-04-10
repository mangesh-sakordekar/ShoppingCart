/**
 * CartScreen.js
 *
 * This component displays the user's shopping cart.
 *
 * Features:
 * - Lists all items added to the cart using the CartItem component
 * - Shows the total cost of all items in the cart
 * - Provides a "Shop More" button to return to the product list
 * - Provides a "Checkout" button to place the order (disabled if cart is empty)
 * - On checkout, shows a confirmation alert, clears the cart, and navigates back
 *
 */

import React from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { useNavigation } from '@react-navigation/native';

export default function CartScreen() {
  const { cart, dispatch } = useCart();

  const navigation = useNavigation();
  
  //Calculate the current total of all the items in the cart
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  //Button handler to handle checkout - alert the user, clear the cart and 
  //move back to the products tab
  const checkout = () => {
    Alert.alert('Order placed!', 'Thanks for your purchase.');
    dispatch({ type: 'CLEAR_CART' });
    navigation.goBack();
  };

  //Button handler to return to the products tab
  const continueShopping = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>

        {/**Display a list of items in the cart as CartItem Cards */}
        <FlatList
            data={cart}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <CartItem item={item} />}
        />

        {/**Display the total of the items in the cart */}
        <Text style={styles.totalText}>Total: ${total}</Text>

        {/**Display buttons to navigate back to products and to checkout */}
        <View style={styles.navButtons}>
            <TouchableOpacity onPress={continueShopping} style={styles.continueShoppingButton}>
                <Text style={styles.buttonText}>Shop More</Text>
            </TouchableOpacity>
            {/**Disable the checkout button if the cart is empty */}
            <TouchableOpacity onPress={checkout} style={cart.length > 0 ? styles.checkOutButton : styles.disabledButton}
                disabled={cart.length <= 0 }>
                <Text style={styles.buttonText}>Checkout</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

{/**Styling Rules */}
const styles = StyleSheet.create({
    container:{
        flex: 1, 
        padding: 10,
    },
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
        borderRadius: 20,  
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    checkOutButton: {
        backgroundColor: '#ff5555',
        width: '50%',
        height: 60,
        borderRadius: 20, 
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    disabledButton: {
        backgroundColor: '#cccccc',
        width: '50%',
        height: 60,
        borderRadius: 20, 
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    totalText: {
        fontSize: 30,
        color: '#111111',
        fontWeight: 'bold',
        paddingLeft: 10,
    }
});