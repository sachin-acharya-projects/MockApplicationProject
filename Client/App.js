import { View, Text, StyleSheet, ActivityIndicator } from "react-native"
import { useFonts } from "expo-font"
import { StatusBar } from "expo-status-bar"
import { Navigation } from "./apps/Components"

export default function App() {
    const [isFontLoaded] = useFonts({
        Poppins: require("./apps/assets/fonts/Poppins-Regular.ttf"),
        Black: require("./apps/assets/fonts/Poppins-Black.ttf"),
        Medium: require("./apps/assets/fonts/Poppins-Medium.ttf")
    })

    return (
        <View style={{ flex: 1 }}>
            {isFontLoaded ? <Navigation /> : <LoadingScreen />}
            <StatusBar style="auto" />
        </View>
    )
}

function LoadingScreen() {
    return (
        <View style={style.container}>
            <ActivityIndicator color={"orange"} size={120} />
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: 900,
                    marginTop: 10,
                }}
            >
                Downloading Fonts.
            </Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})
