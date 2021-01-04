import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default StyleSheet.create({

    container: {
        paddingHorizontal: hp('2%')
    },
    imageContain:{
        height:'100%',
        width:'100%',
        resizeMode:'contain'
    }

})