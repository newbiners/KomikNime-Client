import { View, Text,Image,StyleSheet,Pressable } from "react-native";
// import AntDesign from "react-native-vector-icons/AntDesign";
import { useRef, useState } from "react";
const TitleMenuEXplor = ({ title }) => {
    const [color, setColor] = useState('rgba(0, 0, 0, 0)')
    const lastPress = useRef(0)

    const ceckTest = () => {
        const currentTime = new Date().getTime();
        const delay = 300; // Delay threshold for double tap in milliseconds
      
        if (currentTime - lastPress.current < delay) {
            setColor("yellow") 
        }
    
        lastPress.current = currentTime;
    }
if(color == "yellow"){
    setTimeout(() => {
        setColor('rgba(0, 0, 0, 0)')
    },5000)
}
    return (
        <Pressable onPress={ceckTest}>
        <View style={[style.boxTitleExplore,{backgroundColor : color }]}>
            <Text style={style.textStyle}>{title}</Text>
            {/* <AntDesign name="right" size={25} color="#000" /> */}
        </View>
        </Pressable>
    )
}

const style = StyleSheet.create({
    boxTitleExplore:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
        alignItems: "center",
        marginBottom: 5 
    },
    textStyle: {
        fontSize: 20,
        color: "grey",
        fontFamily: 'PoppinsMedium' 
    }
})
export default TitleMenuEXplor;