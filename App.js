import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tracker from './src/ViewControllers/Tracker'
import Home from './src/ViewControllers/Home'
import Loading from './src/ViewControllers/Loading'
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const Stack = createNativeStackNavigator();
const client = new ApolloClient({
  uri: "https://rata.digitraffic.fi/api/v2/graphql/graphql",
  cache: new InMemoryCache()
});

export default function App(){
    return (
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator
          initialRouteName='Home'
            screenOptions={{ headerShown: false}}>
              <Stack.Screen name="Home" component={Home} screenOptions={{ headerShown: false }} />
              <Stack.Screen name="Tracker" component={Tracker} screenOptions={{headerShown: false}}/>
              <Stack.Screen name="Loading" component={Loading} screenOptions={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer> 
      </ApolloProvider>
    );
}