/**
 * ProductListScreen.js
 *
 * This component displays a list of products available for purchase.
 *
 * Features:
 * - Renders mock product data using the ProductItem component
 * - Allows users to add items to the cart or update quantities directly from the list
 * - Includes a floating action button (FAB) in the bottom-right corner that navigates to the Cart screen
 *
 */

import React, { useRef } from 'react';
import { View, FlatList, StyleSheet, Button, TouchableOpacity, Text, UIManager, findNodeHandle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProductItem from '../components/ProductItem';
import FlyToCart from '../components/FlyToCartAnimation';

//Mock data for the app
const PRODUCTS = [
    {
      id: '1',
      name: 'Headphones',
      price: 99,
      image: 'https://m.media-amazon.com/images/I/61BAMNSZcCL._AC_UF1000,1000_QL80_.jpg', 
    },
    {
      id: '2',
      name: 'Smartwatch',
      price: 199,
      image: 'https://adminapi.applegadgetsbd.com/storage/media/large/CMF-by-Nothing-Watch-Pro-BT-calling-Smart-Watch-Dark-Gray-6932.jpg',
    },
    {
      id: '3',
      name: 'Camera',
      price: 299,
      image: 'https://di2ponv0v5otw.cloudfront.net/posts/2024/04/11/6617c50bfe7e2cc1357b3ccd/m_6617c50bfe7e2cc1357b3cce.jpg',
    },
];


export default function ProductListScreen() {
    const flyRef = useRef(null);
    const navigation = useNavigation();

    const handleAddToCart = (item, imageRef) => {
      if (!imageRef.current) return;
      //console.log(item.name);
      UIManager.measure(
        findNodeHandle(imageRef.current),
        (_x, _y, _w, _h, pageX, pageY) => {
          console.log(item.name);
          flyRef.current?.fly(pageX, pageY, item.image);
        }
      );
  
      // add to cart logic here
    };

    return (
      <View style={styles.container}>

        {/**Display a list of items in the data as ProductItem Cards */}
        <FlatList
          data={PRODUCTS}
          renderItem={({ item }) => <ProductItem product={item} onAddToCart={(imageRef) => handleAddToCart(item, imageRef)}/>}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 10 }}
        />
        <FlyToCart ref={flyRef} />
        {/**Display a button at the bottom right corner to navigate to the cart tab*/}
        <TouchableOpacity
            style={styles.fab}
            onPress={() => navigation.navigate('Cart')}
            >
            <Text style={styles.fabText}>🛒</Text>
        </TouchableOpacity>
      </View>
    );
}
  
{/**Styling Rules */}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        backgroundColor: '#4a90e2',
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, // for Android shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    fabText: {
        color: '#fff',
        fontSize: 40,
    },
});