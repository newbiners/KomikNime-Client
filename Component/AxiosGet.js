import { FlatList,View, Text, Pressable} from "react-native";
import axios from "axios";
import { useState } from "react";
const AxiosGet = () => {
const [data, setData] = useState();
    const axiosget = async() => {
        try{
            const {data} = await axios.get("https://komiknime.mitrasurya.dev/api//comic/findAll")
            console.log(data)
            setData(data.data)
        }catch(error){
            console.log(error)
        }
    }

    return(
<View>
    <Pressable onPress={axiosget}>
        <Text>tekan dong</Text>
    </Pressable>
    <FlatList
    data={data}
    keyExtractor={(item, index) => item._id}
    renderItem={({item}) => {
        return(
            <View>
                <Text>{item._id}</Text>
            </View>
        )
    }}
    />
</View>
    )
}

export default AxiosGet;