import { View, FlatList, Pressable, Text, RefreshControl, ScrollView, StyleSheet } from "react-native";
import { API_URL, ENVIRONMENT } from '@env';
import axios from "axios";
import { getData } from "./state/Storage";
import { useState, useCallback, useEffect } from "react";
import EpisodeCard from "./atom/EpisodeCard";
import { SetDataFavorite } from "./state/SetDataFavorite";
import { useRecoilState } from "recoil";
import { FavoriteIndicator } from "./state/FavoriteIndcator";
import HistoryScreen from "./HistoryScreen";
import ButtonCard from "./atom/ButtonCard";
import DataNotFound from "./atom/DataNotFound";
import FooterScreen from "./atom/FooterScreen";
const MarkScreen = ({ navigation }) => {
    const [dataFavorite, setDataFavorite] = useRecoilState(SetDataFavorite);
    const [refreshing, setRefreshing] = useState(false);
    const [indicator, setIndicator] = useRecoilState(FavoriteIndicator);
    const [token, setToken] = useState()

    const getFavorite = async () => {

        try {
            const token = await getData();
            setToken(token)
            console.log(token)
            const header = `bearerCode ${token}`;
            const { data } = await axios.get(API_URL + '/favorites/', { headers: { Authorization: header } });
            setDataFavorite(data.data)
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    }
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getFavorite()
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);
    useEffect(() => {
        getFavorite();
    }, [])
    useEffect(() => {
        getFavorite();
    }, [indicator])
    return (
        <View style={{ flex: 1 }}>
            {token ?
                <View style={{ flex: 1 }}>

                    <ScrollView refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }

                    >
                        <View style={{ flex: 1 }}>
                            <View>
                                <View style={{ marginTop: 50, alignItems: "center" }}>
                                    <Text style={styles.boxMarkScreen}>FAVORITE</Text>
                                </View>
                                <View>
                                    {
                                        dataFavorite ?
                                            dataFavorite.map((item) => {
                                                return (
                                                    <>
                                                        {item &&
                                                            <EpisodeCard item={item.dataComic} onPress={() => navigation.navigate("episodeScreen", {
                                                                id: item.dataComic?._id
                                                            })} />
                                                        }
                                                    </>
                                                )
                                            })
                                            :
                                            <DataNotFound />

                                    }
                                    <HistoryScreen navigation={navigation} />
                                </View>

                            </View>
                        </View>
                    </ScrollView>
                    <View style={{ alignItems: "flex-end" }}>
                        <FooterScreen />
                    </View>
                </View>
                :
                <View style={{ alignItems: "center", justifyContent: "center", height: 700 }}>
                    <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 20 }}>Anda belum login silahkan login terlebih dahulu</Text>
                    <ButtonCard onPress={() => navigation.navigate("user")} isPrimery={true} title={"Login"} />
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    boxMarkScreen: {
        fontSize: 30,
        fontFamily : 'PoppinsBold',
        marginBottom: 6,
        color: "orange",


    }
})

export default MarkScreen;