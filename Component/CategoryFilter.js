import { API_URL, ENVIRONMENT } from '@env';
import axios from 'axios';
import { useState ,useEffect } from 'react';
import {  View ,FlatList,ActivityIndicator } from 'react-native';
import RecomendedHendler from './atom/RecomendedHendler';
const CategoryFilter = ({ filter, navigation}) => {
    const [data, setData] = useState();
    const [dataActive, setDataActive] = useState(false)
    const filterHendler = async() => {
        try{
          setDataActive(false)
            const {data:respons} = await axios.get(API_URL + `/comic/findAll?sortData=viewCount&type_id=${filter}`);
            setData(respons.data)
            setTimeout(() => {
              setDataActive(true);
            }, 1000);
        }catch(error){
            console.log(error)
        }
    }

    const SetRecomendedHendler = ({ item }) => {
      if (dataActive) {
        return <RecomendedHendler item={item} onPress={() => navigation.navigate("episodeScreen", {
          id: item._id
        })} />
      } else {
        return (
          <View style={{ backgroundColor: "#ffff", height: 140, width: 100, borderRadius: 10, elevation: 8, margin: 5, marginBottom: 50 }}>
            <View style={{ marginTop: 50 }}>
              <ActivityIndicator size="large" color="#F86F03" />
            </View>
          </View>
        )
      }
    }

    useEffect(() => {
        filterHendler()  
    },[])
    return(
        <View>
          {data &&
            <FlatList
              data={data}
              keyExtractor={item => item._id}
              renderItem={({ item }) =>
                <SetRecomendedHendler item={item}/>
              }
              horizontal={true}

              showsHorizontalScrollIndicator={false}
            />
          }
        </View>
    )
}


export default CategoryFilter;