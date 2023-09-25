import { View, Pressable, Text, TextInput, StyleSheet, Image, Dimensions } from "react-native";
import { useRecoilState } from "recoil";
import { SetUser } from "../state/SetUser";
const DescriptionItem = () => {

    const [userData, setUserData] = useRecoilState(SetUser);


    const { width } = Dimensions.get("window");
    return (
        <View style={[styles.boxDescription, { width: width - 20 }]}>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Text numberOfLines={3} style={{color : "#fff", fontFamily : 'PoppinsMedium'}}>{userData.description || "No Description"}</Text>
                    </View>
        </View>
    )
}
const styles = StyleSheet.create({
    boxDescription: {
        flexDirection: "row",
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10
    }
})
export default DescriptionItem;