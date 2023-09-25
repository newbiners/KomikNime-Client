import { View, Text, TextInput, Pressable,StyleSheet } from "react-native";

const TextInputItem = ({ title, placeholder, secureTextEntry, onChange, password, show, value}) => {
    return (
        <View style={{marginBottom : 35, marginHorizontal : 10}}>
            <Text style={styles.textStyle}>{title} :</Text>
            <View style={styles.boxTextInput}>
                <TextInput placeholder={placeholder} secureTextEntry={secureTextEntry} value={value} style={{fontSize : 15, fontFamily : 'PoppinsMedium'}} onChangeText={onChange} />
                {password &&
                    <Pressable onPress={show}>
                        <Text>Show</Text>
                    </Pressable>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle : {
        fontSize : 20,
        fontFamily : 'PoppinsSemiBold',
        color : "#FF8038"
    },
    boxTextInput : {
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
        paddingVertical : 5,
        borderBottomWidth : 3,
        borderColor : "#F5F5F5",
        marginHorizontal : 7
    }
})
export default TextInputItem;