import { View, Text,FlatList } from "react-native"
import { useState, useEffect } from "react";
import RecomendedHendler from "./atom/RecomendedHendler";
import axios from "axios";
import { API_URL, ENVIRONMENT } from '@env';
const RecomendedFilter = ({navigation}) => {
    const [data, setData] = useState();
   const recomendedHendler = async() => {
    try{
        const {data:respon} = await axios.get(API_URL + `/comic/findAll?sortData=viewCount`);
        setData(respon.data)
    }catch(error){
        console.log(error)
    }
   }

   useEffect(() => {
    recomendedHendler()
   },[])
    return (
        <View>
            {data &&
                <FlatList
                    data={data}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) =>
                        <RecomendedHendler item={item} onPress={() => navigation.navigate("episodeScreen", {
                            id: item._id
                        })} />
                    }
                    horizontal={true}

                    showsHorizontalScrollIndicator={false}
                />
            }
        </View>
    )
}

export default RecomendedFilter;