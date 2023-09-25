import { useState, useEffect, useRef } from 'react';
import { Text, View, Pressable, Image, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import axios from 'axios';
import { API_URL, ENVIRONMENT } from '@env';
import { getData } from './state/Storage';
import { ScrollView } from 'react-native';
import ChapterHendler from './ChapterHendler';
import { useRecoilState } from 'recoil';
import { SetImageComic } from './state/SetImageComic';
import { SetDataComic } from './state/SetDataComic';
import { SetIsIndicator } from './state/setIsIndicator';
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import MoveChapter from './MoveChapter';
import { SetChapterId } from './state/SetChapterid';
const EpisodeDetailScreen = ({ navigation, route }) => {
  const { height, width } = Dimensions.get("window");
  const { id } = route.params;
  console.log(id, "dididi")
  const [dataComik, setDataComik] = useRecoilState(SetDataComic);
  const [imageComik, setImageComik] = useRecoilState(SetImageComic);
  const [isIndicator, setIsIndicator] = useRecoilState(SetIsIndicator);
  const [chapterId, setChapterId] = useRecoilState(SetChapterId);
  const episodeDetaildate = async () => {
    const token = await getData();
    const header = `bearerCode ${token}`;
    setIsIndicator(false)
    console.log(process.env.API_URL)
    const { data: respon } =  await axios.get(`${API_URL}/chapters/findOne/${id}`,null,{
  headers: { Authorization: header }
})
console.log(respon.data, "reessss pomnsnad")
    setDataComik(respon.data);
    const linkImage = JSON.parse(respon?.data?.linkImage);
    setImageComik(linkImage);
    setTimeout(() => {
      setIsIndicator(true);
    }, 1000);
  }

  useEffect(() => {
    episodeDetaildate();
  }, [])

  const EpisodeDetailHendler = ({ item }) => {
    if (isIndicator) {
      return (
        <View key={item._id}>
          <Image
            source={{ uri: item }}
            style={{
              width: width ,
              height: width * 4.8,
              resizeMode : "stretch"
            }}
          />
        </View>
      )
    } else {
      return (
        <View style={{ alignItems: "center", justifyContent: "center" }} key={item._id}>
          <View style={{ margin: 70 }}>
            <ActivityIndicator size="large" color="#F86F03" />
          </View>
        </View>
      )
    }
  }

  const goBackHendler = () => {
setChapterId(null)
 navigation.goBack()
  }

  return (
    <View>

      <ScrollView>
        <View style={{ backgroundColor: '#EEEEEE', shadowColor: 'black', shadowOffset: { width: 0, height: 25 }, shadowOpacity: 0.5, shadowRadius: 4, elevation: 5, width: '100%', paddingTop: 20, paddingLeft: 10, top: 0 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30, marginBottom: 10 }}>
            <Pressable onPress={goBackHendler} style={{marginRight : 10}}>
              <FontAwesomeIcon icon={faRightFromBracket} size={25} color="#FFA41B" style={{ transform: [{ scaleX: -1 }] }} />
            </Pressable>
            <View style={{marginRight : 20}}>
            <Text style={{ fontSize: 17, color: "#FFA41B", fontFamily: 'PoppinsSemiBold' }}>{dataComik && dataComik.title}</Text>
            </View>
            <ChapterHendler chapter_id={id} />
          </View>
        </View>
        <View>
          <View>
            {imageComik && imageComik.map((item) => {
              return (
                <View key={item._id}>
                  <EpisodeDetailHendler item={item} />
                </View>
              )
            })
            }
          </View>
        </View>

        <View style={[{ backgroundColor: '#EEEEEE', zIndex: 999, position: 'absolute', bottom: 0, width: width, elevation: 60 }]}>
          <View style={{ height: 60, marginLeft: 10, flexDirection :"row",alignItems : "center", justifyContent : "space-between"}}>
            
            <ChapterHendler chapter_id={id} />
          
            <MoveChapter chapter_id={id} />
          </View>
        </View>
      </ScrollView>

    </View>
  );
};

export default EpisodeDetailScreen;

