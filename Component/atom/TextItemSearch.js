import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { Image } from "react-native";
import { useRecoilState } from "recoil";
import { SetDataSearch } from "../state/SetDataSearch";
import { SetDataValue } from "../state/SetDataValue";
import { API_URL, ENVIRONMENT } from '@env';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const TextItemSearch = ({ onPress, isTextInputShow, isHomeScreen }) => {
    const [dataPencarian, setDataPencarian] = useRecoilState(SetDataSearch);
    const [dataValue, setDataValue] = useRecoilState(SetDataValue);
        const btnSreach = async() => {
            try{
                const {data} = await axios.get(API_URL + `/comic/findAll?title=${dataPencarian}`)
                setDataValue(data.data)
            }catch(error) {
                console.log(error)
            }
        }

    useEffect(() => {
    btnSreach()
    },[dataPencarian])
    return (
        <View style={style.boxItemSearch}>
            {
                isTextInputShow &&
                <TextInput placeholder="masukan input nilai" style={style.textInputStyle} value={dataPencarian} onChangeText={(item) => setDataPencarian(item)}/>
            }
            {isHomeScreen ?
                <Pressable onPress={onPress}>
                    <View style={style.boxIcon}>
                       <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color="#fff"/>
                    </View>
                </Pressable> :
                <Pressable onPress={btnSreach}>
                    <View style={{width: 50, height: 50, justifyContent: "center", alignItems: "center", borderRadius: 5,  backgroundGradient: "vertical", backgroundGradientTop: "#333333", backgroundGradientBottom:"#FFA41B"}}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color="#fff"/>
                    </View>
                </Pressable>

            }
        </View>
    )
}

const style = StyleSheet.create({
    boxItemSearch: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 22,
        zIndex: 9999,
        marginHorizontal: 30
    },
    textInputStyle: {
        width: "100%",
        height: 50,
        paddingHorizontal: 10,
        fontSize: 15,
        borderRightWidth : 1,
        marginRight : 5,
        fontFamily : 'PoppinsReguler'
    },
    boxIcon: {
        backgroundColor: "#FFA41B",
        width: 80,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        height : 30

    }
})
export default TextItemSearch;