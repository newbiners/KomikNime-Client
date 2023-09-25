import { View, Text, Pressable, StyleSheet, Dimensions, FlatList, ScrollView, ActivityIndicator, Image } from "react-native";
import axios from "axios";
import HomePage from "./atom/HomePage";
import EpisodeCard from "./atom/EpisodeCard";
import { useEffect, useState, useRef, useCallback } from "react";
import { API_URL, ENVIRONMENT } from '@env';
import TextItemSearch from "./atom/TextItemSearch";
import TitleMenuEXplor from "./atom/TitleMenuExplor";
import CategoryFilter from "./CategoryFilter";
import RecomendedFilter from "./RecomendedFilter";
import ForYou from "./ForYou";
import FooterScreen from "./atom/FooterScreen";
import TopGenre from "./TopGenre";
import * as Font from 'expo-font';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Home = ({ navigation }) => {

  const [list, setList] = useState([]);
  const { height, width } = Dimensions.get("window");
  const [dataActive, setDataActive] = useState(false);


  if (height > 800) {
    heightScreen = 550;
  } else if (height > 710) {
    heightScreen = 350;
  } else {
    heightScreen = 128;
  }

  const getComicHandler = async () => {
    try {
      setDataActive(false)
      const { data } = await axios.get(API_URL + '/comic/findAll');
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



  ///
  const DataHomeHendler = ({ item }) => {
    if (dataActive) {
      return <HomePage item={item} onPress={() => navigation.navigate("episodeScreen", {
        id: item._id
      })} />
    } else {
      return (
        <View style={{ backgroundColor: "#ffff", height : 250, width: width, elevation: 8}}>
          <View style={{ marginTop: 120 }}>
            <ActivityIndicator size="large" color="#F86F03" />
          </View>
        </View>
      )
    }
  }

  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'PoppinsReguler':  require('../assets/fonts/Poppins-Regular.ttf'),
        'PoppinsMedium': require('../assets/fonts/Poppins-Medium.ttf'),
        'PoppinsSemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'PoppinsBold' : require('../assets/fonts/Poppins-Bold.ttf'),
        'PoppinsBoldItalic' : require('../assets/fonts/Poppins-BoldItalic.ttf'),
      });

      setFontLoaded(true);
    }

    loadFont();
  }, []);

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView>
      <View>
        {list &&
          <FlatList
            data={list.slice(0, 3)}
            renderItem={({ item }) => {
              return (
                <DataHomeHendler item={item} />
              )
            }}
            keyExtractor={(item) => item._id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
          />
        }
        <View style={style.containerHome}>
          <View style={{ width: "65%" }}>
            <Text style={{ fontSize: 18,fontFamily : 'PoppinsSemiBold', color: "grey"}}>Temukan segala jenis komik di{" "}<Text style={{color : "#FFA41B"}}>komikNime</Text></Text>          
          </View>
          <View style={{ marginTop: 15 }}>
            <TextItemSearch isHomeScreen={true} onPress={() => navigation.navigate("Explore")} />
          </View>
        </View>
        <View style={{ marginTop: 10, marginHorizontal: 7 }}>
          <TitleMenuEXplor title={"Recomended"} />
          <RecomendedFilter item={list} navigation={navigation} />
        </View>
        <View>
        </View>
        <ForYou navigation={navigation} />
          <TopGenre navigation={navigation}/>
        <View style={{ marginTop: 10 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TitleMenuEXplor title={"Top Anime"} />
            <FontAwesomeIcon icon={faArrowRight} size={20} color="#D8D9DA" style={{marginRight : 20}}/>
          </View>
          <CategoryFilter filter={"64d4f71c51b1bc244f13e471"} navigation={navigation} />
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TitleMenuEXplor title={"Top Manhua"} />
            <FontAwesomeIcon icon={faArrowRight} size={20} color="#D8D9DA" style={{marginRight : 20}}/>
          </View>
          <CategoryFilter filter={"64d6e28a51b1bc244f13f1c7"} navigation={navigation} />
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TitleMenuEXplor title={"Top Manhwa"} />
            <FontAwesomeIcon icon={faArrowRight} size={20} color="#D8D9DA" style={{marginRight : 20}}/>
          </View>
          <CategoryFilter filter={"64d70abf769de235a23da857"} navigation={navigation} />
        </View>
        <View>
        <FooterScreen/>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  containerHome: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 7,
    marginHorizontal: 8,
    alignItems: "center",
  },
  textHomePage: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#374151"
  },
  titleSize: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#6B7280",
    marginBottom: 5,
    marginLeft: 2,
    marginBottom: 7

  }
})

export default Home;