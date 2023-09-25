import { View, Animated, Text , StyleSheet} from "react-native";
import { useState, useEffect } from "react";
// import {ButtonCloseItem, TextInputItem, ButtonCard} from "./atom";
import ButtonCloseItem from "./atom/ButtonCloseItem";
import TextInputItem from "./atom/TextInputItem";
import ButtonCard from "./atom/ButtonCard";
// import TextInputI
// import { postRegister } from "./_services/userServices";
// import {useRecoilState } from "recoil";
// import { setFormLogin} from "./_state/setFormLogin";
// import { setFormRegistrasi } from "./_state/setFormRegistrasi";
import { API_URL, ENVIRONMENT } from '@env';
import axios from "axios";
const FormRegistrasi = ({ position, moveComponent,moveComponentLogin,btnMoveRegisToLogin }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(true);
    const [restpond, setRestpond] = useState('');

    const btnRegister = async() => {
        try{
        const {data} = await axios.post(API_URL + "/user/register",{username, email, password})
        if(data){
        setRestpond("registrasi berhasil silahkan login");
        }
        }catch(error) {
            console.log(error, "error")
        }
    }

    const btnShowPassword = () => {
        setShow(!show);
    }




    return (
        <Animated.View style={[{ height: '150%', width: "100%", position: "absolute", marginTop: 100 }, position]}>
            <View style={styles.boxFormRegister}>
                <ButtonCloseItem onPress={moveComponent} title={"Sign Up"} isTitleShow={true} />
                <View className="mx-3">
                    <TextInputItem title={"Name"} placeholder={"input Your name"} value={username} onChange={(item) => setUsername(item)}/>
                    <TextInputItem title={"Email"} placeholder={"input your email"} value={email} onChange={(item) => setEmail(item)}/>
                    <TextInputItem title={"Password"} secureTextEntry={show} placeholder={"input your paswword"} value={password} show={btnShowPassword} password={true}  onChange={(item) => setPassword(item)} />
                    <View style={{marginTop : 20}}>
                        <View style={{alignItems : "center"}}>
                        <ButtonCard isPrimery={true} title={"Register"} onPress={btnRegister} />
                        <ButtonCard isButtonForm={true} title={"Login"} onPress={btnMoveRegisToLogin} />
                        </View>
                        <View style={{alignItems : "center"}}>
                            <Text style={{fontSize : 20, color : "orange"}} >{restpond}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Animated.View>
    )
}
const styles = StyleSheet.create({
    boxFormRegister : {
        backgroundColor : "#FFFF",
        elevation : 8,
        shadowColor : "#0000",
        shadowOpacity : 0.8,
        height : "100%",
        width : "100%",
        borderTopStartRadius : 30,
        borderTopEndRadius : 30
    }
})
export default FormRegistrasi;