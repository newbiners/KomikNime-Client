import { View, Text, StyleSheet, Image } from "react-native";
import ButtonCard from "./atom/ButtonCard";

const UserBeforeLogin = ({ moveComponent, moveComponentLogin }) => {
    return (
        <View>
            <View style={{ alignItems: "center",height : 800, justifyContent : "center" }}>
            <Image source={require("./image/icon.png")} style={{ height: 130, width: 130, marginBottom: 20 }} />
            <View style={{ marginBottom: 10 }}>
                <Text style={style.fontStyle}>If you are not logged into your account, please log in first</Text>
            </View>
            <View style={{ marginBottom: 15, alignItems: "center" }}>
                <Text style={style.fontStyle}>If you already have an account</Text>
                <ButtonCard onPress={moveComponent} isPrimery={true} title={"Register"} />
            </View>
            <View style={{ alignItems: "center" }}>
                <Text style={style.fontStyle}>If you already have an account</Text>
                <ButtonCard title={"Login"} isButtonForm={true} onPress={moveComponentLogin} />
            </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    fontStyle: {
        fontSize: 20,
        alignItems: "center",
        color: "#F2BE22",
        textAlign: "center",
        marginBottom: 20,
        width: 300
    }
})

export default UserBeforeLogin;