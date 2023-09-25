import { View, Text, Pressable, Image, Animated, Dimensions, StyleSheet, ActivityIndicator, ScrollView, ImageBackground } from "react-native";
import { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { SetUser } from "./state/SetUser";
import axios from "axios";
import { removeData } from "./state/Storage";
import { getData } from "./state/Storage";
import { API_URL, ENVIRONMENT } from '@env';
import DescriptionItem from "./atom/DescriptionItem";
import FromEditeProfile from "./FormEditProfile";
import { SetRemoveUser } from "./state/SetRemoveUser";
import { SetToAfter } from "./state/SetToAfter";
import HistoryScreen from "./HistoryScreen";
import FooterScreen from "./atom/FooterScreen";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPenToSquare, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
const UserAfterLogin = ({ navigation }) => {
    const { height, width } = Dimensions.get('window');
    const position1 = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const [isMoved, setIsMoved] = useState(false);
    const [userData, setUserData] = useRecoilState(SetUser);
    const [remove, setRemove] = useRecoilState(SetRemoveUser);
    const [actIndicator, setActIndikator] = useRecoilState(SetToAfter)
    const tokenRemove = async () => {
        try {
            const data = await removeData();
            setRemove(data);
        } catch (e) {
            console.log(e)
        }
    }

    const moveComponent = () => {
        if (isMoved == true) {
            Animated.timing(position1, {
                toValue: { x: 0, y: 0 },
                duration: 500,
                useNativeDriver: false,
            }).start(() => {
                setIsMoved(false);
            });
        } else {
            Animated.timing(position1, {
                toValue: { x: 0, y: height },
                duration: 500,
                useNativeDriver: false,
            }).start(() => {
                setIsMoved(true);
            });
        }
    };

    const getDataUser = async () => {
        try {
            const token = await getData();
            const header = `bearerCode ${token}`;

            const { data } = await axios.get(API_URL + "/user/profile", { headers: { Authorization: header } })
            setUserData(data.data)

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getDataUser();
    }, [remove])

    useEffect(() => {
        getDataUser();
        moveComponent();
    }, [])

    return (
        <View>
            <View>
                <ScrollView>
                    <ImageBackground source={require("./image/bac.jpg")} style={styles.boxUser} blurRadius={25}>
                        <View style={styles.boxIcon}>
                            <View style={styles.boxStyleIcon}>
                                <View style={{ marginRight: 30 }}>
                                    <Text style={{ fontSize: 20, color: "#FFFF", fontFamily : 'PoppinsSemiBold'}}>user Profile</Text>
                                </View>
                                <Pressable style={{ marginRight: 20 }} onPress={moveComponent}>
                                    <FontAwesomeIcon icon={faPenToSquare} size={25} color="grey"/>
                                </Pressable>
                                <Pressable style={{ marginRight: 10 }} onPress={tokenRemove}>
                                <FontAwesomeIcon icon={faArrowRightFromBracket} size={25} color="grey"/>
                                </Pressable>
                            </View>
                        </View>
                        <View style={{ marginTop: 30, justifyContent: "center", alignItems: "center" }}>
                            <View style={{ elevation: 8, backgroundColor: "#ffff", height: 130, width: 130, alignItems: "center", justifyContent: "center", borderRadius: 100, overflow: "hidden" }}>
                                <Image source={userData.imageUrl ? { uri: userData.imageUrl } : require('./image/person.png')} style={{ height: 140, width: 140 }} />
                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 20,fontFamily : 'PoppinsSemiBold', marginBottom: 5, color: "#FFFF" }}>{userData.username}</Text>
                            </View>
                            <DescriptionItem />
                        </View>

                    </ImageBackground>
                    <View style={{ marginLeft: 12, marginRight: 102 }}>
                    </View>
                    <HistoryScreen navigation={navigation} />
                </ScrollView>
            </View>
            <FromEditeProfile position={position1.getLayout()} onPress={moveComponent} />
            {actIndicator &&
                <View style={[styles.boxLoanding, { height: height, width: width }]}>
                    <ActivityIndicator size="large" color="#F86F03" />
                </View>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    boxUser: {
        backgroundColor: "#ffff",
        elevation: 8,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        height: 380,
        overflow: "hidden",
        
    },
    boxIcon: {
        marginTop: 40,
        marginRight: 10,
        alignItems: "flex-end"
    },
    boxStyleIcon: {
        flexDirection: "row",
        alignItems: "center"
    },
    boxLoanding: {
        position: "absolute",
        backgroundColor: "#9E9FA5",
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.3
    }
})

export default UserAfterLogin;