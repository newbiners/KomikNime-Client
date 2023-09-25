import React from "react";
import { View, FlatList, Pressable, Dimensions, ActivityIndicator, ScrollView, RefreshControl,Text,Image } from "react-native";
import { useState, useEffect, useCallback } from "react";
import TitleMenuEXplor from "./atom/TitleMenuExplor";
import RecomendedHendler from "./atom/RecomendedHendler";
import TextItemSearch from "./atom/TextItemSearch";
import ValueDataSearch from "./atom/ValueDataSearch";
import axios from "axios";
import { API_URL, ENVIRONMENT } from '@env';
import { useRecoilState } from "recoil";
import { SetDataSearch } from "./state/SetDataSearch";
import CategoryHandler from "./atom/CategoryHandler";
import DataNotFound from "./atom/DataNotFound";
import FooterScreen from "./atom/FooterScreen";
import NewEpisodeScreen from "./NewEpisodeScreen";
import { SetColorIndicatorActiveExplor } from "./state/SetColorIndicatorActiveExplor";
const ExplorerScreen = ({ navigation }) => {
  const { height } = Dimensions.get('window');
  const [color, setColor] = useRecoilState(SetColorIndicatorActiveExplor)
  const [dataPencarian, setDataPencarian] = useRecoilState(SetDataSearch);
  const [genreCategorys, setGenresCategory] = useState();
  const [type, setType] = useState()
  const [list, setList] = useState();
  const [valueSearch, setValueSearch] = useState();
  const [dataActive, setDataActive] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  if (height > 800) {
    marginBottom = 15;
  } else if (height > 710) {
    marginBottom = 5;
  } else {
    marginBottom = 2;
  }

  const getPerentHendler = async () => {
    try {
      const { data: responCategory } = await axios.get(API_URL + "/categories");
      setGenresCategory(responCategory && responCategory.data)
      const { data: responType } = await axios.get(API_URL + "/types");
      setType(responType && responType.data)
    } catch (error) {
      console.log(error)
    }

  }

  const getComicHandler = async () => {
    try {
      setDataActive(false)
      const response = await axios.get(API_URL + `/comic/findAll?sortData=viewCount`);
      setList(response && response.data.data);
      setValueSearch(response && response.data.data)
      setTimeout(() => {
        setDataActive(true);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const SetRecomendedHendler = ({ item }) => {
    if (dataActive) {
      return(
        <View style={{marginBottom : 15}}>
      <RecomendedHendler item={item} onPress={() => navigation.navigate("episodeScreen", {
        id: item._id
      })} />
      </View> 
      )
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


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getComicHandler()
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  const categorySearch = async(item) => {
    try{
      setDataActive(false)
      setColor('')
      setColor(item._id)
      const {data:respon} = await axios.get(API_URL + `/comic/findAll?sortData=viewCount&category_id=${item._id}`);
      setValueSearch(respon && respon.data)
      setTimeout(() => {
        setDataActive(true);
      }, 1000);
    }catch(error){
      console.log(error)
    }
  }

  const typeSearch = async(item) => {
    try{
      setDataActive(false)
      setColor('')
      setColor(item._id)
      const {data:respon} = await axios.get(API_URL + `/comic/findAll?sortData=viewCount&type_id=${item._id}`);
      setValueSearch(respon && respon.data)
      setTimeout(() => {
        setDataActive(true);
      }, 1000);
    }catch(error){
      console.log(error)
    }
  }



  useEffect(() => {
    getPerentHendler()
    getComicHandler()
  }, [])

  return (
    <View style={{ marginTop: 40 }}>
      <TextItemSearch isTextInputShow={true} />
      {dataPencarian != "" &&
        <ValueDataSearch navigation={navigation} />
      }
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "row" }}>
              {genreCategorys && genreCategorys.map((item) => {
                return (
                  <Pressable onPress={() => categorySearch(item)}>
                    <CategoryHandler item={item} />
                  </Pressable>
                )
              })
              }
            </View>
            <View style={{ flexDirection: "row" }}>
              {type && type.map((item) => {
                return (
                  <Pressable onPress={()=> typeSearch(item)}>
                  <CategoryHandler item={item} />
                  </Pressable>
                )
              })
              }
            </View>
          </View>
        </ScrollView>
        <View >

          {
          valueSearch != 0 ?
            <FlatList
              data={valueSearch}
              keyExtractor={item => item._id}
              renderItem={({ item }) =>
                <SetRecomendedHendler item={item} />
              }
              style={{ marginBottom: marginBottom, marginTop: 25, marginHorizontal: 8 }}
              showsHorizontalScrollIndicator={false}
              numColumns={3}
            /> :
            <DataNotFound/>
          }

        </View>
        <TitleMenuEXplor title={"New Episode"} />
        <View>
          <NewEpisodeScreen navigation={navigation}/>
        </View>
        <View style={{marginBottom : 70}}>
        <FooterScreen/>
        </View>
      </ScrollView>
    </View>
  );
};

export default ExplorerScreen;
