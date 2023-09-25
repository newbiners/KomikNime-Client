import React, { useState, useEffect } from "react";
import { View, Text, Pressable,StyleSheet } from "react-native";
import { SetDataSearch } from "../state/SetDataSearch";
import { SetDataValue } from "../state/SetDataValue";
import { useRecoilState } from "recoil";
import { SetColorIndicatorActiveExplor } from "../state/SetColorIndicatorActiveExplor";
import axios from "axios";
import { API_URL, ENVIRONMENT } from '@env';
const CategoryHandler = ({ item }) => {
 
  const [dataPencarian, setDataPencarian] = useRecoilState(SetDataSearch);
 const [data, setData] = useRecoilState(SetDataValue)
 const [color, setColor] = useRecoilState(SetColorIndicatorActiveExplor)



  return (
    <View style={[style.boxCategory,(color == item._id ? {backgroundColor : "#FFA41B"} : {backgroundColor : "transparent"})]} key={item._id}>
      <Text style={[{fontFamily : 'PoppinsReguler'},(color == item._id ? {color : "#FFFF"} : {color : "#FFA41B"}) ]}>{item && item?.name}</Text>
    </View>
  );
};
const style = StyleSheet.create({
  boxCategory: {
    width: 100,
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth : 1,
    
  }
})
export default CategoryHandler;
