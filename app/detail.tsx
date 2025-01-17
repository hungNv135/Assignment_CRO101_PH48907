import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

const DetailScreen = () => {
  return (
    <View style={styles.container}>
      {/* Phần trên với ảnh lớn */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/cafe.png')}
          style={styles.largeImage}
        />
        <View style={styles.textContainer}>

          <View style={styles.leftContainer}>
            <Text style={styles.name}>Robusta Beans</Text>
            <Text style={styles.manufacturer}>From Africa</Text>
            <View style={styles.priceContainer}>
              <Image source={require('../assets/images/sao.png')} style={styles.priceIcon} />
              <Text style={styles.price}>4.5</Text>
            </View>
          </View>

          <View style={styles.rightContainer}>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.button}>
                <Image source={require('../assets/images/cs.png')} style={styles.buttonImage} />
                <Text style={styles.buttonText}>Bean</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button}>
                <Image source={require('../assets/images/lc.png')} style={styles.buttonImage} />
                <Text style={styles.buttonText}>Africa</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.button, styles.button3]}>
              <Text style={styles.buttonText}>Medium Roasted</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.imageTopContainer}>
        <Image
          source={require('../assets/images/back.png')}
          style={styles.imageTopLeft}
        />
        <Image
          source={require('../assets/images/heart.png')}
          style={styles.imageTopRight}
        />
      </View>


      {/* Phần dưới */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>Description</Text>
        <Text style={styles.description}>Arabica beans are by far the most popular type of coffee beans, making up about 60% of the world’s coffee. These tasty beans originated many centuries ago in the highlands of Ethiopia, and may even be the first coffee beans ever consumed! </Text>
        <Text style={styles.title}>Size</Text>
        {/* Nút chọn size */}
        <View style={styles.sizeContainer}>
          <TouchableOpacity style={styles.sizeButton}><Text style={styles.sizeText}>250gm</Text></TouchableOpacity>
          <TouchableOpacity style={styles.sizeButton}><Text style={styles.sizeText}>500gm</Text></TouchableOpacity>
          <TouchableOpacity style={styles.sizeButton}><Text style={styles.sizeText}>1000gm</Text></TouchableOpacity>
        </View>

        {/* Giá và nút thêm vào giỏ hàng */}
        <View style={styles.footerContainer}>
          <View style={styles.priceSection}>
            <Text style={styles.priceLabel}>Price</Text>
            <View style={styles.priceRow}>
              <Text style={styles.dollarSign}>$</Text>
              <Text style={styles.footerPrice}>10.50</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0C0F14',
    justifyContent: 'flex-start',
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff'
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