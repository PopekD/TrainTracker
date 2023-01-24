import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#32796D',
    },
    languages: {
        justifyContent: 'flex-start',
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'row',
        padding: 5
    },
    PressLang: {
        padding: 10
    },
    MainMenuBack: {
        position: "absolute",
        right: 0,
        justifyContent: "center",
    },
    search: {
        flex: 6,
        alignItems: 'center',
        justifyContent: "center"
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 20,
        marginTop: 20,
        backgroundColor: '#33A850',
    },
    CommuterTrains: {
        paddingVertical: 20,
        paddingHorizontal: 80,
        borderRadius: 20,
        marginVertical: 15,
        backgroundColor: '#DDFFEE',
    },
    NormalTrains: {
        paddingVertical: 20,
        paddingHorizontal: 45,
        borderRadius: 20,
        backgroundColor: '#DDFFEE',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
        textAlign: 'center'
    },
    input: {
        width: 300,
        height: 50,
        backgroundColor: '#DDFFEE',
        fontSize: 20,
        textAlign: 'center',
        borderRadius: 15,
    },
    searchInput: {
        width: "100%",
        height: 50,
        marginVertical: 10,
        backgroundColor: '#DDFFEE',
        fontSize: 20,
        textAlign: 'center',
        borderRadius: 15,
    },
    NameDisplay: {
        width: "100%",
        height: 50,
        marginVertical: 10,
        fontSize: 25,
        textAlign: 'center',
        color: "white",
        borderRadius: 15,
    },
    help: {
        flex: 1,
        flexDirection: 'row',
    },
    helpButton: {
        height: 55,
        width: 55,
        padding: 15,
        bottom: 10,
        right: 10,
        position: "absolute",
        textAlign: 'center',
        borderRadius: 45,
        backgroundColor: '#33A850',
    },
    Modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    modalExitButton: {
        justifyContent: 'flex-end',
        borderRadius: 45,
        backgroundColor: '#33A850',
        height: 55,
        width: 55,
        padding: 15,
        textAlign: 'center',
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
        height: 350,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        flex: 1
    },
    trainView: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: "flex-end",
    },
    mapButton: {
        fontSize: 18,
        lineHeight: 21,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    mapButtonOverlay: {
        height: 40,
        width: 40,
        padding: 9,
        textAlign: 'center',
        borderRadius: 20,
        backgroundColor: '#33A850',
    },
    lottie: {
        flex: 1
    },



});