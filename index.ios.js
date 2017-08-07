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
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Badge } from "react-native-elements";

import ChatScreen from './src/screen/ChatScreen';
import SettingScreen from './src/screen/SettingScreen';
import HomeScreen from './src/screen/HomeScreen';
import FavScreen from './src/screen/FavScreen';
import InfiniteScrollScreen from './src/screen/InfiniteScrollScreen';



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
      tabBarLabel: '首页',
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
      tabBarLabel: '购物车',
      tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-cart' : 'ios-cart-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
    }
  },
  FavoriteTab: {
    screen: InfiniteScrollScreen,
    navigationOptions: {
      tabBarLabel: '清单',
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
      tabBarLabel: '我',
      tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-contact' : 'ios-contact-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
    }
  },
},
{
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  // swipeEnabled: true,
  animationEnabled: true,
  lazy: true,
  tabBarOptions: {
    activeTintColor: '#fd472b',
    inactiveTintColor: '#979797',
    style: { backgroundColor: '#ffffff' },
    labelStyle: {
      marginBottom: 5
    }
  },
})

AppRegistry.registerComponent('RNBasic', () => RNBasic);
