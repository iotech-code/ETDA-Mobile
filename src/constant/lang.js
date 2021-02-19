import {th} from './th'
import {en} from './en'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function tr () {
    const lng = AsyncStorage.getItem('default_language')
    if(lng == 'th') {
        return th;
    } else {
        return en;
    }
}