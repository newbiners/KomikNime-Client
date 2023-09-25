import { View,Text,Dimensions,Image,Pressable,ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { API_URL, ENVIRONMENT } from '@env';
import axios from "axios";
import DataNotFound from "./atom/DataNotFound"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
const GenreFilterHandel = ({item,navigation}) => {

    const { height, width } = Dimensions.get("window");
    const [data, setData] = useState();
    const [indicator, setIndicator] = useState(false)
    const genreFilter = async() => {
        try{
            setIndicator(false)
           const {data:respon} = await axios.get(API_URL + `/comic/findAll?sortData=viewCount&category_id=${item._id}`);
            setData(respon.data)
            setTimeout(() => {
                setIndicator(true)
            },1000)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        genreFilter()
    },[])

    const LoadingHendler = ({data, index}) => {
        if(indicator){
            return(
                <Pressable onPress={() => navigation.navigate("episodeScreen", {
                id: data._id
            })}>
        
            <View style={{flexDirection : "row", alignItems : "center", margin : 5}}>
                <View style={{marginRight : 10}}>
                <Text style={{ fontSize : 16,  fontFamily: 'PoppinsMedium', color : "grey"}}>{index + 1}</Text>
                </View>
                <View style={{marginRight : 20}}>
                <Image source={{uri : data.imageUrl}} style={{height : 60, width : 60, borderRadius : 10}}/>
                </View>
                <View style={{width : width - 100}}>
                <Text style={{ fontSize : 16,   fontFamily: 'PoppinsSemiBold', color: "grey" }}>{data.title}</Text>
                <Text style={{  fontFamily: 'PoppinsReguler',color : "#FFA41B"}}>{item && item.name}</Text>
                </View>
            </View>
            </Pressable>
        )
    }else {
        return(
        
        <Pressable onPress={() => navigation.navigate("episodeScreen", {
            id: data._id
        })}>
    
        <View style={{flexDirection : "row", alignItems : "center", margin : 5}}>
            <View style={{marginRight : 10}}>
            </View>
            <View style={{marginRight : 20, backgroundColor : "#fff", height : 60, width : 60, borderRadius : 10, alignItems : "center", justifyContent : "center"}}>
            <ActivityIndicator size="large" color="#F86F03" />
            </View>
            <View style={{width : width - 100}}>
                <View style={{width : "90%", backgroundColor : "#ffff", height : 20, borderRadius : 10, marginBottom : 7}}>
                </View>
                <View style={{width : "30%", backgroundColor : "#ffff", height : 20, borderRadius : 10}}>
                </View>
            </View>
        </View>
        </Pressable>
            )
    }
    }
    return(
        <View style={{width : width}}>
            <View style={{marginLeft : 10, flexDirection : "row", justifyContent : "space-between", alignItems : "center", marginRight : 10, alignItems : "center"}}>
            <Text style={{fontSize : 21,fontFamily : 'PoppinsSemiBold',color : "grey"}}>Top {item && item?.name}</Text>
            <FontAwesomeIcon icon={faArrowRight} size={20} color="#D8D9DA" style={{marginRight : 20}}/>
            </View>
            {
            data != 0 ? 
            data &&
            data.slice(0, 5).map((data,index) => {
                return(
                    <LoadingHendler data={data} index={index}/>
                )
            }) 
            :
            <DataNotFound/>

            }
        </View>
    )
}


export default GenreFilterHandel;