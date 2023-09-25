import { View, Image } from "react-native"

const DataNotFound = () => {
    return (
        <View style={{ height: 400, flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Image source={require("../image/dataNotFound2.png")} style={{ height: 150, width: 180 }} />
        </View>
    )
}


export default DataNotFound;