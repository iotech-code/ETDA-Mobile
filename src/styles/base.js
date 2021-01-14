import { StyleSheet, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default StyleSheet.create({

    container: {
        paddingHorizontal: hp('2%')
    },
    imageContain: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    },
    customInput: {
        height: hp('5%'),
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: hp('1%')
    },
    boxTextBorder: {
        borderTopColor: '#B5B5B5',
        borderTopWidth: 1,
    },
    textOnBorder: {
        backgroundColor: 'white',
        position: 'absolute',
        top: -13,
        paddingHorizontal: hp('2%')
    },
    marginHeaderStatusBar: {
        paddingTop: Platform.OS === 'ios' ? hp('4.5%') : 0
    },
    divider: {
        borderBottomColor: 'rgba(0,0,0,0.16)',
        borderBottomWidth: 1
    },
    tagActive: {
        padding: hp('1%'),
        borderColor: '#003764',
        borderWidth: 1,
        backgroundColor: "#003764",
        marginRight: hp('1%')
    },
    textTagActive: {
        color: 'white',
        fontSize: hp('2%')
    },
    tag: {
        padding: hp('1%'),
        borderColor: '#003764',
        borderWidth: 1,
        backgroundColor: "white",
        marginRight: hp('1%')
    },
    textTag: {
        color: '#003764',
        fontSize: hp('2%')
    },
    btnCreateNewBlog:{
        padding: hp('1.5%'),
        width: '50%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#003764',
        width: '100%'
    },
    textCreateNewBlog:{
        fontSize: hp('2%'),
        fontWeight: "300",
        textAlign: 'center',
        color: '#003764',
    }
})