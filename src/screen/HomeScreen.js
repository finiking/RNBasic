import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Button, AlertIOS, ListView, Dimensions, StatusBar, Platform } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import api from '../api/index';

const { width, height } = Dimensions.get("window");

export default class HomeScreen extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds,
    };
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const { params } = this.props.navigation.state;
    // <StatusBar translucent={false} backgroundColor="rgba(255, 255, 255, .5)" barStyle="default"/>
    
    return (
      <View style={styles.container}>
        <ListView
        style={styles.list}
        dataSource={this.state.dataSource}
        initialListSize={2}
        removeClippedSubviews={false}
        renderRow={(row) => 
          <View style={styles.item}>
            <View style={styles.itemImg}>
              <Image style={styles.img} source={{uri:row.productImg}}></Image>
              <View style={styles.rebateBtnWrap} onPress={()=>{}}>
                <Text style={styles.rebateBtn}>优惠券:60元</Text>
              </View>
            </View>
            <View style={styles.itemInfo}>
              <Text numberOfLines={2} style={styles.itemTitle}>{row.productTitle}</Text>
              <View style={styles.itemPrice}>
                <Text style={styles.priceTitile}>券后价：</Text>
                <Text style={styles.price}>￥{row.productPrice}.</Text>
                <Text style={styles.priceFloat}>{row.productPriceFloat}</Text>
                {row.returnPoints && row.returnPoints >= 0 ? <Text style={styles.priceRebate}>返积分{row.returnPoints}</Text> : <Text/>}
              </View>
              <Text style={styles.itemOldPrice}>在售价：399.00</Text>
              <Text style={styles.itemSold}>销量：2358</Text>
              <View style={styles.itemRecommend}>
                <Text style={styles.recTitle}>[AI导购推荐]</Text>
                <Text numberOfLines={2} style={styles.recContent}>{row.productPromoReason}</Text>
              </View>
              <View style={styles.itemBtnWrap} onPress={()=>{}}>
                <Icons
                  name={'shopping-cart'}
                  size={12}
                  style={{ color: '#fff' }}
                />
                <Text style={styles.itemBtn}>领券购买</Text>
              </View>
            </View>
          </View>
        }
      />
      </View>
      
    );
  }
  handleBtnPress = () => {
    
  }

  getData() {
    this.requestList()
  }

  async requestList() {
        try {
            let response = await fetch(api.list, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                page: 1,
                size: 10,
              })
            })
            let json = await response.json()
            let list = json.result.map(item => {
              let prices = (item.productPrice+'').split('.')
              item.productPrice = prices[0]
              item.productPriceFloat = !prices[1] ? '00' : prices[1].length < 2 ? prices[1]+'0' : prices[1]
              return item
            })
            // console.warn('request',json.result.length)
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(json.result),
                // refreshing: false,
            })
        } catch (error) {
          console.error(error)
            // this.setState({ refreshing: false })
        }
    }
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    // height: height,
    backgroundColor: '#fff',
  },
  list: {
    backgroundColor: '#F1F1F6',
    
  },
  item: {
    flex: 1,
    // paddingLeft: 10,
    // paddingRight: 10,
    padding: 10,
    flexDirection:"row",
    alignItems: 'stretch',    
    justifyContent:"space-between",
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  itemImg: {
    flex: 0.45,
    flexDirection:"column",
    alignItems:"center",
    marginRight: 10,
    justifyContent: "space-between",
  },
  img: {
    width: 100,
    height:100,
  },
  rebateBtnWrap: {
    backgroundColor: '#37B5F0',
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 3,
  },
  rebateBtn: {
    fontSize: 10,
    color: '#fff',
  },
  itemInfo: {
    flex: 1,
    flexDirection:"column",
  },
  itemTitle: {
    fontSize : 14,
    height : 40,
    fontWeight : '200',
    color : '#000000',
    textAlign: 'left',
    flex: 1
    // marginRight: 10,
  },
  itemPrice: {
    flex: 1,
    flexDirection:"row", 
    alignItems: 'flex-end',    
    justifyContent: 'flex-start'
  },
  priceTitile: {
    fontSize: 12,
    color: '#717171',
  },
  price: {
    fontSize: 16,
    height: 16,    
    color: '#fd472b',
    fontWeight : '600',  
    // flex: 1,
    // flexDirection:"column",   
    // justifyContent: 'flex-end',
  },
  priceFloat: {
    fontSize: 12,
    height: 12,    
    color: '#fd472b',
    fontWeight : '600',  
    // flex: 1,
    // flexDirection:"column",   
    // justifyContent: 'flex-end',
  },
  priceRebate: {
    fontSize: 10,
    color: '#fd472b',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#fd472b',
    borderRadius: 3,
    marginLeft: 5,
    paddingLeft: 3,
    paddingRight: 3,
  },
  itemOldPrice: {
    fontSize: 10,
    marginTop: 8,
    color: '#90909B',
  },
  itemSold: {
    fontSize: 10,
    marginTop: 8,  
    color: '#90909B',      
  },
  itemRecommend: {
    flex: 1,
    flexDirection:"row",
    marginTop: 8,       
  },
  recTitle: {
    fontSize: 10,    
    color: '#fd472b',    
  },
  recContent: {
    fontSize: 10,
    color: '#90909B',  
    flex: 1,  
  },
  itemBtnWrap: {
    position: 'absolute',
    right: 0,
    top: 72,
    backgroundColor: '#fd472b',
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 1,
    flexDirection:"row", 
    alignItems: 'center',    
  },
  itemBtn: {
    color: '#fff',
    fontSize: 10,
    marginLeft: 3,
  }
});