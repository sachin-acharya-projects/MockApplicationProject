import * as Google from "expo-auth-session/providers/google"
import * as WebBrowser from "expo-web-browser"

import { AntDesign } from "@expo/vector-icons"
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native"
import React, { useEffect, useContext } from "react"

import { authClient, GOOGLE_USER_QUERY, LocalStorage } from "../Utility"
import { Context } from "../Context"

WebBrowser.maybeCompleteAuthSession()
export default function Account({ navigation }) {
    const context = useContext(Context)

    useEffect(() => {
        // console.log("Account", context.userInfo)
        if (context?.userInfo) {
            navigation.navigate("Home")
        }
    }, [context?.userInfo])

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: authClient.android.client_id,
        webClientId: authClient.web.client_id,
    })

    useEffect(() => {
        handleSignInWithGoogle()
    }, [response])

    async function handleSignInWithGoogle() {
        const user = await LocalStorage.getItem("@user")
        if (!user) {
            if (response?.type === "success") {
                await getUserInfo(response.authentication.accessToken)
            }
        } else {
            context.setUserInfo(JSON.parse(user))
        }
    }

    async function getUserInfo(token) {
        if (!token) return
        try {
            const response = await fetch(GOOGLE_USER_QUERY, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            const user = await response.json()
            await LocalStorage.setItem("@user", JSON.stringify(user))
            context?.setUserInfo(user)
        } catch (error) {
            // Handle Error
        }
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
            }}
        >
            <View
                style={{
                    display: "flex",
                    gap: 20,
                }}
            >
                <TouchableOpacity
                    onPress={() => promptAsync()}
                    style={styles.button}
                    activeOpacity={0.9}
                >
                    <View style={styles.buttonView}>
                        <AntDesign
                            name="google"
                            size={24}
                            color="black"
                            style={styles.buttonIcon}
                        />
                        <Text style={styles.buttonText}>
                            Sign-in with Google
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() =>
                        Alert.alert(
                            "Feature Not Found",
                            "This feature is not implemented yet! It will be implemented soon! Stay Tuned"
                        )
                    }
                    style={styles.button}
                    activeOpacity={0.9}
                >
                    <View style={styles.buttonView}>
                        <AntDesign
                            name="apple1"
                            size={24}
                            color="black"
                            style={styles.buttonIcon}
                        />
                        <Text style={styles.buttonText}>
                            Sign-in with Google
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 200,
        height: 50,
        padding: 10,
        backgroundColor: "dodgerblue",
        borderRadius: 5,
    },
    buttonView: {
        flexDirection: "row",
        height: "100%",
        width: "100%",
        alignItems: "center",
        gap: 5,
    },
    buttonIcon: {
        color: "#E4E4E4",
    },
    buttonText: {
        color: "#E4E4E4",
        fontFamily: "Medium",
        marginTop: 2,
    },
})
