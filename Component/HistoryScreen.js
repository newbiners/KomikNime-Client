import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Pressable, Image, RefreshControl, StyleSheet } from 'react-native';
import { getData } from './state/Storage';
import axios from 'axios';
import { API_URL, ENVIRONMENT } from '@env';
import DataNotFound from './atom/DataNotFound';
const HistoryScreen = ({ navigation }) => {
    const [dataChapter, setDataChapter] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        historyHandler()
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);
    const historyHandler = async () => {
        try {
            const token = await getData();
            const header = `bearerCode ${token}`;
            const { data: respon } = await axios.get(API_URL + "/histories", { headers: { Authorization: header } });
            setDataChapter(respon.data);
            console.log(respon.data)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        historyHandler();
    }, []);
    return (
        <View>
            <Pressable onPress={historyHandler}>
                <Text style={{ fontSize: 20, color: "orange", marginLeft: 10, marginTop: 20, fontFamily: 'PoppinsMedium'}}>History</Text>
            </Pressable>
            <View>
                {
                    dataChapter != 0 ?
                        <FlatList
                            data={dataChapter}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item }) => {
                                return (
                                    <View style={style.boxEpisodeCard}>
                                        {item &&
                                            <Pressable onPress={() => navigation.navigate("episodeScreen", {
                                                id: item.comic._id
                                            })} android_ripple={{ color: "#F2BE22" }}>
                                                <View style={style.boxImageAndTitle}>
                                                    <View>
                                                        <Image source={{ uri: item.comic?.imageUrl }} style={style.imageSize} />
                                                    </View>
                                                    <View style={{ flexDirection: "column", width : 80 }}>
                                                            <Text style={style.textStyle} numberOfLines={2}>{item.comic?.title}</Text>
                                                            <Text style={{fontSize : 10, fontFamily : 'PoppinsMedium'}}>{item.chapter?.title}</Text>
                                                       
                                                    </View>
                                                </View>
                                            </Pressable>
                                        }
                                    </View>
                                )
                            }}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                            numColumns={2}
                        />
                        :
                        <DataNotFound />
                }
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    boxEpisodeCard: {
        width: 170,
        margin : 6,
        backgroundColor : "#fff",
        borderRadius : 10,
        elevation : 8,
        overflow : "hidden"
    },
    boxImageAndTitle: {
        flexDirection : "row",
        alignItems : "center"

    },
    imageSize: {
        height: 70,
        width: 70,
        marginRight : 5
    },
    boxText: {
        marginLeft: 10
    },
    textStyle: {
        fontSize: 13,
        fontWeight: "600",
        fontFamily : 'PoppinsMedium'
    }
})
export default HistoryScreen;