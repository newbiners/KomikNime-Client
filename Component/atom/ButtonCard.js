import { Pressable, View, Text,Dimensions,StyleSheet } from "react-native";
const ButtonCard = ({ onPress, isPrimery, title, isButtonForm }) => {
    const windowWidth = Dimensions.get('window').width;
    if (windowWidth > 380) {
        width = 288;
        height = 56;
    } else if (windowWidth > 340 ) {
        width = 260;
        height = 50;
    } else {
        width = 150;
        height = 48;
    }
    return (
        <View style={[styles.boxButtonCard,(isPrimery && { backgroundColor: "#FFA41B" } || isButtonForm && { backgroundColor: '#ffff' }) , {height : height, width : width}]}>
            <Pressable onPress={onPress} android_ripple={{ color: "#F2BE22"}} style={{ width : "100%"}}>
                <View style={{alignItems : "center",  paddingVertical : 7}}>
                <Text style={[styles.textStyle, (isButtonForm && { color: '#D8D9DA' })]}>{title}</Text>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    boxButtonCard : {
        backgroundColor : "#FFFF",
        borderRadius : 10,
        alignItems : "center",
        justifyContent : "center",
        overflow : "hidden",
        marginBottom : 20,
       
    },
    textStyle : {
        fontSize : 25,
        fontWeight : "bold",
        color : "#FFFF"
    }
})

export default ButtonCard;