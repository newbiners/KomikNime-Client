import { View, Text, Image, Pressable, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, ENVIRONMENT } from '@env';
import { getData } from "../state/Storage";
import { useRecoilState } from "recoil";
import { SetDataFavorite } from "../state/SetDataFavorite";
import { FavoriteIndicator } from "../state/FavoriteIndcator";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEye } from "@fortawesome/free-solid-svg-icons";
const HeaderEpsMark = ({ item, onPressOn }) => {
    const [indicator, setIndicator] = useRecoilState(FavoriteIndicator);
    const [dataGetFavorite, setDataGetFavorite] = useRecoilState(SetDataFavorite);
    const [dataLove, setDataLove] = useState([]);
    const [love, setLove] = useState(false);
    const { width } = Dimensions.get("window");



    const checkDataFavorite = () => {
        const dataFavorite = dataGetFavorite && dataGetFavorite.filter(data => data.dataComic._id == item._id)
        setDataLove(dataFavorite)
        if (dataFavorite != 0) {
            setLove(true)
        }
    }

  

    useEffect(() => {
        checkDataFavorite();
        setIndicator("heanderEps")
    }, [])
    return (
        <View>
            {item &&
                <View key={item._id}>
                    <View style={{ marginTop: 7, marginHorizontal: 10, }}>
                        <View >
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Image source={{ uri: item.imageUrl }} style={{ height: 140, width: 90, borderRadius: 10, marginRight: 20 }} />
                                <View style={{ marginLeft: 2, width: 230 }}>

                                    <Text style={{ fontSize: 21, color: "#fff", fontFamily: 'PoppinsSemiBold' }}>{item.title}</Text>
                                    <View>
                                        <Text style={{ fontSize: 13, color: "#fff", fontFamily: 'PoppinsReguler' }} numberOfLines={2} >{item.description}</Text>
                                    </View>
                                    <View style={{flexDirection : "row", alignItems : "center", marginTop : 15}}>
                                        <FontAwesomeIcon icon={faEye} size={15} color="#FFFF" style={{marginRight : 5}}/>
                                        <Text style={{fontSize: 13, color : "#FFFF", fontFamily: 'PoppinsReguler'}}>{item.viewCount}</Text>
                                    </View>
                                </View>
                                <View style={{ alignItems: "center" }}>
                                    {/* <Pressable onPress={loveHendler}>
                                        {love ?
                                            <View>
                                                <View style={{ backgroundColor: "red", height: 50, width: 50, justifyContent: "center", alignItems: "center", borderRadius: 100,elevation: 8 }}>
                                                    <Image source={require("../image/love.png")} style={{ height: 20, width: 22 }} />
                                                </View>
                                            </View>
                                            :
                                            <View>
                                                <View style={{ backgroundColor: "#F1F0E8", height: 50, width: 50, justifyContent: "center", alignItems: "center", borderRadius: 100, elevation: 8, }}>
                                                    <Image source={require("../image/loveOff.png")} style={{ height: 20, width: 22 }} />
                                                </View>
                                            </View>
                                        }
                                    </Pressable> */}
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            }
        </View>
    )
}

export default HeaderEpsMark;