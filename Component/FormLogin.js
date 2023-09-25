import { View, Animated, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { useState } from "react";
import ButtonCard from "./atom/ButtonCard";
import TextInputItem from "./atom/TextInputItem";
import ButtonCloseItem from "./atom/ButtonCloseItem";
// import { setDataToken} from "./memory/tokenMemory";
// import { useData } from "./_state/DataContext";
// import { dataActive } from "./_state/dataActive";
// import { SetFormRegistrasi } from "./state/SetFormRegistrasi";
import axios from "axios";
import { storeData } from "./state/Storage";
import { API_URL, ENVIRONMENT } from '@env';
import { useRecoilState } from "recoil";
import { SetToAfter } from "./state/SetToAfter";
import { SetRemoveUser } from "./state/SetRemoveUser";
const FormLogin = ({ position, moveComponent, navigation, btnLoginToRegister }) => {
  // const { dataToSend, setDataToSend } = useData();
  const [dataAct, setDataAct] = useRecoilState(SetToAfter);
  const [removeData, setRemoveData] = useRecoilState(SetRemoveUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(true);
  const [restpond, setRestpond] = useState('');
  const btnShowPassword = () => {
    setShow(!show);
  }

  const btnHendler = async () => {
    try {
      console.log("data ini data")
      const { data } = await axios.post(API_URL + "/user/login", { email: email, password: password });
      setDataAct(true)
      if (data != null) {
        await storeData(data.token);
        setTimeout(() => {
          setDataAct(false)
          setRemoveData("login berhasi")
        }, 2000);
      }
      

      setEmail("");
      setPassword("");
    } catch (error) {
      setRestpond("invalid email or password");
      console.log(error);
    }
  };


  return (
    <Animated.View
      style={[
        {
          height: "150%",
          width: "100%",
          position: "absolute",
          marginTop: 100,
        },
        position,
      ]}
    >
      <View style={styles.boxFormLogin}>
        <ButtonCloseItem
          title={"Login"}
          isTitleShow={true}
          onPress={moveComponent}
        />
        <View className="mx-3">
          <View style={{ alignItems: "center" }}>
            <Image source={require("./image/icon.png")} style={{ height: 130, width: 130, marginBottom: 20 }} />
            <Text>{restpond}</Text>
          </View>
          <TextInputItem
            title={"Email"}
            placeholder={"input email        "}
            value={email}
            onChange={(item) => setEmail(item)}
          />
          <TextInputItem
            title={"Password"}
            placeholder={"input your password         "}
            onChange={(item) => setPassword(item)}
            password={true}
            value={password}
            show={btnShowPassword}
            secureTextEntry={show}
          />
          <View style={{ alignItems: "center" }}>
            <ButtonCard isPrimery={true} title={"Login"} onPress={btnHendler} />
            <ButtonCard isButtonForm={true} title={"Register"} onPress={btnLoginToRegister} />
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 7, color: "#FF8038" }}>{restpond}</Text>
          </View>
        </View>

      </View>
    </Animated.View>
  );
};


const styles = StyleSheet.create({
  boxFormLogin: {
    backgroundColor: "#FFFF",
    elevation: 8,
    shadowColor: "#0000",
    shadowOpacity: 0.8,
    height: "100%",
    width: "100%",
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,

  }
})

export default FormLogin;
