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
  Image, Button, AlertIOS, ImagePickerIOS, Platform
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ChatScene from './src/scene/ChatScene';
import SettingScene from './src/scene/SettingScene';
import ListScene from './src/scene/ListScene';

class HomeScene extends Component {
  // static ;
  constructor() {
    super()
    this.state = { 
      avatar: 'https://dn-mhke0kuv.qbox.me/5a2bbb2376409f7dff1c.png?imageView2/1/w/100/h/100/q/85/interlace/1', 
      count: 0
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Hello Fini
        </Text>
        <Image style={styles.img} source={{uri:this.state.avatar}} />
        <Button title="Edit" color="#FFF5DB" onPress={() => this.handleBtnPress()} style={{margin:10}}/>
        <Button
          color="#FFF5DB"
          onPress={() => navigate('Chat', { user: 'Fini' })}
          title="Chat with somebody"
        />
      </View>
    );
  }

  handleBtnPress = () => {
    AlertIOS.alert(
     'Alert',
     'Please select a photo',
     [
       {text: 'Camera', onPress: () => {
         console.log('Camera Pressed')
         ImagePickerIOS.openCameraDialog({}, 
         img=>{
          console.log('Camera success ',img)
          this.setState({
            avatar: img
          })
         },
         ()=>console.log('Camera cancel'))
       }, style: 'cancel'},
       {text: 'Album', onPress: () => {
         ImagePickerIOS.openSelectDialog({}, 
         img=>{
          console.log('Album success ',img)
          this.setState({
            avatar: img
          })
         },
         ()=>console.log('Album cancel'))
         console.log('Album Pressed')
       }},
     ],
    );
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    backgroundColor: '#38639C',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF5DB',
  },
  img: {
    width:100,
    height:100,
    borderRadius:50
  },
});

const HomeTab = StackNavigator({
  Home: { 
    screen: HomeScene,
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
    screen: ChatScene,
    mode: Platform.OS === 'ios' ? 'modal' : 'card',
    navigationOptions: ({ navigation }) => ({
      title: `Chat with ${navigation.state.params.user}`,
    })
  },
});

const SettingTab = StackNavigator({
  Setting: { screen: SettingScene,
    navigationOptions: ({ navigation }) => ({
      title: `Setting`,
    })
   },
  Chat: { 
    screen: ChatScene,
    mode: Platform.OS === 'ios' ? 'modal' : 'card'
  },
});

// const ListTab = StackNavigator({
//   List: { 
//     screen: ListScene,
//     mode: Platform.OS === 'ios' ? 'modal' : 'card',
//     navigationOptions: ({ navigation }) => ({
//       title: `List`,
//     })
//    }
// });

export default RNBasic = TabNavigator({
  HomeTab: {
    screen: ListScene,
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
