import React from 'react';
import { View, FlatList, StyleSheet, Button, TouchableOpacity, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProductItem from '../components/ProductItem';

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
    const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <FlatList
          data={PRODUCTS}
          renderItem={({ item }) => <ProductItem product={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 10 }}
        />
        <TouchableOpacity
            style={styles.fab}
            onPress={() => navigation.navigate('Cart')}
            >
            <Text style={styles.fabText}>🛒</Text>
        </TouchableOpacity>
      </View>
    );
}
  
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