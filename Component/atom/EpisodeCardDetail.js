import { View, Text, StyleSheet, Dimensions, Pressable, Image } from "react-native"

const EpisodeCardDetail = ({ item, onPress, index, imageComic }) => {
    const { height } = Dimensions.get('window');
    if (height > 800) {
        heightScreen = 520;
    } else if (height > 710) {
        heightScreen = 430;
    } else {
        heightScreen = 430;
    }

    return (
        <>
            {item &&
                <View style={styles.boxEpisodeCardDetail} key={item._id}>
                    <Pressable onPress={onPress} android_ripple={{ color: "#F2BE22" }} style={{ height: "100%", width: "100%", }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <View style={{ flexDirection: "row",alignItems : "center"}}>
                                <Image source={{ uri: item.imageChapterUrl ? item.imageChapterUrl : imageComic }} style={{ height: 85, width: 70 }} />
                                <View style={{marginLeft : 10}}>
                                <Text style={{ color: "grey", fontSize: 17,fontFamily : 'PoppinsReguler'}}>{item.title}</Text>
                                </View>
                            </View>
                            <View style={{marginRight : 7}}>
                                <Text style={{ color: "grey", fontSize: 17,fontFamily : 'PoppinsMedium'}}>#{index + 1}</Text>
                            </View>
                        </View>
                    </Pressable>
                </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    boxEpisodeCardDetail: {
        backgroundColor: "#ffff",
        height: 85,
        overflow: "hidden",
        borderBottomColor : "grey",
        borderBottomWidth : 1
    }
})

export default EpisodeCardDetail;