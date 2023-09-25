import { View,Image, Text,Dimensions } from "react-native"

const FooterScreen = () => {
    const { height, width } = Dimensions.get("window");
    return (
        <View>
            <View>
                <Image source={require("../image/benner.png")} style={{ width: width }} />
            </View>
            <View style={{ backgroundColor: "orange" }}>
                <Text style={{ color: "#ffff" }}>footer 2023 @komikList</Text>
            </View>
        </View>
    )
}

export default FooterScreen;