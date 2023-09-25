import { View, Text, Image, Pressable, Dimensions, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, ENVIRONMENT } from '@env';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye } from "@fortawesome/free-solid-svg-icons";
const EpisodeCard = ({ item, onPress, navigation }) => {
    const [data, setData] = useState();
    const windowWidth = Dimensions.get('window').width;
    var widthSize, heightSize;

    if (windowWidth > 380) {
        widthSize = 55,
            heightSize = 75
    } else if (windowWidth > 340) {
        widthSize = 72,
            heightSize = 100
    } else {
        widthSize = 42,
            heightSize = 50
    }
    const childHendler = async () => {
        try {
            const { data:respon } = await axios.get(API_URL + "/categories")
            for(let i = 0; i < respon.data.length; i++){
                if(respon.data[i]._id === item.category_id){
                    setData(respon.data[i]);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        childHendler();
    }, [])
    return (
        <View style={style.boxEpisodeCard} key={item._id}>
            {item &&
                <Pressable android_ripple={{ color: "#F2BE22" }} onPress={onPress}>
                    <View style={style.boxImageAndTitle}>
                        <View style={[style.boxImage, { width: widthSize, height: heightSize }]}>
                            <Image source={{ uri: item.imageUrl }} style={style.imageSize} />
                        </View>
                        <View style={style.boxText}>
                            <Text style={style.textStyle} numberOfLines={1}>{item.title}</Text>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{fontFamily : 'PoppinsMedium',color : "grey"}}>Genre : </Text>
                                <Text style={{fontFamily : 'PoppinsMedium', color : "grey"}}>{data?.name}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                                <FontAwesomeIcon icon={faEye} size={13} style={{marginRight : 5}} color="#FFA41B"/>
                                <Text style={{ color: "#FF8038" }}>{item.viewCount}</Text>
                            </View>
                        </View>
                    </View>
                </Pressable>
            }
        </View>
    )
}

const style = StyleSheet.create({
    boxEpisodeCard: {
        backgroundColor: "#fff",
        marginBottom: 10,
        marginHorizontal: 5,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 8,
        shadowRadius: 10,
        elevation: 3,
        overflow : "hidden"
    },
    boxImageAndTitle: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    boxImage: {
        display: "flex",
        alignItems: "center",
    },
    imageSize: {
        height: "100%",
        width: "100%",
    },
    boxText: {
        marginHorizontal: 10,
        width: "65%",
        flexDirection : "column",
        justifyContent : "space-between",

    },
    textStyle: {
        fontSize: 20,
        color: "grey",
        fontFamily : 'PoppinsSemiBold'
    }

})

export default EpisodeCard;