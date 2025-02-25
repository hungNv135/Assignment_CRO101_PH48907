import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

type FavoriteItem = {
  _id: string;
  ten: string;
  anh: string;
  danhGia: number;
  moTa?: string;
};

const Favorite = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const removeFromFavorites = async (id: string) => {
    const updatedFavorites = favorites.filter(item => item._id !== id);
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const renderItem = ({ item }: { item: FavoriteItem }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.anh }} style={styles.itemImage} />
      <TouchableOpacity 
        style={styles.heartButton}
        onPress={() => removeFromFavorites(item._id)}
      >
        <Image source={require('../assets/images/heart.png')} style={styles.heartIcon} />
      </TouchableOpacity>
      
      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{item.ten}</Text>
        <Text style={styles.itemSubtext}>With Steamed Milk</Text>
        
        <View style={styles.iconContainer}>
          <View style={styles.iconWrapper}>
            <Image source={require('../assets/images/cs.png')} style={styles.icon} />
            <Text style={styles.iconText}>Coffee</Text>
          </View>
          <View style={styles.iconWrapper}>
            <Image source={require('../assets/images/lc.png')} style={styles.icon} />
            <Text style={styles.iconText}>Milk</Text>
          </View>
        </View>

        <View style={styles.ratingContainer}>
          <View style={styles.ratingWrapper}>
            <Image source={require('../assets/images/star.png')} style={styles.starIcon} />
            <Text style={styles.rating}>{item.danhGia}</Text>
            <Text style={styles.ratingCount}>(6,879)</Text>
          </View>
          <View style={styles.roastedBadge}>
            <Text style={styles.roastedText}>Medium Roasted</Text>
          </View>
        </View>

        <Text style={styles.description}>
          {item.moTa || 'Cappuccino is a latte made with more foam than steamed milk, often with a sprinkle of cocoa powder or cinnamon on top.'}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor="transparent" style="light" />
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={require('../assets/images/nav.png')} style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Favorites</Text>
        <Image source={require('../assets/images/user.png')} style={styles.avatar} />
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorites yet</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0F14',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 20,
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  listContent: {
    padding: 20,
  },
  itemContainer: {
    backgroundColor: '#1E232B',
    borderRadius: 25,
    marginBottom: 20,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: 240,
  },
  heartButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    padding: 8,
  },
  heartIcon: {
    width: 24,
    height: 24,
    tintColor: '#D17842',
  },
  itemContent: {
    padding: 20,
  },
  itemName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemSubtext: {
    color: '#AEAEAE',
    fontSize: 12,
    marginBottom: 15,
  },
  iconContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  iconText: {
    color: '#AEAEAE',
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  rating: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 4,
  },
  ratingCount: {
    color: '#AEAEAE',
    fontSize: 12,
  },
  roastedBadge: {
    backgroundColor: '#141921',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  roastedText: {
    color: '#AEAEAE',
    fontSize: 12,
  },
  description: {
    color: '#AEAEAE',
    fontSize: 14,
    lineHeight: 20,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1E232B',
    paddingVertical: 15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  navItem: {
    padding: 10,
  },
  navIcon: {
    width: 24,
    height: 24,
    tintColor: '#AEAEAE',
  },
  activeNav: {
    backgroundColor: '#D17842',
    borderRadius: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default Favorite;