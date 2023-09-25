import { View, Image, Text } from "react-native";
const LogoItem = ({isTitleShow}) => {
    return (
        <View className="text-center items-center">
            <View className="bg-orange-500 h-28 w-28 flex justify-center items-center rounded-full overflow-hidden mb-4 shadow-xl shadow-black">
                <Image source={require("../image/logo2.png")} className="h-28 w-28" />
            </View>
            {isTitleShow && <Text className="text-3xl font-bold text-orange-500 text-center mb-10 tracking-tight">KOMIKNIME</Text> }
        </View>
    )
}

export default LogoItem;