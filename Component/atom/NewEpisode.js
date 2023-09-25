import { View, Image, Dimensions, Pressable, StyleSheet } from "react-native";


const NewEpisode = ({ item, onPress }) => {
    const { height } = Dimensions.get('window');
    if (height > 800) {
        widthScreen = 160;
        heightScreen = 210;
    } else if (height > 710) {
        widthScreen = 130;
        heightScreen = 176;
    } else {
        widthScreen = 96;
        heightScreen = 128;
    }

    return (
        <Pressable onPress={onPress}>
            <View style={{ marginLeft: 10,elevation: 10 , backgroundColor : "#ffff", borderRadius : 10 }}>
                    <Image source={{ uri: item.imageUrl }} style={[style.imageStyle, { height: heightScreen, width: widthScreen }]} />
            </View>
        </Pressable>
    )
}

const style = StyleSheet.create({
    imageStyle: {
        borderRadius: 10,
        
    }
})

export default NewEpisode;