import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { View, Text, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { FavoriteIndicator } from '../state/FavoriteIndcator';
import { SetDataFavorite } from '../state/SetDataFavorite';
import { useRecoilState } from 'recoil';
import { getData } from '../state/Storage';
import axios from 'axios';
import { API_URL, ENVIRONMENT } from '@env';
const ButtonFavorite = ({item, id}) => {
    const [indicator, setIndicator] = useRecoilState(FavoriteIndicator);
    const [dataFavorite, setDataFavorite] = useRecoilState(SetDataFavorite);
    const [dataLove, setDataLove] = useState([]);
    const [love, setLove] = useState(false);


    const checkDataFavorite = () => {
        const dataFavoriteValue = dataFavorite && dataFavorite.filter(data => data.dataComic._id === item._id)
        setDataLove(dataFavoriteValue)
        if (dataFavoriteValue != 0) {
            setLove(true)
        }else{
            setLove(false)
        }
    }

    const getFavorite = async () => {

        try {
            const token = await getData();
            const header = `bearerCode ${token}`;
            const { data } = await axios.post(API_URL + `/favorites/create/${item._id}`, null, { headers: { Authorization: header } });
            setIndicator(data)
            
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    }

    const removeFavorite = async () => {
        try {
            const token = await getData();
            const header = `bearerCode ${token}`;
            const { data } = await axios.delete(API_URL + `/favorites/delete/${dataLove && dataLove[0].dataFavorite._id}`, { headers: { Authorization: header } });
            setIndicator(data)
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    }
    const loveHendler = () => {
        setLove(!love)
        if (love) {
            removeFavorite();
        } else {
            getFavorite();
        }
    }
    // useEffect(() => {
    //     checkDataFavorite();
    //     setIndicator("heanderEps")
    // }, [])

    useEffect(() => {
        checkDataFavorite();
        setIndicator(id)
    }, [id])
    return (
        <Pressable onPress={loveHendler}>
            {love ?
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", height: 25, width: 95, backgroundColor: "#FFA41B", borderRadius: 100 }}>
                <View style={{ marginRight: 3 }}>
                    <FontAwesomeIcon icon={faPlus} color="#FFFF" size={20} />
                </View>
                <Text style={{ color: "#ffff", fontFamily: 'PoppinsMedium' }}>Favorite</Text>
            </View>
            :
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", height: 25, width: 95, backgroundColor: "grey", borderRadius: 100 }}>
            <View style={{ marginRight: 3 }}>
                <FontAwesomeIcon icon={faPlus} color="#FFFF" size={20} />
            </View>
            <Text style={{ color: "#ffff", fontFamily: 'PoppinsMedium' }}>Favorite</Text>
        </View>
            }
        </Pressable>
    )
}

export default ButtonFavorite;