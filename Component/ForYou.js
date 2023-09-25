import { View,Text,StyleSheet,Pressable,Image,ActivityIndicator } from "react-native"
import { useState, useEffect } from "react";
import { API_URL, ENVIRONMENT } from '@env';
import EpisodeCard from "./atom/EpisodeCard";
import axios from "axios";
import DescriptionKomik from "./descriptionKomik";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
const ForYou = ({navigation}) => {
    const [list, setList] = useState([]);
    const [dataFirst, setDataFirst] = useState(0);
    const [dataLast, setDataLast] = useState(3);
    const [number, setNumber] = useState(1);
    const [dataActive, setDataActive] = useState(false);
    const getComicHandler = async () => {
        try {
          setDataActive(false)
          const { data } = await axios.get(API_URL + '/comic/findAll?sortData=likeCount');
          setList(data.data)
          setTimeout(() => {
            setDataActive(true);
          }, 1000);
        } catch (error) {
          console.log(error)
        }
      }
      useEffect(() => {
        getComicHandler();
      }, [])
      const btnRelod = () => {
        if (list.length/3 <= number) {
          setDataFirst(0)
          setDataLast(3)
          setNumber(1)
        } else {
          setNumber(number + 1);
          setDataFirst(dataLast)
          setDataLast(dataLast * (number + 1))
        }
      }

      const EpisodeCardHendler = ({ item }) => {
        if (dataActive) {
          return <EpisodeCard item={item} onPress={() => navigation.navigate("episodeScreen", {
            id: item._id
          })} />
        } else {
          return (
            <View style={{ backgroundColor: "#ffff", height: 90, width: "95%", borderRadius: 10, elevation: 8, marginVertical: 5, marginLeft : 10}}>
              <View style={{ margin: 30 }}>
                <ActivityIndicator size="large" color="#F86F03" />
              </View>
            </View>
          )
        }
      }
    

    return(
        <View style={{ marginTop: 20, marginHorizontal: 10 }}>
          <Text style={style.titleSize}>New Episode</Text>
          <View style={{ backgroundColor: "#FFA41B", elevation: 4, borderRadius: 12, paddingVertical: 12 }}>
            {list.slice(dataFirst, dataLast).map((item) => {
              return (
                <View key={item._id}>
                  <EpisodeCardHendler item={item} />
                </View>
              )
            }
            )}
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 15 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 15, color: "#FFA41B",fontFamily: 'PoppinsMedium'}}>Lihat Judul lainya </Text>
              <Text style={{ fontSize: 15, color: "#FFA41B",fontFamily: 'PoppinsMedium'}}>{number}/</Text>
              <Text style={{ fontSize: 15, color: "#FFA41B",fontFamily: 'PoppinsMedium'}}>{Math.ceil(list.length/3)}</Text>
            </View>
            <View style={{ marginLeft: 10 }}>
              <Pressable onPress={btnRelod}>
                <FontAwesomeIcon icon={faRetweet} size={22} color="#FFA41B"/>
                {/* <Image source={require("./image/relod.png")} style={{ height: 21, width: 20 }} /> */}
              </Pressable>
            </View>
          </View>
          <DescriptionKomik />
        </View>
    )
}

const style = StyleSheet.create({
    titleSize: {
        fontSize: 22,
        color: "#6B7280",
        marginBottom: 5,
        marginLeft: 2,
        marginBottom: 7,
        fontFamily: 'PoppinsMedium'
      }
})

export default ForYou;