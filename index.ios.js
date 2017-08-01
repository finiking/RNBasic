/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Platform,
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ChatScreen from './src/screen/ChatScreen';
import SettingScreen from './src/screen/SettingScreen';
import HomeScreen from './src/screen/HomeScreen';
import FavScreen from './src/screen/FavScreen';



const HomeTab = StackNavigator({
  Home: { 
    screen: FavScreen,
    navigationOptions: {
      title: 'Welcome',
      headerRight: (
        <Button
          title = '😎 Done'
          onPress={ () => AlertIOS.alert(
            'Alert',
            'a press from navigation')
          }
          color="#FFF5DB"
        />
      ),
      headerStyle: {
        backgroundColor: '#38639C',
      },
      headerTitleStyle: {
        color: '#FFF5DB',
      }
    }
   },
  Chat: { 
    screen: ChatScreen,
    mode: Platform.OS === 'ios' ? 'modal' : 'card',
    navigationOptions: ({ navigation }) => ({
      title: `Chat with ${navigation.state.params.user}`,
    })
  },
});

const SettingTab = StackNavigator({
  Setting: { screen: SettingScreen,
    navigationOptions: ({ navigation }) => ({
      title: `Setting`,
    })
   },
  Chat: { 
    screen: ChatScreen,
    mode: Platform.OS === 'ios' ? 'modal' : 'card'
  },
});

// const ListTab = StackNavigator({
//   List: { 
//     screen: ListScreen,
//     mode: Platform.OS === 'ios' ? 'modal' : 'card',
//     navigationOptions: ({ navigation }) => ({
//       title: `List`,
//     })
//    }
// });

export default RNBasic = TabNavigator({
  HomeTab: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-home' : 'ios-home-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
    }
  },
   ListTab: {
    screen: HomeTab,
    navigationOptions: {
      tabBarLabel: 'List',
      tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-stats' : 'ios-stats-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
    }
  },
  FavoriteTab: {
    screen: SettingTab,
    navigationOptions: {
      tabBarLabel: 'Favorite',
      tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-heart' : 'ios-heart-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
    }
  },
  SettingTab: {
    screen: SettingTab,
    navigationOptions: {
      tabBarLabel: 'Setting',
      tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-settings' : 'ios-settings-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
    }
  },
})

AppRegistry.registerComponent('RNBasic', () => RNBasic);
