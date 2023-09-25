import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
} from "react-native"
import React, { useContext, useEffect, useState } from "react"
import { LocalStorage, getCameraPermission, openCamera } from "../Utility"
import { Context } from "../Context"
import { FontAwesome } from "@expo/vector-icons"

const COVER_IMAGE =
    "https://unsplash.com/photos/id8qpYA0MrY/download?ixid=M3wxMjA3fDB8MXxhbGx8Mnx8fHx8fDJ8fDE2OTUxMjM5MDJ8&force=true&w=2400"
const PROFILE_IMAGE =
    "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80"
const UPLOAD_URL = "http://192.168.1.65:5000" + "/upload"

export default function Home({ navigation }) {
    const context = useContext(Context)
    const [image, setImage] = useState(null)

    useEffect(() => {
        ;(async () => {
            await getCameraPermission()
        })()

        if (!context.userInfo) {
            // console.log("Home", context?.userInfo)
            navigation.navigate("Account")
        }
    }, [])

    async function handleImageCapture() {
        const im = await openCamera()
        if (im) {
            setImage({ ...im })
            console.log({ ...im })
        }
    }

    async function handleLogout() {
        await LocalStorage.deleteItem("@user")
        context.setUserInfo(null)
        navigation.navigate("Account")
    }

    async function handleImageUpload() {
        console.log("Upload Initiated")
        if (image) {
            const ext = image.uri.substring(image.uri.lastIndexOf(".") + 1)
            const filename = image.uri.replace(/^.*[\\\/]/, "")

            const formData = new FormData()
            formData.append("file", {
                uri: image.uri,
                name: filename,
                type: `image/${ext}`,
            })

            await fetch(UPLOAD_URL, {
                method: "POST",
                body: formData,
            })
                .then((data) => data.text())
                .then((data) => {
                    if (data === "success") {
                        Alert.alert(
                            "Success",
                            "File has been uploaded successfully"
                        )
                    }
                })
                .catch((err) => console.error(err))
        }
    }
    return (
        <View style={{ flex: 1 }}>
            <Image
                source={{
                    uri: COVER_IMAGE,
                    height: 250,
                }}
                style={style.image}
            />

            <Image
                source={{
                    uri: context?.userInfo?.picture || PROFILE_IMAGE,
                    width: 120,
                    height: 120,
                }}
                style={style.profile}
            />

            <View>
                <Text style={style.fullname}>{context?.userInfo?.name}</Text>
                <Text style={style.username}>
                    @{context?.userInfo?.email?.replace("@gmail.com", "")}
                </Text>
            </View>

            <View style={style.utility_container}>
                <View style={style.items_container}>
                    <TouchableOpacity
                        style={style.utility_button}
                        onPress={handleImageCapture}
                    >
                        <FontAwesome
                            name="camera"
                            size={70}
                            color={"#333333"}
                        />
                        <Text>Capture Incident</Text>
                    </TouchableOpacity>
                </View>

                {image ? (
                    <View style={style.items_container}>
                        <TouchableOpacity
                            style={style.utility_button}
                            onPress={handleImageUpload}
                        >
                            <FontAwesome
                                name="cloud-upload"
                                size={70}
                                color="#333333"
                            />
                            <Text>Submit Image</Text>
                        </TouchableOpacity>
                    </View>
                ) : null}
            </View>
            <TouchableOpacity style={style.button} onPress={handleLogout}>
                <Text style={style.button_text}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    image: {
        objectFit: "cover",
    },
    profile: {
        marginTop: -50,
        marginLeft: 20,
        borderRadius: 60,
    },
    fullname: {
        fontFamily: "Poppins",
        fontWeight: "900",
        fontSize: 30,
        marginTop: 30,
        textAlign: "center",
    },
    username: {
        textAlign: "center",
        fontFamily: "Poppins",
        marginTop: -10,
    },
    button: {
        alignSelf: "center",
        position: "absolute",
        bottom: 100,
    },
    button_text: {
        padding: 10,
        width: 100,
        backgroundColor: "#1EDFD5",
        textAlign: "center",
        borderRadius: 10,
    },
    utility_container: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginTop: 40,
        gap: 10,
    },
    items_container: {
        justifyContent: "center",
        alignItems: "center",
    },
    utility_button: {
        justifyContent: "center",
        alignItems: "center",
    },
})
