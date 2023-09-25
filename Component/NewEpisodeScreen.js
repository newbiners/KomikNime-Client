import { FlatList,View,Text,ActivityIndicator } from "react-native";
import axios from "axios";
import { API_URL, ENVIRONMENT } from '@env';
import { useEffect, useState } from "react";
import NewEpisode from "./atom/NewEpisode";
const NewEpisodeScreen = ({navigation}) => {
const [list, setList] = useState();
const [dataActive, setDataActive] = useState(false);
const newEpsHendler = async() => {
    try{
        setDataActive(false)
        const {data:respon} = await axios.get(API_URL + `/comic/findAll`);
     
        setList(respon.data)
        setTimeout(() => {
            setDataActive(true);
          }, 1000);
    }catch(error) {
        console.log(error)
    }
}

const SetNewEpisode = ({ item }) => {
    if (dataActive) {
      return <NewEpisode item={item} onPress={() => navigation.navigate("episodeScreen", {
        id: item._id
      })} />
    } else {
      return (
        <View style={{ backgroundColor: "#ffff", height: 170, width: 130, borderRadius: 10, elevation: 8, margin: 5, marginBottom: 50 }}>
          <View style={{ marginTop: 70 }}>
            <ActivityIndicator size="large" color="#F86F03" />
          </View>
        </View>
      )
    }
  }

useEffect(() => {
    newEpsHendler();
},[])
return(
    <View>
        <FlatList
              data={list}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) =>
                <SetNewEpisode item={item} />
              }
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 10 }}
            />
    </View>
)
}

export default NewEpisodeScreen;