import { View, Text, Image, Pressable,StyleSheet,Dimensions } from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL, ENVIRONMENT } from '@env';
const HomePage = ({ item, onPress }) => {
    const { width } = Dimensions.get("window");
    const [data, setData] = useState();
   const perentCategoryHendler = async() => {
    const {data} = await axios.get(API_URL +"/categories");
    const result = data.data.filter(data => data._id == item.category_id);
 
    setData(result);
   }
   useEffect(() => {
    perentCategoryHendler();
   },[])
    return (
        <Pressable onPress={onPress}>
            <View  style={[style.boxHomePage, {width : width}]}>
                <Image source={{ uri: item.imageUrl }} style={style. imageSize} blurRadius={2}/>
                <View style={[style.boxText, {width :width - 20}]}>
                    <View style={{elevation : 10, backgroundColor : "#FFA41B", borderRadius : 10}}>
                    <Image source={{ uri: item.imageUrl }} style={{height : 170, width : 120, borderRadius : 10}}/>
                    </View>
                    <View style={{ width : 70,height : 70,backgroundColor :"#FFA41B" ,borderRadius : 15, alignItems : "center", justifyContent : "center",  elevation : 1}}>
                    <Text style={{fontSize: 14, color : "#ffff",fontFamily : 'PoppinsBold'}}>{data && data[0]?.name}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

const style = StyleSheet.create({
    boxHomePage : {
        height : 250,
        backgroundColor : "#FFA41B",
        overflow : "hidden",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 8,
        shadowRadius: 10,
      
    },
    imageSize : {
        height : "100%",
        width : "100%"
    },
    boxText: {
        position : "absolute",
        alignItems : "flex-end",
        justifyContent : "space-between",
        bottom : 10,
        left : 10,
        flexDirection : "row",
    }
})

export default HomePage;