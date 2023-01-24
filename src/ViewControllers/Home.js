import React, { useState, useRef } from 'react';
import {
    Pressable,
    Text,
    TextInput,
    View,
    SafeAreaView,
    Image,
    Keyboard,
    TouchableWithoutFeedback,
    StatusBar,
    Animated,
    useColorScheme
} from 'react-native';
import { FlashList } from "@shopify/flash-list";
import style from '../styles/styles'
import { useNavigation } from '@react-navigation/native';
import '../../assets/lang/i18n'
import { useTranslation } from 'react-i18next';
import Modal from "react-native-modal";
import { useQuery, gql } from "@apollo/client";
import AnimatedLoader from "react-native-animated-loader";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

const Home = () => {

    const [TrainNumber, setNumber] = useState('');
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const [isListVisible, setisListVisible] = useState(false);
    const [station, setStations] = useState('');
    const [shortCode, setShortCode] = useState('');
    const [letter, setLetter] = useState('')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [time, setTime] = useState('00:00');
    const [visible, setVisible] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentLanguage, setLanguage] = useState('fi');


    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeAnimCommuter = useRef(new Animated.Value(0)).current
    const fadeAnimButtons = useRef(new Animated.Value(1)).current

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
        Animated.timing(fadeAnimButtons, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start()

    };
    const fadeInCommuter = () => {
        Animated.timing(fadeAnimCommuter, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
        Animated.timing(fadeAnimButtons, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start()

    }

    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
        Animated.timing(fadeAnimCommuter, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
        Animated.timing(fadeAnimButtons, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
        }).start()
    };


    const { t, i18n } = useTranslation();

    const changeLanguage = value => {
        i18n
            .changeLanguage(value)
            .then(() => setLanguage(value))
            .catch(err => console.log(err));
    };



    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setTime(date.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3"));
        hideDatePicker();
    };

    const handleModal = () => setModalVisible(() => !isModalVisible);
    const handleList = () => setisListVisible(() => !isModalVisible)

    const Submit = () => {
        navigation.navigate('Tracker', { TrainNumber })
    }

    const Cities = gql`
    {
        stations{
            name
            shortCode
        }
    }`;

    const { data, loading, error } = useQuery(Cities);

    if (loading) {
        return (
            <AnimatedLoader
                visible={visible}
                overlayColor="#32796D"
                source={require("../../assets/loader/95504-bullet-train.json")}
                animationStyle={style.lottie}
                speed={1}>
            </AnimatedLoader>
        )
    }
    if (error) return <pre>{error.message}</pre>

    return (
        <DismissKeyboard>
            <SafeAreaView style={style.container}>
                <View style={style.languages}>
                    <Pressable onPress={() => changeLanguage('fi')} style={style.PressLang}>
                        <Text style={{
                            backgroundColor:
                                currentLanguage === 'fi' ? '#d3d3d3' : '#33A850',
                            height: 50,
                            width: 50,
                            padding: 12,
                            fontSize: 20,
                            textAlign: 'center',
                            borderRadius: 40,
                        }}>FI</Text>
                    </Pressable>

                    <Pressable onPress={() => changeLanguage('en')} style={style.PressLang}>
                        <Text style={{
                            backgroundColor:
                                currentLanguage === 'en' ? '#d3d3d3' : '#33A850',
                            height: 50,
                            width: 50,
                            padding: 12,
                            fontSize: 20,
                            textAlign: 'center',
                            borderRadius: 40,
                        }}>
                            EN
                        </Text>
                    </Pressable>

                        <Pressable style={style.MainMenuBack} onPress={fadeOut}>
                            <Text style={{
                                height: "100%",
                                width: "100%",
                                fontSize: 70,
                                paddingRight: 30,
                                paddingLeft: 30,
                                textAlign: 'center',
                                borderRadius: 40,
                                color: "white"

                            }}>
                                ←
                            </Text>
                        </Pressable>

                </View>
                <View style={style.search} >
                    <Animated.View style={{ opacity: fadeAnimButtons, position: "absolute", zIndex: fadeAnimButtons }}>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", alignContent:"center" }}>
                            <Pressable style={style.NormalTrains} onPress={fadeIn}>
                                <Text style={style.text}>{t('Trains By Number')}</Text>
                            </Pressable>
                            <Pressable style={style.CommuterTrains} onPress={fadeInCommuter}>
                                <Text style={style.text}>{t('Commuter Trains')}</Text>
                            </Pressable>
                        </View>
                    </Animated.View>
                    <Animated.View style={{ opacity: fadeAnim, position: "absolute", zIndex: fadeAnim, height: "100%", width: "100%" }}>
                        <View style={{ height: "100%", alignItems: "center", flexDirection: "column", justifyContent: "center" }}>
                            <TextInput
                                style={style.input}
                                keyboardType={'number-pad'}
                                placeholder={t('Enter Train Number')}
                                value={TrainNumber}
                                onChangeText={TrainNumber => setNumber(TrainNumber)}
                            />
                            <Pressable style={style.button} onPress={Submit} >
                                <Text style={style.text} >{t('Submit')}</Text>
                            </Pressable>
                        </View>
                        <View style={style.help}>
                            <Pressable style={style.helpButton} onPress={handleModal}>
                                <Text style={style.text}>{'❔'}</Text>
                            </Pressable>
                        </View>
                    </Animated.View>
                    <Animated.View style={{ opacity: fadeAnimCommuter, zIndex: fadeAnimCommuter }}>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}>
                            <Pressable onPress={handleList}>
                                <View pointerEvents='none'>
                                    <TextInput placeholder={t('Select Train Station')} value={station}
                                        style={style.input} />
                                </View>
                            </Pressable>
                            <TextInput
                                style={style.input}
                                keyboardType={'default'}
                                placeholder={t("Enter Train Letter")}
                                value={letter}
                                onChangeText={TrainLetter => setLetter(TrainLetter)}
                            />
                            <Modal isVisible={isListVisible} coverScreen={true} style={{ alignItems: "center", width: "100%", margin: 0 }}>
                                <View pointerEvents='none'>
                                    <TextInput
                                        style={style.NameDisplay}
                                        placeholder={station}
                                        value={station}
                                        onChangeText={station => setTrainLetter(station)}
                                    />
                                </View>
                                <TextInput
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                    style={style.searchInput}
                                    placeholder="Search"
                                />
                                <View style={{ width: "100%", height: "80%" }}>
                                    <FlashList
                                        estimatedItemSize={49}
                                        data={data.stations.filter(item => item.name.includes(searchQuery))}
                                        renderItem={({ item }) =>
                                            <Pressable onPress={() => { setStations(item.name); setShortCode(item.shortCode) }}
                                                style={{
                                                    height: 50
                                                }}
                                            >
                                                <Text style={{
                                                    backgroundColor: "black",
                                                    opacity: 0.8,
                                                    textAlign: "left",
                                                    height: "100%",
                                                    fontSize: 30,
                                                    color: "white",
                                                    borderBottomWidth: 3
                                                }}>{item.name}</Text>
                                            </Pressable>
                                        }

                                        keyExtractor={(item) => item.shortCode}
                                    />
                                </View>
                                <Pressable style={{
                                    zIndex: 1,
                                    position: 'absolute',
                                    backgroundColor: '#33A850',
                                    alignSelf: 'center',
                                    borderRadius: 25,
                                    width: "100%",
                                    height: 70,
                                    bottom: 15
                                }} onPress={() => setisListVisible(!isListVisible)}>
                                    <Text style={{ textAlign: "center", paddingVertical: 15, fontSize: 30, color: "white" }}> Submit </Text>
                                </Pressable>
                            </Modal>
                                <DateTimePickerModal
                                    style={{ width: '100%', backgroundColor: "#32796D" }}
                                    isVisible={isDatePickerVisible}
                                    mode="time"
                                    onConfirm={handleConfirm}
                                    onCancel={hideDatePicker}
                                />
                            <Pressable onPress={showDatePicker}>
                                <View pointerEvents='none'>
                                    <TextInput value={time}
                                        style={style.input} />
                                </View>
                            </Pressable>
                            <Pressable style={style.button} onPress={() => navigation.navigate('Loading', { shortCode, letter, time })}>
                                <Text style={style.text} >{t('Submit')}</Text>
                            </Pressable>
                        </View>
                    </Animated.View>

                </View>
                <Modal isVisible={isModalVisible}>
                    <View style={style.Modal}>
                        <Text style={{ color: 'white', fontSize: 20 }}>{t('HOW TO FIND YOUR TRAIN NUMBER')}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={require('../../assets/tutorial/S1_T_N.jpg')} style={style.image}></Image>
                            <Text style={{ flex: 1, textAlign: 'right', paddingVertical: 40, fontSize: 18, color: 'white' }}>{t('The last digits represents the train number: In this example 266')}</Text>
                        </View>
                        <Pressable onPress={handleModal} style={style.modalExitButton}>
                            <Text style={style.text}>OK</Text>
                        </Pressable>
                    </View>
                </Modal>
                <StatusBar barStyle="default" hidden={false} translucent={false} />
                <Text style={{ textAlign: 'center' }}>Source: Fintraffic / digitraffic.fi, license CC 4.0 BY</Text>
            </SafeAreaView>
        </DismissKeyboard>
    )
}
export default Home;