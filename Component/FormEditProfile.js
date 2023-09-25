import { View, Animated, Text, Image, Pressable, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import { SetUser } from "./state/SetUser";
import { useRecoilState } from "recoil";
import TextInputItem from "./atom/TextInputItem"
import ButtonCard from "./atom/ButtonCard";
import ButtonCloseItem from "./atom/ButtonCloseItem";
import { getData } from "./state/Storage";
import { Alert } from "react-native";
import axios from "axios";
import { API_URL, ENVIRONMENT } from '@env';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { SetRemoveUser } from "./state/SetRemoveUser";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
const FromEditeProfile = ({ position, onPress }) => {
    const [userData, setUserData] = useRecoilState(SetUser);
    const [images, setImages] = useState();
    const [removeData, setRemoveData] = useRecoilState(SetRemoveUser);
    const [password, setPassword] = useState()
    const [alertOutpute, setAlert] = useState();

    useEffect(() => {

        const promisesHendler = async () => {

            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Permission denied')
                }
            }
        }
        promisesHendler();
    }, [])


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (result.canceled) {
            Alert.alert("Apakah anda yakin?", "Anda telah membatalkan pemilihan gambar.");
        } else {
            setImages(result.assets[0].uri);
        }
    };

    const btnUpdate = async () => {
        if (password == null || password == "") {
            setAlert("masukan password lama atau ubah ke yang baru");
        } else {
            try {
                const formData = new FormData();
                const token = await getData()
                const header = `bearerCode ${token}`
                const imageUrl = images ? images : userData.imageUrl;
                const parts = imageUrl && imageUrl.split('/');
                const nameData = imageUrl && parts[parts.length - 1];
                formData.append('images', {
                    uri: imageUrl,
                    name: nameData,
                    type: "image/jpeg"
                } || null)

                formData.append('username', userData.username)
                formData.append('email', userData.email)
                formData.append('password', password || null)
                formData.append('description', userData.description || null)
                const { data } = await axios.put(API_URL + "/user/update", formData, {
                    headers: {
                        Authorization: header,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (!data) {
                    Alert.alert("gagal update")
                }
                setAlert("data berhasil di update")
                setRemoveData(formData)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <Animated.View
            style={[
                {
                    height: 400,
                    width: "100%",
                    position: "absolute",
                    marginTop: 60,
                },
                position,
            ]}
        >
            <View style={styles.boxFormEdite} >
                <ButtonCloseItem
                    title={"Edit"}
                    isTitleShow={true}
                    onPress={onPress}
                />
                <View style={{ marginHorizontal: 10 }}>
                    <View style={{ alignItems: "center", marginBottom: 10 }}>
                        <View style={styles.boxImage}>
                            <Image source={images ? { uri: images } : { uri: userData.imageUrl && userData.imageUrl }} style={{ height: 111, width: 100 }} />
                        </View>
                        <Pressable onPress={pickImage}>
                            <View style={{ position: "absolute", backgroundColor: "orange", padding: 8, borderRadius: 100, right: 10, top: -110, zIndex: 999 }}>
                               <FontAwesomeIcon icon={faCamera} size={15} color="#fff"/>
                            </View>
                        </Pressable>

                    </View>
                    <View style={{ alignItems: "center"}}>
                        <Text style={{fontFamily : 'PoppinsMedium', textAlign : "center"}}>{alertOutpute}</Text>
                    </View>
                    <View style={{ height: 350 }}>
                        <ScrollView>
                            <TextInputItem
                                title={"Username"}
                                placeholder={"input your username"}
                                value={userData.username}
                                onChange={(item) => setUserData(data => ({ ...data, username: item }))}
                            />
                            <TextInputItem
                                title={"Email"}
                                placeholder={"input your email"}
                                value={userData.email}
                                onChange={(item) => setUserData(data => ({ ...data, email: item }))}
                            />
                            <TextInputItem
                                title={"Description"}
                                placeholder={"input your email"}
                                value={userData.description && userData.description}
                                onChange={(item) => setUserData(data => ({ ...data, description: item }))}
                            />
                            <TextInputItem
                                title={"change password"}
                                placeholder={"*****"}
                                onChange={(item) => setPassword(item)}
                            />
                        </ScrollView>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <ButtonCard isPrimery={true} title={"Update"} onPress={btnUpdate} />
                    </View>
                    
                </View>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    boxFormEdite: {
        backgroundColor: "#ffff",
        elevation: 8,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: 900
    },
    boxImage: {
        backgroundColor: "#ffff",
        height: 100,
        width: 100,
        borderRadius: 100,
        elevation: 8,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center"
    }
})
export default FromEditeProfile;
