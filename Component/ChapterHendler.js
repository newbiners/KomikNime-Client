import { View, Text } from "react-native";
import { useRecoilState } from "recoil";
import { SetDataChapter } from "./state/SetDataChapter";
import { SetDataComic } from "./state/SetDataComic";
import { SetImageComic } from "./state/SetImageComic";
import { SetIsIndicator } from "./state/setIsIndicator";
import { getData } from "./state/Storage";
import SelectDropdown from "react-native-select-dropdown";
import axios from "axios";
import { API_URL, ENVIRONMENT } from '@env';
import { useEffect, useState } from "react";
import { SetChapterId } from './state/SetChapterid';
const ChapterHendler = ({ chapter_id }) => {
    const [selectedValue, setSelectedValue] = useState('default');
    const [dataChapter, setDataChapter] = useRecoilState(SetDataChapter);
    const [dataComik, setDataComik] = useRecoilState(SetDataComic);
    const [imageComik, setImageComik] = useRecoilState(SetImageComic);
    const [isIndicator, setIsIndicator] = useRecoilState(SetIsIndicator);
    const [indexData, setIndexData] = useState()
    const [chapterId, setChapterId] = useRecoilState(SetChapterId);
    const chapterIndex = () => {
        for (let i = 0; i < dataChapter.length; i++) {
            if (dataChapter && dataChapter[i]._id == (chapterId != null ? chapterId : chapter_id)){
                setIndexData("CHAPTER " + (i + 1))
            }
        }
    }

    const episodeDetaildate = async (id) => {
        const token = await getData();
        const header = `bearerCode ${token}`;
        setIsIndicator(false)
        const { data } = await axios.get(API_URL + `/chapters/findOne/${id}`, null, { headers: { Authorization: header } });
        setDataComik(data.data);
        setChapterId(data.data._id);
        const linkImage = JSON.parse(data.data.linkImage);
        setImageComik(linkImage);
        setTimeout(() => {
            setIsIndicator(true);
        }, 1000);
    }

    useEffect(() => {
        chapterIndex();
    }, [])
    useEffect(() => {
        chapterIndex();
    }, [chapterId])
    console.log(indexData, "===>? index data")
    return (
        <View>
      
                <SelectDropdown
                    data={dataChapter}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index, "index select item")
                        episodeDetaildate(selectedItem._id)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        console.log(selectedItem, "ssssselect")
                        return indexData

                    }}
                    rowTextForSelection={(item, index) => {
                        return item.title
                    }}
                    buttonTextStyle={{ color: "#ffff" }}
                    buttonStyle={{ backgroundColor: "#FFA41B", borderRadius: 10, height: 40, width: 160 }}
                    defaultValueByIndex={indexData }
                />
         
        </View>
    )
}

export default ChapterHendler;