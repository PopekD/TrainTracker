import { useState, useEffect, useRef } from "react";
import style from '../styles/styles'
import { View, Text, Pressable, Alert, SafeAreaView } from "react-native";
import { useRoute } from '@react-navigation/native';
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import AnimatedLoader from "react-native-animated-loader";


const TrackScreen = ({ navigation }) => {

    const route = useRoute();
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const [visible, setVisible] = useState(true);

    const mapRef = useRef(null);


    const TrainLocation = {
        latitude: latitude,
        longitude: longitude,
        longitudeDelta: 0.1,
        latitudeDelta: 0.1,
    }
    const FollowTrain = () => {
        mapRef.current.animateToRegion(TrainLocation, 2 * 1000)
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', e => {
            (function (w) { w = w || window; var i = w.setInterval(function () { }, 10); while (i >= 0) { w.clearInterval(i--); } })(/*window*/);
        });

        getData();

        return () => {
            unsubscribe();
        };
    }, []);

    function sleep(ms) {
        return new Promise(val => setTimeout(val, ms));
    }


    const getDatawDelay = () => {
        fetch('https://rata.digitraffic.fi/api/v1/train-locations/latest/' + route.params.TrainNumber)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                setLongitude(myJson[0].location["coordinates"][0])
                setLatitude(myJson[0].location["coordinates"][1])
            })
    }



    async function getData() {
        await fetch('https://rata.digitraffic.fi/api/v1/train-locations/latest/' + route.params.TrainNumber)
            .then(function (response) {
                return response.json();
            })
            .then(async function (myJson) {
                if (myJson.length === 0) {
                    Alert.alert("Couldn't find your Train", "Train is not yet on the track or The number is not correct", [{
                        text: "OK",
                        onPress: () => navigation.navigate("Home"),
                        style: 'cancel',
                    }
                    ])
                    return
                }
                setLongitude(myJson[0].location["coordinates"][0])
                setLatitude(myJson[0].location["coordinates"][1])
                await sleep(2000)
                setInterval(getDatawDelay, 2000);
                setLoading(false)
            })

    }



    if (isLoading) {
        return (
            <AnimatedLoader
                visible={visible}
                overlayColor="#32796D"
                source={require("../../assets/loader/95504-bullet-train.json")}
                animationStyle={style.lottie}
                speed={1}>
            </AnimatedLoader>
        )
    } else {
        return (
            <View style={style.trainView}>
                <MapView style={style.map}
                    ref={mapRef}
                    initialRegion={TrainLocation}
                >

                    <Marker.Animated
                        coordinate={{
                            latitude: latitude,
                            longitude: longitude,
                        }}
                        image={require("../../assets/train.png")}
                    />
                </MapView>
                <View style={{ position: 'absolute', top: 0, width: 20, height: 20, padding: 40 }}>
                    <Pressable style={style.mapButtonOverlay} onPress={() => navigation.navigate("Home")}>
                        <Text style={style.mapButton}>🔙</Text>
                    </Pressable>
                </View>
                <View style={{ position: 'absolute', width: 20, height: 20, right: 0, padding: 70 }}>
                    <Pressable style={style.mapButtonOverlay} onPress={() => FollowTrain()}>
                        <Text style={style.mapButton}>🔍</Text>
                    </Pressable>
                </View>
            </View>
        );
    }


};
export default TrackScreen;