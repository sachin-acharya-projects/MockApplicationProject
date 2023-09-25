import {
    requestCameraPermissionsAsync,
    launchCameraAsync,
    MediaTypeOptions,
} from "expo-image-picker"
import { Dimensions } from "react-native"

export async function getCameraPermission() {
    const cameraStatus = await requestCameraPermissionsAsync()
    return cameraStatus.granted
}

export async function openCamera() {
    let result = await launchCameraAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
    })

    if (!result.canceled) {
        return {
            uri: result.assets[0].uri,
            height: Dimensions.get("screen").height,
            width: Dimensions.get("screen").width,
        }
    }
    return null
}
