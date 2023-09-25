import { View, Text, Image, Dimensions, Pressable,StyleSheet } from "react-native";
import axios  from "axios";
import { useState, useEffect } from "react";
import { API_URL, ENVIRONMENT } from '@env';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye } from "@fortawesome/free-solid-svg-icons";
const RecomendedHendler = ({ item, onPress }) => {
const [data, setData] = useState();
    const perentCategoryHendler = async() => {
        const {data} = await axios.get(API_URL +"/categories");
        const result = data.data.filter(data => data._id == item.category_id);
        setData(result);
       }
       useEffect(() => {
        perentCategoryHendler();
       },[])
    const { height } = Dimensions.get('window');
    if (height > 800) {
        widthScreen = 100;
        heightScreen = 180;
        marginBottom = 50;
        titleSize = 20;
        categorySize = 15;
    } else if (height > 710) {
        widthScreen = 100;
        heightScreen = 170;
        marginBottom = 50;
        titleSize = 14;
        categorySize = 10;
    } else {
        widthScreen = 120;
        heightScreen = 160;
        marginBottom = 50;
        titleSize = 16;
        categorySize = 5;
    }
    return (
        <Pressable  onPress={onPress}>
            <View style={[style.boxRecomended, { height: heightScreen, width: widthScreen, marginBottom: marginBottom }]}>
                <View style={style.boxImage}>
                    <Image source={{ uri: item.imageUrl }} style={style.styleImage}/>
                </View>
                <View style={style.titleRecomended}>
                    <View>
                    <Text style={{ fontSize: categorySize , color : "#FFA41B", fontFamily : 'PoppinsMedium'}}>{data && data[0]?.name}</Text>
                    <Text style={{ fontSize: titleSize, fontWeight : "600", color : "grey", fontFamily : 'PoppinsMedium'}} numberOfLines={2}>{item.title}</Text>
                    </View>
                    <View style={{flexDirection : "row", alignItems : "center"}}>
                        <FontAwesomeIcon icon={faEye} size={12} color="#FFA41B" style={{marginRight : 6}}/>
                        <Text style={{color : "#FFA41B",fontFamily : 'PoppinsMedium'}}>{item.viewCount}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

const style = StyleSheet.create({
boxRecomended: {
    marginLeft : 10,
    marginRight : 4,
    marginTop : 2,
    marginBottom : 10
},
boxImage: {
height : "70%",
width : "100%",
elevation : 5,
backgroundColor : "#ffff",
borderRadius : 10

},
styleImage : {
    width : "100%",
    height : "100%",
    borderRadius : 10,
 
},
titleRecomended: {
    flexDirection : "column",
    height: "55%",
    justifyContent : "space-between",
    marginTop : 10
}
})

export default RecomendedHendler;