import { useEffect, useState } from "react"
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from 'expo-status-bar';

type RootParamList = {
    Home: undefined
    Detail: { item: any }
    Setting: undefined
    Profile: undefined
}

type NavigationContainer = StackNavigationProp<RootParamList, "Detail">
type navi = StackNavigationProp<RootParamList, "Setting">

type CoffeeItem = {
    _id: string
    anh: string
    ten: string
    moTa: string
    gia: number
}

const HomeScreen = () => {
    const [coffeeData, setCoffeeData] = useState([])
    const categories = ["All", "Cappuccino", "Espresso", "Americano", "Macchiato"]
    const navigation = useNavigation<NavigationContainer>()
    const navi = useNavigation<navi>()

    useEffect(() => {
        fetch("http://192.168.100.163:3000/data")
            .then((response) => response.json())
            .then((data) => setCoffeeData(data))
            .catch((error) => console.error("Error fetching data:", error))
    }, [])

    const renderCoffeeItem = ({ item }: { item: CoffeeItem }) => (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Detail", { item })}>
            <Image source={{ uri: item.anh }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.ten}</Text>
            <Text style={styles.cardSubtitle}>{item.moTa}</Text>
            <View style={styles.cardFooter}>
                <Text style={styles.cardPrice}>
                    <Text style={styles.cardPriceSymbol}>${item.gia}</Text>
                </Text>
                <TouchableOpacity style={styles.addToCartButton}>
                    <Text style={styles.addToCartText}>+</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                <StatusBar translucent={true} backgroundColor="transparent" style="light" />
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navi.navigate("Setting")}>
                        <Image source={require('../assets/images/nav.png')} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Home</Text>
                    <TouchableOpacity onPress={() => navi.navigate("Profile")}>
                        <Image source={require("../assets/images/user.png")} />
                    </TouchableOpacity>
                </View>

                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Find the best</Text>
                    <Text style={styles.headerTitle}>coffee for you</Text>
                    <View style={styles.searchContainer}>
                        <Image source={require("../assets/images/search.png")} style={styles.searchIcon} />
                        <TextInput style={styles.searchBar} placeholder="Find Your Coffee..." placeholderTextColor="#666" />
                    </View>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
                    {categories.map((category, index) => (
                        <TouchableOpacity key={index} style={[styles.categoryButton, index === 0 && styles.activeCategory]}>
                            <Text style={[styles.categoryText, index === 0 && styles.activeCategoryText]}>{category}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <Text style={styles.sectionTitle}>Coffee</Text>
                <FlatList
                    data={coffeeData}
                    renderItem={renderCoffeeItem}
                    keyExtractor={(item) => item._id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalList}
                />

                <Text style={styles.sectionTitle}>Coffee beans</Text>
                <FlatList
                    data={coffeeData}
                    renderItem={renderCoffeeItem}
                    keyExtractor={(item) => item._id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalList}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0C0F14",
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 80,
    },
    iconContainer: {
        backgroundColor: "#1a1a1a",
        borderRadius: 5,
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    iconRowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 20,
    },
    iconImage: {
        width: 30,
        height: 30,
        borderRadius: 8,
    },
    headerContainer: {
        marginBottom: 20,
    },
    headerTitle: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1a1a1a",
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
        backgroundColor: "#1a1a1a",
        borderRadius: 15,
        padding: 15,
        color: "#52555A",
        flex: 1,
    },
    categoriesContainer: {
        marginBottom: 20,
    },
    categoryButton: {
        backgroundColor: "#1a1a1a",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginRight: 10,
    },
    activeCategory: {
        backgroundColor: "#D17842",
    },
    categoryText: {
        color: "#fff",
        fontSize: 14,
    },
    activeCategoryText: {
        color: "#fff",
        fontWeight: "bold",
    },
    horizontalList: {
        paddingRight: 16,
    },
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    card: {
        backgroundColor: "#252A32",
        borderRadius: 16,
        marginBottom: 20,
        width: 160,
        padding: 12,
        marginRight: 16,
    },
    cardImage: {
        width: "100%",
        height: 140,
        borderRadius: 12,
        marginBottom: 10,
    },
    cardTitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    cardSubtitle: {
        color: "#B4B7C1",
        fontSize: 12,
        marginBottom: 8,
    },
    cardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardPrice: {
        color: "#D17842",
        fontSize: 16,
        fontWeight: "bold",
    },
    cardPriceSymbol: {
        fontSize: 12,
    },
    addToCartButton: {
        backgroundColor: "#D17842",
        padding: 8,
        borderRadius: 12,
    },
    addToCartText: {
        color: "#fff",
        fontSize: 20,
    },
    sectionTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
})

export default HomeScreen

