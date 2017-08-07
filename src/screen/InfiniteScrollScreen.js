import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Button, AlertIOS, FlatList, Dimensions, StatusBar, Platform, ActivityIndicator } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import { List, SearchBar } from "react-native-elements";
import api from '../api/index';

const { width, height } = Dimensions.get("window");

export default class InfiniteScrollScreen extends Component {
  constructor() {
    super();
    // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      data: [],
      page: 1,
      loading: false,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.refresh()
  }

  render() {
    const { params } = this.props.navigation.state;
    // <StatusBar translucent={false} backgroundColor="rgba(255, 255, 255, .5)" barStyle="default"/>
    
    return (
      <List style={styles.container}>
        <FlatList
          style={styles.list}
          data={this.state.data}
          // extraData={this.state}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          getItemLayout={(data, index) => (
            {length: 148, offset: 148 * index, index}
          )}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
          refreshing={this.state.refreshing}
          onRefresh={this.refresh}
          renderItem={({item}) => 
            <View style={styles.item} id={item.id}>
              <View style={styles.itemImg}>
                <Image style={styles.img} source={{uri:item.productImg}}></Image>
                <View style={styles.rebateBtnWrap} onPress={()=>{}}>
                  <Text style={styles.rebateBtn}>优惠券:60元</Text>
                </View>
              </View>
              <View style={styles.itemInfo}>
                <Text numberOfLines={2} style={styles.itemTitle}>{item.productTitle}</Text>
                <View style={styles.itemPrice}>
                  <Text style={styles.priceTitile}>券后价：</Text>
                  <Text style={styles.price}>￥{item.productPrice}.</Text>
                  <Text style={styles.priceFloat}>{item.productPriceFloat}</Text>
                  {item.returnPoints && item.returnPoints >= 0 ? <Text style={styles.priceRebate}>返积分{item.returnPoints}</Text> : <Text/>}
                </View>
                <Text style={styles.itemOldPrice}>在售价：399.00</Text>
                <Text style={styles.itemSold}>销量：2358</Text>
                <View style={styles.itemRecommend}>
                  <Text style={styles.recTitle}>[AI导购推荐]</Text>
                  <Text numberOfLines={2} style={styles.recContent}>{item.productPromoReason}</Text>
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
      </List>
      
    );
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          backgroundColor: "#F1F1F6",
          // marginLeft: "14%"
        }}
      />
    );
  };
  
  renderHeader = () => {
    return (
      <SearchBar 
        placeholder="请输入搜索词" 
        lightTheme 
        round 
        containerStyle={{ backgroundColor: '#fff', borderTopWidth: 0, borderColor: '#F1F1F6' }}
        inputStyle={{ backgroundColor: '#EFEFF4', fontSize: 12}}
        clearIcon={{ color: '#86939e', name: 'close' }}
      />);
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 10,
          borderTopWidth: 1,
          borderColor: "#F1F1F6",
          // backgroundColor: '#fff',
        }}
      >
        <ActivityIndicator animating size="small" />
      </View>
    );
  };
  handleBtnPress = () => {
    
  };
  loadMore = () => {
    if(!this.onEndReachedCalledDuringMomentum && !this.state.loading) {
      this.onEndReachedCalledDuringMomentum = true;
      this.setState({
        page: this.state.page + 1,
      }, () => {
        this.requestList()
      })
    }   
  };

  refresh = () => {
    // this.setState({ refreshing: true })
    this.setState({ page: 1 }, () => {
      this.requestList()
    })
  };

  async requestList() {
    const { page } = this.state
    this.setState({ loading: true });
    await new Promise(resolve => setTimeout(resolve, 300));
    try {
      let response = await fetch(api.list, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page,
          size: 10,
        })
      })
      let json = await response.json()
      let list = json.result.map(item => {
        let prices = (item.productPrice+'').split('.')
        item.productPrice = prices[0]
        item.productPriceFloat = !prices[1] ? '00' : prices[1].length < 2 ? prices[1]+'0' : prices[1]
        if (!item.returnPoints | item.returnPoints <0) {
          item.returnPoints = 200
        }
        return item
      })
      // console.warn('request',json.result.length)
      
      this.setState({
        // data: list,
        data: page === 1 ? list : this.state.data.concat(list),
        // data: page === 1 ? list : [...this.state.data, ...list],
        loading: false,
        refreshing: false,
      })
    } catch (error) {
      console.error(error)
        this.setState({ loading: false, refreshing: false })
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
    // marginBottom: 5,
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