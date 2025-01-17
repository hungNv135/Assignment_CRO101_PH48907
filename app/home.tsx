import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Định nghĩa kiểu RootParamList cho Stack Navigator
type RootParamList = {
    Login: undefined;
    Home: undefined;
    SignUp: undefined;
    ResetPass: undefined;
    Welcome: undefined;
    Detail: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootParamList, 'Home'>;

const HomeScreen = () => {
    const categories = ['All', 'Cappuccino', 'Espresso', 'Americano', 'Macchiato'];
    const navigation = useNavigation<LoginScreenNavigationProp>();

    return (
        <View style={styles.container}>
            {/* Scrollable Content */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Ô bo góc chứa hình ảnh */}
                <View style={styles.iconRowContainer}>
                    <View style={styles.iconContainer}>
                        <Image
                            source={require('../assets/images/ele.png')}  // Hình ảnh bên trái
                            style={styles.iconImage}
                        />
                    </View>
                    <View style={styles.iconContainer}>
                        <Image
                            source={require('../assets/images/avt.png')}  // Hình ảnh bên phải
                            style={styles.iconImage}
                        />
                    </View>
                </View>

                {/* Tiêu đề header */}
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Find the best</Text>
                    <Text style={styles.headerTitle}>coffee for you</Text>
                    <View style={styles.searchContainer}>
                        <Image
                            source={require('../assets/images/search.png')}
                            style={styles.searchIcon}
                        />
                        <TextInput
                            style={styles.searchBar}
                            placeholder="Find Your Coffee..."
                            placeholderTextColor="#666"
                        />
                    </View>

                </View>

                {/* Categories */}
                <View style={styles.categoriesContainer}>
                    {categories.map((category, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.categoryButton, index === 0 && styles.activeCategory]}>
                            <Text style={[styles.categoryText, index === 0 && styles.activeCategoryText]}>{category}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Coffee Grid */}
                <View style={styles.gridContainer}>
                    {/* Coffee Item 1 */}

                    <View style={styles.card}>
                        <Image
                            source={require('../assets/images/capuchino.png')}
                            style={styles.cardImage}
                        />
                        <Text style={styles.cardTitle}>Cappuccino</Text>
                        <Text style={styles.cardSubtitle}>With Steamed Milk</Text>
                        <View style={styles.cardFooter}>
                            <Text style={styles.cardPrice}>
                                <Text style={styles.cardPriceSymbol}>$</Text>4.20
                            </Text>
                            <TouchableOpacity style={styles.addToCartButton}>
                                <Text style={styles.addToCartText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Coffee Item 2 */}
                    <View style={styles.card}>
                        <Image
                            source={require('../assets/images/capu.png')}
                            style={styles.cardImage}
                        />
                        <Text style={styles.cardTitle}>Cappuccino</Text>
                        <Text style={styles.cardSubtitle}>With Foam</Text>
                        <View style={styles.cardFooter}>
                            <Text style={styles.cardPrice}>
                                <Text style={styles.cardPriceSymbol}>$</Text>4.20
                            </Text>
                            <TouchableOpacity style={styles.addToCartButton}>
                                <Text style={styles.addToCartText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Coffee Beans Section */}
                <Text style={styles.sectionTitle}>Coffee beans</Text>
                <View style={styles.gridContainer}>
                    {/* Coffee Bean 1 */}
                    <View style={styles.card}>
                        <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
                            <Image
                                source={require('../assets/images/mat.png')}
                                style={styles.cardImage}
                            />
                        </TouchableOpacity>
                        <Text style={styles.cardTitle}>Robusta Beans</Text>
                        <Text style={styles.cardSubtitle}>Medium Roasted</Text>
                        <View style={styles.cardFooter}>
                            <Text style={styles.cardPrice}>
                                <Text style={styles.cardPriceSymbol}>$</Text>4.20
                            </Text>
                            <TouchableOpacity style={styles.addToCartButton}>
                                <Text style={styles.addToCartText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Coffee Bean 2 */}
                    <View style={styles.card}>
                        <Image
                            source={require('../assets/images/mat.png')}
                            style={styles.cardImage}
                        />
                        <Text style={styles.cardTitle}>Cappuccino</Text>
                        <Text style={styles.cardSubtitle}>With Steamed Milk</Text>
                        <View style={styles.cardFooter}>
                            <Text style={styles.cardPrice}>
                                <Text style={styles.cardPriceSymbol}>$</Text>4.20
                            </Text>
                            <TouchableOpacity style={styles.addToCartButton}>
                                <Text style={styles.addToCartText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Navigation */}
            <View style={styles.bottomNavigation}>
                <TouchableOpacity style={styles.navItem}>
                    <Image source={require('../assets/images/home.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Image source={require('../assets/images/bag-2.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Image source={require('../assets/images/tym.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Image source={require('../assets/images/noti.png')} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0C0F14',
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 80,
    },
    iconContainer: {
        backgroundColor: '#1a1a1a', // Màu nền cho ô chứa hình ảnh
        borderRadius: 5,  // Bo góc cho ô
        width: 30,         // Kích thước ô
        height: 30,
        justifyContent: 'center',  // Căn giữa hình ảnh trong ô
        alignItems: 'center',
    },
    iconRowContainer: {
        flexDirection: 'row',   // Sắp xếp các phần tử theo hàng ngang
        justifyContent: 'space-between',  // Căn giữa các phần tử ở hai góc
        alignItems: 'center',  // Căn giữa theo chiều dọc
        marginTop: 20,          // Khoảng cách giữa các ô
        marginLeft: 15,         // Đặt khoảng cách từ bên trái
        marginRight: 15,        // Đặt khoảng cách từ bên phải
        marginBottom: 20,
    },
    iconImage: {
        width: 30,        // Kích thước hình ảnh
        height: 30,
        borderRadius: 8,  // Bo góc cho hình ảnh nếu cần
    },
    headerContainer: {
        marginBottom: 20,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        borderRadius: 15,
        padding: 0,
    },
    searchIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
        marginStart: 20,
    },
    searchBar: {
        backgroundColor: '#1a1a1a',
        borderRadius: 15,
        padding: 15,
        color: '#52555A',
    },
    categoriesContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    categoryButton: {
        backgroundColor: '#1a1a1a',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginRight: 10,
    },
    activeCategory: {
        backgroundColor: '#D17842',
    },
    categoryText: {
        color: '#fff',
        fontSize: 14,
    },
    activeCategoryText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: '#252A32',
        borderRadius: 16,
        marginBottom: 20,
        width: '48%',
        padding: 12,
    },
    cardImage: {
        width: '100%',
        height: 140,
        borderRadius: 12,
        marginBottom: 10,
        alignItems: 'center',
    },
    cardTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    cardSubtitle: {
        color: '#666',
        fontSize: 12,
        marginBottom: 12,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardPrice: {
        color: '#fff',
        fontSize: 16,
    },
    cardPriceSymbol: {
        color: '#ff8c00',
        fontWeight: 'bold',
    },
    addToCartButton: {
        backgroundColor: '#D17842',
        borderRadius: 8,
        padding: 10,
    },
    addToCartText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    bottomNavigation: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#0C0F14',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#0C0F14',
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    navIcon: {
        fontSize: 24,
        color: '#fff',
    },
});

export default HomeScreen;
