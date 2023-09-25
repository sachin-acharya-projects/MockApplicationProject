import AsyncStorage from "@react-native-async-storage/async-storage"

class LocalStorage {
    static async getItem(name, callback = undefined) {
        return await AsyncStorage.getItem(name, callback)
    }

    static async setItem(name, value, callback = undefined) {
        return await AsyncStorage.setItem(name, value, callback)
    }

    static async deleteItem(name, callback = undefined) {
        return await AsyncStorage.removeItem(name, callback)
    }
}

export default LocalStorage
