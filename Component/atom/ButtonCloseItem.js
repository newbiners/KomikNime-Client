import { View, Pressable, Text, StyleSheet, Image } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
const ButtonCloseItem = ({ title, isTitleShow, onPress }) => {
    return (
        <View style={styles.boxButtonCloseItem}>
            <Pressable onPress={onPress}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} size={25} color="grey" style={{ transform: [{ scaleX: -1 }], marginRight : 8}}/>
            </Pressable>
            {isTitleShow &&
                <Text style={styles.textStyle}>{title}</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    boxButtonCloseItem: {
        marginBottom: 10,
        marginTop: 30,
        alignItems: "center",
        flexDirection: "row",
        marginLeft: 10
    },
    textStyle: {
        fontSize: 20,
        fontFamily: 'PoppinsMedium',
        color: "#FF8038"
    }
})

export default ButtonCloseItem;