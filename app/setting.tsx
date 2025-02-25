import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface Props {
    navigation: NavigationProp<ParamListBase>;
}

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
    const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

    useEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: { display: 'none' }
        });
    }, []);

    // Function to handle logout confirmation
    const handleLogout = () => {
        setLogoutModalVisible(true);
    };

    // Function to confirm logout action
    const confirmLogout = () => {
        setLogoutModalVisible(false);
        navigation.navigate('SignInScreen'); // Navigate to SignIn screen
    };

    // Function to cancel logout action
    const cancelLogout = () => {
        setLogoutModalVisible(false); // Close the modal
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require("../assets/images/back.png")} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.title}>Setting</Text>
                <Text></Text>
            </View>

            {/* Danh sách menu */}
            <ScrollView>
                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.iconWrapper}>

                    </View>
                    <Text style={styles.menuText}>History</Text>

                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.iconWrapper}>

                    </View>
                    <Text style={styles.menuText}>Personal Details</Text>

                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.iconWrapper}>

                    </View>
                    <Text style={styles.menuText}>Address</Text>

                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.iconWrapper}>

                    </View>
                    <Text style={styles.menuText}>Payment Method</Text>

                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.iconWrapper}>

                    </View>
                    <Text style={styles.menuText}>About</Text>

                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.iconWrapper}>

                    </View>
                    <Text style={styles.menuText}>Help</Text>

                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                    <View style={styles.iconWrapper}>

                    </View>
                    <Text style={styles.menuText}>Log out</Text>

                </TouchableOpacity>
            </ScrollView>
            <Modal
                transparent={true}
                visible={isLogoutModalVisible}
                animationType="slide"
                onRequestClose={cancelLogout}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Are you sure you want to log out?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: '#ff4d4d' }]}
                                onPress={confirmLogout}
                            >
                                <Text style={styles.textStyle}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: '#1e1e1e' }]}
                                onPress={cancelLogout}
                            >
                                <Text style={styles.textStyle}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#0C0F14',
    },
    header: {
        marginTop: 35,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    backIcon: {
        width: 24,
        height: 24,
      },
    title: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold',
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomColor: "#333",
    },
    iconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#1E1E1E",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },
    menuText: {
        flex: 1,
        fontSize: 16,
        color: "#fff",
        fontWeight: '500'
    },
    arrow: {
        marginLeft: "auto",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "#1E1E1E",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: "#fff",
        fontSize: 18
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        width: '45%',
        alignItems: 'center'
    },
    textStyle: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center"
    },
});

export default SettingsScreen;