import { StyleSheet, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../constant/util'

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
        borderColor: '#CADAFB',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: hp('1%'),
        backgroundColor: '#F9FCFF',
        padding: Platform.OS === 'ios' ? hp('1.3%') : hp('1%')
    },
    input: {
        padding: 0,
        fontSize: hp('2%'),
        color: 'rgba(0,0,0,0.16)',
    },
    btnPrimary: {
        backgroundColor: colors.primary
    },
    btnPrimaryOutline: {
        backgroundColor: 'white',
        borderColor: '#003764',
        borderWidth: 1,
    },
    btnRounded: {
        borderRadius: 30
    },
    btnFacebook: {
        backgroundColor: '#4267B2'
    },
    btnLine: {
        backgroundColor: '#22BA4F'
    },
    btnGoogle: {
        backgroundColor: '#FF0000'
    },
    btnTagPrimary: {
        backgroundColor: colors.primary,
        paddingHorizontal: hp('1.5%'),
        paddingVertical: hp('0.5%'),
        marginRight: hp('1%')
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: hp('2%'),
        paddingVertical: hp('1.5%'),
        backgroundColor: colors.primary,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
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
    btnCreateNewBlog: {
        padding: hp('1.5%'),
        width: '50%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 10,
        width: '100%'
    },
    textCreateNewBlog: {
        fontSize: hp('2%'),
        fontWeight: "300",
        textAlign: 'center',
        color: '#003764',
    }
})