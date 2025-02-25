import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from "react-native"
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import React, { useState , useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window")

type CartItem = {
  _id: string;
  ten: string;
  gia: number;
  anh: string;
  quantity: number;
  diKem?: string;
  danhGia?: number;
  moTa?: string;
  cachRang?: string;
};

type RootStackParamList = {
  Detail: {
    item: CartItem;
  };
};

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

const DetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<DetailScreenRouteProp>();
  const { item } = route.params;
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      // Load cart
      const storedCart = await AsyncStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
      
      // Check if item is in favorites
      const storedFavorites = await AsyncStorage.getItem("favorites");
      if (storedFavorites) {
        const favorites = JSON.parse(storedFavorites);
        setIsFavorite(favorites.some((fav: CartItem) => fav._id === item._id));
      }
    };
    loadData();
  }, [item._id]);

  const toggleFavorite = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      
      if (isFavorite) {
        favorites = favorites.filter((fav: CartItem) => fav._id !== item._id);
      } else {
        favorites = [...favorites, item];
      }
      
      await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  const addToCart = async () => {
    let updatedCart;
    const existingItem = cart.find((cartItem) => cartItem._id === item._id);
    if (existingItem) {
      updatedCart = cart.map((cartItem) =>
        cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
    } else {
      updatedCart = [...cart, { ...item, quantity: 1 }];
    }
    setCart(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.anh }} style={styles.largeImage} />
          <View style={styles.textContainer}>
            <View style={styles.leftContainer}>
              <Text style={styles.name}>{item.ten}</Text>
              <Text style={styles.manufacturer}>{item.diKem}</Text>
              <View style={styles.priceContainer}>
                <Image source={require("../assets/images/sao.png")} style={styles.priceIcon} />
                <Text style={styles.price}>{item.danhGia}</Text>
              </View>
            </View>

            <View style={styles.rightContainer}>
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button}>
                  <Image source={require("../assets/images/cs.png")} style={styles.buttonImage} />
                  <Text style={styles.buttonText}>Bean</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                  <Image source={require("../assets/images/lc.png")} style={styles.buttonImage} />
                  <Text style={styles.buttonText}>{item.cachRang}</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={[styles.button, styles.button3]}>
                <Text style={styles.buttonText}>{item.cachRang}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.imageTopContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require("../assets/images/back.png")} style={styles.imageTopLeft} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFavorite}>
            <Image source={require("../assets/images/heart.png")} style={styles.imageTopRight} />
          </TouchableOpacity>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Description</Text>
          <Text style={styles.description}>{item.moTa}</Text>
          <Text style={styles.title}>Size</Text>
          <View style={styles.sizeContainer}>
            <TouchableOpacity style={styles.sizeButton}>
              <Text style={styles.sizeText}>250gm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sizeButton}>
              <Text style={styles.sizeText}>500gm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sizeButton}>
              <Text style={styles.sizeText}>1000gm</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footerContainer}>
            <View style={styles.priceSection}>
              <Text style={styles.priceLabel}>Price</Text>
              <View style={styles.priceRow}>
                <Text style={styles.dollarSign}>$</Text>
                <Text style={styles.footerPrice}>{item.gia}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0F14',
    paddingHorizontal: 0,  
    paddingTop: 0,        
    paddingBottom: 0,    
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 0,  
    paddingTop: 0,        
  },
  imageContainer: {
    width: '100%',
    height: height * 0.6,
    position: 'relative',
  },
  largeImage: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginStart: 10,
  },
  manufacturer: {
    color: 'white',
    fontSize: 14,
    marginBottom: 15,
    paddingBottom: 10,
    marginStart: 10,
  },
  price: {
    color: 'white',
    fontSize: 15,
    marginStart: 10,
    alignSelf: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  priceIcon: {
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
  priceSection: {
    flex: 1,
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dollarSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D17842',
    marginRight: 5,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#141921',
    paddingVertical: 3,
    paddingHorizontal: 15,
    borderRadius: 10,
    width: '45%',
  },
  buttonImage: {
    width: 30,
    height: 30,
  },
  buttonText: {
    marginTop: 5,
    color: '#AEAEAE',
    fontSize: 15,
  },
  button3: {
    width: '100%',
    marginTop: 5,
    paddingVertical: 3,
    marginBottom: 5,
  },
  imageTopContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  imageTopLeft: {
    width: 10,
    height: 10,
    backgroundColor: '#0C0F14',
    borderRadius: 5,
    padding: 20,
  },
  imageTopRight: {
    width: 10,
    height: 10,
    backgroundColor: '#0C0F14',
    borderRadius: 5,
    padding: 20,
  },
  detailsContainer: {
    paddingHorizontal: 0,  
    paddingTop: 10,       
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  description: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 10,
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  sizeButton: {
    backgroundColor: '#141921',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  sizeText: {
    fontSize: 16,
    color: '#AEAEAE',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  footerPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  addToCartButton: {
    backgroundColor: '#D17842',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetailScreen;
