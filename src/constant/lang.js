import { th } from './th'
import { en } from './en'
import AsyncStorage from '@react-native-async-storage/async-storage'

const translate = async () => {
    const lng = await AsyncStorage.getItem('default_language')
    if (lng == 'th') {
        return th;
    } else {
        return en;
    }
}

export default translate