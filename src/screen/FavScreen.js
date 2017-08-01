import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image, Button, AlertIOS, ImagePickerIOS, Platform
} from 'react-native';

export default class FavScreen extends Component {
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