import { View,Text,StyleSheet } from "react-native"

DescriptionKomik = () => {
    return(
        <View style={{marginTop : 30, margin : 20}}>
            <View>
                <Text style={styles.textStyle}>KomikNime</Text>
            </View>
            <Text style={{color : "grey",fontFamily: 'PoppinsMedium', fontWeight : "600"}}> Nikmati komik terbaru dan terlengkap dengan KomikNime - aplikasi komik unggulan! Temukan ratusan judul menarik dari berbagai genre. Dapatkan pengalaman membaca yang seru dan mengasyikkan di genggaman tangan Anda.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle : {
        fontSize : 25,
        color : "#FFA41B",
        marginBottom : 0,
        fontFamily: 'PoppinsBoldItalic'
    }
})

export default DescriptionKomik;