import { View, Text,FlatList,Dimensions } from "react-native"
import { useState, useEffect } from "react";
import { API_URL, ENVIRONMENT } from '@env';
import axios from "axios";
import GenreFilterHandel from "./GenreFilterHandel ";
const TopGenre = ({navigation}) => {
    const [data, setData] = useState();

    const dataHendler = async() => {
        try{
            const {data:respon} = await axios.get(API_URL + "/categories")
            setData(respon.data)
        }catch(error){
            console.log(error);
        }
    }


    useEffect(() => {
        dataHendler();
    },[])

    return(
        <View>
           <FlatList
           data={data}
           keyExtractor={item => item._id}
           renderItem={({item}) => {
            return <GenreFilterHandel item={item} navigation={navigation}/>
           }}
           horizontal={true}
           showsHorizontalScrollIndicator={false}
           pagingEnabled
           />
        </View>
    )
}

export default TopGenre;