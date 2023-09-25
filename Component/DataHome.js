import { View,Pressable, Text, FlatList,Image } from "react-native";
import { useState,useEffect } from "react";
import { getData } from "../Storage";
const DataHome = ({navigation}) => {
    const [data, setData] = useState();
    const hendler = async () => {
        const data = await getData();
        setData(data)
      }
    useEffect(() => {
     
      hendler();
    },[])
    return (
        <View>
            <Pressable onPress={() => navigation.navigate("Home")}>
                <Text>to Home</Text>
            </Pressable>
            <Pressable onPress={hendler}>
                <Text>Open up App.js to start!</Text>
            </Pressable>
            <View style={{ height: 500 }}>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ backgroundColor: "#C51605", height: 120, width: 600, marginBottom: 20 }}>
                                <Image source={{ uri: item }} style={{ height: 120, width: 600 }} />
                            </View>
                        )
                    }}
                />
            </View>
        </View>
    )
}


export default DataHome;