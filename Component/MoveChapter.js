import axios from "axios";
import { API_URL, ENVIRONMENT } from '@env';
import { useEffect, useState } from "react";
import { View, Pressable } from "react-native";
import { useRecoilState } from "recoil";
import { SetDataChapter } from "./state/SetDataChapter";
import { SetDataComic } from "./state/SetDataComic";
import { SetImageComic } from "./state/SetImageComic";
import { SetIsIndicator } from "./state/setIsIndicator";
import { getData } from "./state/Storage";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { SetChapterId } from './state/SetChapterid';
const MoveChapter = ({chapter_id}) => {
    const [dataChapter, setDataChapter] = useRecoilState(SetDataChapter);
    const [dataComik, setDataComik] = useRecoilState(SetDataComic);
    const [imageComik, setImageComik] = useRecoilState(SetImageComic);
    const [isIndicator, setIsIndicator] = useRecoilState(SetIsIndicator);
    const [indexData, setIndexData] = useState()
    const [chapterId, setChapterId] = useRecoilState(SetChapterId);
    const chapterIndex = () => {
        for(let i = 0; i < dataChapter.length; i++){
            if(dataChapter && dataChapter[i]._id == (chapterId != null ? chapterId : chapter_id)){
                console.log(dataChapter[i]._id, "========================>",chapterId )
                setIndexData(i)        
            }
        }
    }
    let value = indexData;
    const valueDataMin = async() => {
        value = value - 1
        if(value > -1){
        try{
            const token = await getData();
            const header = `bearerCode ${token}`;
            setIsIndicator(false)
            const { data } = await axios.get(API_URL + `/chapters/findOne/${dataChapter && dataChapter[value]._id }`, null, { headers: { Authorization: header } });
            setDataComik(data.data);
            setChapterId(data.data._id)
            const linkImage = JSON.parse(data.data.linkImage);
            setImageComik(linkImage);
            setTimeout(() => {
              setIsIndicator(true);
            }, 1000);
        }catch(error){
            console.log(error)
        }         
    }else{
        value = 0
    }
    setIndexData(value)
    }
    const valueDataPlus = async() => {
        value = value + 1
        if(value < dataChapter.length){
        try{
            const token = await getData();
            const header = `bearerCode ${token}`;
            setIsIndicator(false)
            const { data } = await axios.get(API_URL + `/chapters/findOne/${dataChapter && dataChapter[value]._id }`, null, { headers: { Authorization: header } });
            setDataComik(data.data);
            setChapterId(data.data._id)
            const linkImage = JSON.parse(data.data.linkImage);
            setImageComik(linkImage);
            setTimeout(() => {
              setIsIndicator(true);
            }, 1000);
        }catch(error){
            console.log(error)
        }         
    }else{
        value = dataChapter.length - 1
    }
    setIndexData(value)
    }
// console.log(dataComik && dataComik , "===========>datacomic id")
    useEffect(() => {
        chapterIndex()
    },[])
    useEffect(() => {
        chapterIndex()
    },[chapterId])
    return(
        <View style={{flexDirection : "row"}}>
            <Pressable onPress={valueDataMin}>
            <FontAwesomeIcon icon={faPlay} size={29} color="#FFA41B" style={{ transform: [{ scaleX: -1 }],marginRight : 20}}/>
            </Pressable>
            <Pressable onPress={valueDataPlus}>
            <FontAwesomeIcon icon={faPlay} size={29} color="#FFA41B" style={{marginRight : 18}}/>
            </Pressable>
        </View>
    )
}

export default MoveChapter;