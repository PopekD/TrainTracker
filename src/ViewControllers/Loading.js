import React from 'react';
import { useRoute } from '@react-navigation/native';
import { Alert, View } from 'react-native';
import { useQuery, gql } from "@apollo/client";
import { useNavigation } from '@react-navigation/native';
import AnimatedLoader from "react-native-animated-loader";
import style from "../styles/styles"

const Loading = () => {

    let found = true;
    let TrainNumber = null;
    const route = useRoute();
    const navigation = useNavigation();


    const Trains = gql`
    query AllTrains($TL: String!, $StationSC: String!){
        trainsByStationAndQuantity(
            station: $StationSC,
            where: { and: [{ commuterLineid: { equals: $TL } }, { runningCurrently: { equals: true } }] }
        )
        {
            trainNumber
            timeTableRows(where: { station: { shortCode: { equals: $StationSC } } }){
                scheduledTime
            }
        }
    }
    `;


    const { loading, error, data } = useQuery(Trains, {
        variables: { "TL": route.params.letter, "StationSC": route.params.shortCode }
    })


    if (error) return <pre>{error.message}</pre>
    if (loading) return



    data.trainsByStationAndQuantity.forEach(train => {
        const timeTableRow = train.timeTableRows[1]
        if (timeTableRow) {
            const scheduledTime = new Date(timeTableRow.scheduledTime);
            const scheduledTimeHours = scheduledTime.getHours().toString().padStart(2, '0');
            const scheduledTimeMinutes = scheduledTime.getMinutes().toString().padStart(2, '0');
            const inputTime = route.params.time.split(':');
            const inputHours = inputTime[0];
            const inputMinutes = inputTime[1];

            if (scheduledTimeHours === inputHours && scheduledTimeMinutes === inputMinutes) {
                TrainNumber = train.trainNumber
                found = false;
                navigation.navigate('Tracker', { TrainNumber });
            }
        }
    });


    if (found) {
        setTimeout(() => {
            Alert.alert("Train cannot be found", "The train is not yet on the track or The information provided is not correct.", [{
                text: "OK",
                onPress: () => navigation.navigate("Home"),
                style: 'cancel',
            }]);
        }, 2000);
    }



    return (
        <View>
            <AnimatedLoader
                visible={found}
                overlayColor="#32796D"
                source={require("../../assets/loader/95504-bullet-train.json")}
                animationStyle={style.lottie}
                speed={1}
            />
        </View>
    )
}

export default Loading;