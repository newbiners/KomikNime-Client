import { View, FlatList, Dimensions, StyleSheet, ActivityIndicator, Text } from "react-native";
import EpisodeCard from "./EpisodeCard";
import { useRecoilState } from "recoil";
import { SetDataValue } from "../state/SetDataValue";
const ValueDataSearch = ({ navigation }) => {
    const [dataValue, setDataValue] = useRecoilState(SetDataValue);
    const windowWidth = Dimensions.get('window').width;

    if (windowWidth > 380) {
        width = 384
    } else if (windowWidth > 340) {
        width = 320
    } else {
        width = 250
    }


    return (
        <View style={{ position: "absolute", zIndex: 999 }}>
            <View style={[styles.boxEps, { width: width }]}>
                {dataValue != 0 ?
                    <FlatList
                        data={dataValue}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) =>
                            <EpisodeCard item={item} onPress={() => navigation.navigate("episodeScreen", {
                                id : item._id
                            })}/>
                        }
                        style={{ marginVertical: 20, marginHorizontal: 5 }}
                    /> :
                    <View style={{marginVertical : 150}}>
                        <ActivityIndicator size="large" color="#F86F03" />
                    </View>
                }
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    boxEps: {
        backgroundColor: "#D8D9DA",
        height: 300,
        width: 50,
        borderRadius: 20,
        elevation: 8,
        left: 17,
        top: 70
    }
})
export default ValueDataSearch;