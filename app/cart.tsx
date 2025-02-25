import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get("window");

type CartItem = {
  _id: string;
  ten: string;
  gia: number;
  anh: string;
  quantity: number;
};

const CartScreen = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    calculateTotal(cart);
  }, [cart]);

  const loadCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem("cart");
      if (storedCart) {
        const parsedCart: CartItem[] = JSON.parse(storedCart);
        setCart(parsedCart);
        calculateTotal(parsedCart);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  const calculateTotal = (cartItems: CartItem[]) => {
    const total = cartItems.reduce((sum: number, item: CartItem) => sum + item.gia * item.quantity, 0);
    setTotalPrice(total);
  };

  const updateQuantity = async (id: string, increment: number) => {
    const updatedCart = cart.map(item => {
      if (item._id === id) {
        const newQuantity = item.quantity + increment;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    });
    setCart(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = async (id: string) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.anh }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.ten}</Text>
        <Text style={styles.itemSubtext}>with steamed milk</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.priceSymbol}>$</Text>
          <Text style={styles.itemPrice}>{item.gia.toFixed(2)}</Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item._id, -1)}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item._id, 1)}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Image source={require('../assets/images/nav.png')} />
        <Text style={styles.title}>Cart</Text>
        <Image source={require('../assets/images/user.png')} />
      </View>

      <FlatList
        data={cart}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <View style={styles.totalInfo}>
            <Text style={styles.totalLabel}>Total Price</Text>
            <View style={styles.totalPriceContainer}>
              <Text style={styles.totalPriceSymbol}>$</Text>
              <Text style={styles.totalPrice}>{totalPrice.toFixed(2)}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.payButton}>
            <Text style={styles.payButtonText}>Pay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C0F14",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  deleteButton: {
    padding: 8,
  },
  deleteButtonText: {
    color: '#D17842',
    fontSize: 14,
  },
  listContent: {
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#1E232B',
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemSubtext: {
    color: '#AEAEAE',
    fontSize: 12,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceSymbol: {
    color: '#D17842',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 2,
  },
  itemPrice: {
    color: '#D17842',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141921',
    borderRadius: 20,
    padding: 8,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#D17842',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  quantityText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginHorizontal: 12,
  },
  footer: {
    backgroundColor: '#1E232B',
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalInfo: {
    flex: 1,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    color: '#AEAEAE',
    fontSize: 16,
  },
  totalPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalPriceSymbol: {
    color: '#D17842',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 2,
  },
  totalPrice: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  payButton: {
    backgroundColor: '#D17842',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;