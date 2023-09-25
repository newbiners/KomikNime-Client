import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, Text } from 'react-native';
import Home from './Component/Home';
import ExplorerScreen from './Component/ExplorerScreen';
import MarkScreen from './Component/MarkScreen';
import EpisodeScreen from './Component/EpisodeScreen';
import EpisodeDetailScreen from './Component/EpisodeDetailScreen';
import UserAfterLogin from './Component/UserAfterLogin';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserScreen from './Component/UserScreen';
import { RecoilRoot } from 'recoil';
import { getData } from './Component/state/Storage';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faThumbsUp,faUser,faMagnifyingGlass,faHome } from '@fortawesome/free-solid-svg-icons';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



export default function App() {
  

  const HomeHendler = () => {

    return (  
      <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          return <FontAwesomeIcon icon={faHome} size={focused ? 20 : 15 } color={focused ? "#FFA41B" : "grey"}/> 
        },
        tabBarActiveTintColor : "#FFA41B",
        tabBarInactiveTintColor : "grey"
      }} />
      <Tab.Screen name="Explore" component={ExplorerScreen} options={{
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          return <FontAwesomeIcon icon={faMagnifyingGlass} size={focused ? 20 : 15 } color={focused ? "#FFA41B" : "grey"}/> 
        },
        tabBarActiveTintColor : "#FFA41B",
        tabBarInactiveTintColor : "grey"
      }} />
      <Tab.Screen name="mark" component={MarkScreen} options={{
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          return <FontAwesomeIcon icon={faThumbsUp} size={focused ? 20 : 15 } color={focused ? "#FFA41B" : "grey"}/> 
        },
        tabBarActiveTintColor : "#FFA41B",
        tabBarInactiveTintColor : "grey"
      }} />
      <Tab.Screen name="user" component={UserScreen} options={{
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          return <FontAwesomeIcon icon={faUser} size={focused ? 20 : 15 } color={focused ? "#FFA41B" : "grey"}/> 
        },
        tabBarActiveTintColor : "#FFA41B",
        tabBarInactiveTintColor : "grey"
      }} />
           
    </Tab.Navigator>
    )
  }


  const [token, setToken] = useState();
  const getDataHendler = async () => {
    const token = await getData();
    setToken(token);
  }

  useEffect(() => {
    getDataHendler();
  }, [token])

  return (

    <NavigationContainer>
           
      <RecoilRoot>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name='homeScreen' component={HomeHendler} />
        <Stack.Screen name='exploreScreen' component={ExplorerScreen} />
        <Stack.Screen name='markScreen' component={MarkScreen} />
        <Stack.Screen name='userScreen' component={UserScreen} />
        <Stack.Screen name='episodeScreen' component={EpisodeScreen} />
        <Stack.Screen name='episodeDetail' component={EpisodeDetailScreen} />
      </Stack.Navigator>
        </RecoilRoot> 
      <StatusBar style='auto' />
              
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {

    backgroundColor: 'yellow',

  },
});
