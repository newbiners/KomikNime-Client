import { View, Pressable, FlatList, StyleSheet, RefreshControl, ActivityIndicator, Image, ImageBackground, ScrollView, Text } from "react-native";
import HeaderEpsMark from "./atom/HeaderEpsMark";
import EpisodeCardDetail from "./atom/EpisodeCardDetail";
import { useEffect, useState, useCallback } from "react";
import { API_URL, ENVIRONMENT } from '@env';
import { useRecoilState } from "recoil";
import { SetDataChapter } from "./state/SetDataChapter";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import ButtonFavorite from "./atom/ButtonFavorite";
const EpisodeScreen = ({ navigation, route }) => {
    const [detailComic, setDetailComic] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [dataChapter, setDataChapter] = useRecoilState(SetDataChapter);
    const [scrollRadius, setScrollRadius] = useState({ x: 0, y: 0 });
    const [blurRadius, setBlurRadius] = useState(10);
    const { id } = route.params;
    const detailComicHendler = async () => {
        try {
            const { data: respon } = await axios.get(API_URL + `/comic/findOne/${id}`);
            setDetailComic(respon);
            setDataChapter(respon.chapter);
        } catch (error) {
            console.log(error)
        }
    }
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        detailComicHendler()
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);
    useEffect(() => {
        detailComicHendler();
    }, [id])

    useEffect(() => {
        let load = false
        if (scrollRadius.y > 165) {
            setBlurRadius(0)
        } else {
            setBlurRadius(10)
        }
        return () => {
            load = true
        }
    }, [scrollRadius.y])



    // console.log(detailComic.chapter.length, "jumlah")

    return (
        <View>
            {detailComic &&
                <View style={{ positon: "absolute", overflow: "hidden", height: 80 }}>
                    <ImageBackground source={{ uri: detailComic.data.imageUrl }} style={{ height: 340 }} blurRadius={blurRadius}>
                        <View style={{ marginTop: 45, marginLeft: 15, flexDirection: "row" }}>
                            <Pressable onPress={() => navigation.goBack()}>
                                <FontAwesomeIcon icon={faRightFromBracket} size={25} color="#FFFF" style={{ transform: [{ scaleX: -1 }] }} />
                            </Pressable>
                            <View style={{ marginLeft: 200 }}>
                                <ButtonFavorite item={detailComic.data} id={id} />
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            }
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />

            }
                onScroll={event => {
                    const { x, y } = event.nativeEvent.contentOffset;
                    setScrollRadius({ x, y });
                }}
                bounces={false}
                alwaysBounceVertical={false}
            >
                <View>
                    <View>
                        <View style={styles.boxHeader}>
                            {detailComic &&
                                <ImageBackground source={{ uri: detailComic.data.imageUrl }} style={{ height: 180 }} blurRadius={blurRadius}>
                                    <View style={{ zIndex: 999 }}>
                                        {detailComic ? <HeaderEpsMark item={detailComic && detailComic.data} navigation={navigation} /> : <ActivityIndicator size="large" color="#F86F03" />}
                                    </View>
                                </ImageBackground>
                            }
                        </View>
                    </View>
                    {detailComic &&
                    <View style={{height: 60,  backgroundColor: "#FFA41B"}}>
                        <Pressable android_ripple={{ color: "#FFF"}} onPress={detailComic.chapter.length != 0 ? () => navigation.navigate("episodeDetail", {
                                                id: detailComic.chapter[detailComic.chapter.length - 1]._id
                                            }) : console.log("navigasi tidak ada")}>
                    <View style={{ flexDirection: "row", alignItems: "center", height : 60}}>
                        <Image source={{ uri: detailComic.data.imageUrl }} style={{ height: 40, width: 40, borderRadius: 50, marginRight: 7, marginLeft: 7 }} />
                        <Text style={{ fontSize: 12, fontFamily: "PoppinsReguler" }}>| {detailComic.chapter.length} Chapter |</Text>
                        <View style={{ marginLeft: 15 }}>
                            <Text style={{ fontFamily: "PoppinsMedium", color: "#fff" }}>{detailComic.chapter.length != 0 ? "Baca Chapter tebaru" : "Chapter tidak ada"}</Text>
                        </View>
                    </View>
                    </Pressable>
                    </View>
                    }
                    <View style={{ marginBottom: 80 }}>
                        {detailComic && detailComic.chapter.map((item, index) => {
                            return (
                                <>
                                    {item ?
                                        <View key={item._id}>
                                            <EpisodeCardDetail item={item} imageComic={detailComic.data.imageUrl} index={index} onPress={() => navigation.navigate("episodeDetail", {
                                                id: item._id
                                            })} />
                                        </View> :
                                        <View key={item._id}>
                                            <ActivityIndicator size="large" color="#F86F03" />
                                        </View>
                                    }
                                </>
                            )
                        })
                        }
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    boxHeader: {
        backgroundColor: "#ffff",
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        elevation: 8,



    }
})

export default EpisodeScreen;