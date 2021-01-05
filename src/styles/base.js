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
    },
    customInput:{
        height: hp('5%'),
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: hp('1%')
    },
    boxTextBorder:{
        borderTopColor:'#B5B5B5',
        borderTopWidth:1,
    },
    textOnBorder:{
        backgroundColor:'white',
        position:'absolute',
        top:-13,
        paddingHorizontal:hp('2%')
    }

})