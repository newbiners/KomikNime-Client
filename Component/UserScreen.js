import { View, Dimensions, Animated, ActivityIndicator, StyleSheet } from "react-native";
import { useState, useRef, useEffect } from "react";

import { SetFormRegistrasi } from "./state/SetFormRegistrasi";
import { SetFormLogin } from "./state/SetFormLogin";
import { useRecoilState } from "recoil";
import { SetToAfter } from "./state/SetToAfter";
import UserBeforeLogin from "./UserBeforeLogin";
import FormRegistrasi from "./FormRegistrasi";
import FormLogin from "./FormLogin";
import UserAfterLogin from "./UserAfterLogin";
import { getData } from "./state/Storage";
import { SetRemoveUser } from "./state/SetRemoveUser";
const UserScreen = ({ navigation }) => {
    const position1 = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const position2 = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const [isMoved, setIsMoved] = useRecoilState(SetFormRegistrasi);
    const [isGeser, setGeser] = useRecoilState(SetFormLogin);
    const [dataAct, setDataAct] = useRecoilState(SetToAfter);
    const [removeData, setRemoveData] = useRecoilState(SetRemoveUser);
    const [token, setToken] = useState();
    const { height, width } = Dimensions.get('window');
    const moveComponent = () => {
        if (isMoved) {
            Animated.timing(position1, {
                toValue: { x: 0, y: 0 },
                duration: 500,
                useNativeDriver: false,
            }).start(() => {
                setIsMoved(false);
            });
        } else {
            Animated.timing(position1, {
                toValue: { x: 0, y: height - 100 },
                duration: 500,
                useNativeDriver: false,
            }).start(() => {
                setIsMoved(true);
            });
        }
    };
    const moveComponentLogin = () => {

        if (isGeser) {
            Animated.timing(position2, {
                toValue: { x: 0, y: 0 },
                duration: 500,
                useNativeDriver: false,
            }).start(() => {
                setGeser(false);
            });
        } else {
            Animated.timing(position2, {
                toValue: { x: 0, y: height - 100 },
                duration: 500,
                useNativeDriver: false,
            }).start(() => {
                setGeser(true);
            });
        }
    };


    const btnMoveRegisToLogin = () => {
        console.log()
        moveComponentLogin();
        Animated.timing(position1, {
            toValue: { x: 0, y: height - 100 },
            duration: 500,
            useNativeDriver: false,
        }).start(() => {
            setIsMoved(false);
        });
    }

    const btnLoginToRegister = () => {
        moveComponent()
        Animated.timing(position2, {
            toValue: { x: 0, y: height - 100 },
            duration: 500,
            useNativeDriver: false,
        }).start(() => {
            setGeser(false);
        });
       
    }

    const dataGetData = async () => {
        try {
            const token = await getData();
            setToken(token);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setGeser(false);
        setIsMoved(false);
        moveComponentLogin();
        moveComponent();
    }, [])
    useEffect(() => {
        dataGetData();
    }, [removeData])
    return (
        <View>
            {token != null ?
                <UserAfterLogin navigation={navigation}/>
                :
                <View>
                    <UserBeforeLogin moveComponent={moveComponent} moveComponentLogin={moveComponentLogin} />
                    <FormRegistrasi position={position1.getLayout()} moveComponent={moveComponent} btnMoveRegisToLogin={btnMoveRegisToLogin} />
                    <FormLogin position={position2.getLayout()} btnLoginToRegister={btnLoginToRegister} moveComponent={moveComponentLogin} navigation={navigation} />
                    {dataAct &&
                        <View style={[styles.boxLoanding, { height: height, width: width }]}>
                            <ActivityIndicator size="large" color="#F86F03" />
                        </View>
                    }
                </View>
            }
        </View>
    )
}
const styles = StyleSheet.create({
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
export default UserScreen;