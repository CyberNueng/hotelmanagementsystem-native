import { ActivityIndicator, Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import React from 'react';
import { Text } from 'react-native-elements';

var {height, width} = Dimensions.get('window');
height = height-24 //-24 on Android Statusbar
const styles = StyleSheet.create({
  container: {
    height: height*0.38,
    width: width,
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recommendbox: {
    height: height*0.36,
    width: width-2,
    backgroundColor: '#FFF'
  },
  inrow: {
    height: height*0.12,
    flexDirection: 'row'
  },
  touch: {
    flex: 1
  },
  incolumn:{
    height: '100%',
    width: '100%',
    borderWidth: 1,
    borderColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  texthead: {
    fontSize: height*0.033,
    fontWeight: '400',
    marginTop: height*0.02,
    marginLeft: width*0.03
  },
  textzone: {
    height: '100%',
    justifyContent: 'center',
    paddingLeft: width*0.02,
    width: '60%',
  },
  imagezone: {
    height: '80%',
    width: '38%',
  },
  itemtext: {
    fontSize: height*0.022,
    fontWeight: '300',
    color: '#000'
  },
  pricetext: {
    fontSize: height*0.020,
    fontWeight: '200',
    color: '#333'
  },
})

class Recommend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popular: [props.popular[0],props.popular[1],props.popular[2],props.popular[3],props.popular[4],props.popular[5]],
      recommend: [props.recommend[0],props.recommend[1],props.recommend[2],props.recommend[3],props.recommend[4],props.recommend[5]]
    }
  }

  componentDidMount() {
    const { popular, recommend } = this.state
    for(var i in popular) {
      switch(popular[i] ? popular[i].priceType : '') {
        case 'D':
          popular[i].priceType = '/ day'
        case 'U':
          popular[i].priceType = '/ ' + popular[i].amountType
      }
    }
    for(var i in recommend) {
      switch(recommend[i] ? recommend[i].priceType : '') {
        case 'D':
          recommend[i].priceType = '/ day'
        case 'U':
          recommend[i].priceType = '/ ' + recommend[i].amountType
      }
    }
  }

  render() {
    const { navigate } = this.props
    const { popular, recommend } = this.state
    return (
      <View>
        <Text style={styles.texthead}>Recommended</Text>
        <View style={styles.container}>
          <View style={styles.recommendbox}>
            <View style={styles.inrow}>
              <TouchableOpacity style={styles.touch} onPress={()=>{recommend[0] ? navigate('Item', {itemInfo: recommend[0]}) : false}}>
                <View style={styles.incolumn}>
                  <View style={styles.textzone}>
                    <Text style={styles.itemtext} numberOfLines={1} ellipsizeMode={'tail'}>{recommend[0] ? recommend[0].itemName : ''}</Text>
                    <Text style={styles.pricetext}>{recommend[0] ? `Price:\n${recommend[0].reqPrice} ${recommend[0].priceType}`: ''}</Text>
                  </View>
                  <Image style={styles.imagezone} resizeMode="cover" resizeMode="contain" source={{uri: recommend[0] ? recommend[0].image : 'none'}} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touch} onPress={()=>{recommend[1] ? navigate('Item', {itemInfo: recommend[1]}) : false}}>
                <View style={styles.incolumn}>
                  <View style={styles.textzone}>
                    <Text style={styles.itemtext} numberOfLines={1} ellipsizeMode={'tail'}>{recommend[1] ? recommend[1].itemName : ''}</Text>
                    <Text style={styles.pricetext}>{recommend[1] ? `Price:\n${recommend[1].reqPrice} ${recommend[1].priceType}`: ''}</Text>
                  </View>
                  <Image style={styles.imagezone} resizeMode="cover" resizeMode="contain" source={{uri: recommend[1] ? recommend[1].image : 'none'}} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.inrow}>
            <TouchableOpacity style={styles.touch} onPress={()=>{recommend[2] ? navigate('Item', {itemInfo: recommend[2]}) : false}}>
                <View style={styles.incolumn}>
                  <View style={styles.textzone}>
                    <Text style={styles.itemtext} numberOfLines={1} ellipsizeMode={'tail'}>{recommend[2] ? recommend[2].itemName : ''}</Text>
                    <Text style={styles.pricetext}>{recommend[2] ? `Price:\n${recommend[2].reqPrice} ${recommend[2].priceType}`: ''}</Text>
                  </View>
                  <Image style={styles.imagezone} resizeMode="cover" resizeMode="contain" source={{uri: recommend[2] ? recommend[2].image : 'none'}} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touch} onPress={()=>{recommend[3] ? navigate('Item', {itemInfo: recommend[3]}) : false}}>
                <View style={styles.incolumn}>
                  <View style={styles.textzone}>
                    <Text style={styles.itemtext} numberOfLines={1} ellipsizeMode={'tail'}>{recommend[3] ? recommend[3].itemName : ''}</Text>
                    <Text style={styles.pricetext}>{recommend[3] ? `Price:\n${recommend[3].reqPrice} ${recommend[3].priceType}`: ''}</Text>
                  </View>
                  <Image style={styles.imagezone} resizeMode="cover" resizeMode="contain" source={{uri: recommend[3] ? recommend[3].image : 'none'}} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.inrow}>
            <TouchableOpacity style={styles.touch} onPress={()=>{recommend[4] ? navigate('Item', {itemInfo: recommend[4]}) : false}}>
                <View style={styles.incolumn}>
                  <View style={styles.textzone}>
                    <Text style={styles.itemtext} numberOfLines={1} ellipsizeMode={'tail'}>{recommend[4] ? recommend[4].itemName : ''}</Text>
                    <Text style={styles.pricetext}>{recommend[4] ? `Price:\n${recommend[4].reqPrice} ${recommend[4].priceType}`: ''}</Text>
                  </View>
                  <Image style={styles.imagezone} resizeMode="cover" resizeMode="contain" source={{uri: recommend[4] ? recommend[4].image : 'none'}} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touch} onPress={()=>{recommend[5] ? navigate('Item', {itemInfo: recommend[5]}) : false}}>
                <View style={styles.incolumn}>
                  <View style={styles.textzone}>
                    <Text style={styles.itemtext} numberOfLines={1} ellipsizeMode={'tail'}>{recommend[5] ? recommend[5].itemName : ''}</Text>
                    <Text style={styles.pricetext}>{recommend[5] ? `Price:\n${recommend[5].reqPrice} ${recommend[5].priceType}`: ''}</Text>
                  </View>
                  <Image style={styles.imagezone} resizeMode="cover" resizeMode="contain" source={{uri: recommend[5] ? recommend[5].image : 'none'}} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text style={styles.texthead}>Popular</Text>
        <View style={styles.container}>
          <View style={styles.recommendbox}>
            <View style={styles.inrow}>
              <TouchableOpacity style={styles.touch} onPress={()=>{popular[0] ? navigate('Item', {itemInfo: popular[0]}) : false}}>
                <View style={styles.incolumn}>
                  <View style={styles.textzone}>
                    <Text style={styles.itemtext} numberOfLines={1} ellipsizeMode={'tail'}>{popular[0] ? popular[0].itemName : ''}</Text>
                    <Text style={styles.pricetext}>{popular[0] ? `Price:\n${popular[0].reqPrice} ${popular[0].priceType}`: ''}</Text>
                  </View>
                  <Image style={styles.imagezone} resizeMode="cover" resizeMode="contain" source={{uri: popular[0] ? popular[0].image : 'none'}} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touch} onPress={()=>{popular[1] ? navigate('Item', {itemInfo: popular[1]}) : false}}>
                <View style={styles.incolumn}>
                  <View style={styles.textzone}>
                    <Text style={styles.itemtext} numberOfLines={1} ellipsizeMode={'tail'}>{popular[1] ? popular[1].itemName : ''}</Text>
                    <Text style={styles.pricetext}>{popular[1] ? `Price:\n${popular[1].reqPrice} ${popular[1].priceType}`: ''}</Text>
                  </View>
                  <Image style={styles.imagezone} resizeMode="cover" resizeMode="contain" source={{uri: popular[1] ? popular[1].image : 'none'}} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.inrow}>
            <TouchableOpacity style={styles.touch} onPress={()=>{popular[2] ? navigate('Item', {itemInfo: popular[2]}) : false}}>
                <View style={styles.incolumn}>
                  <View style={styles.textzone}>
                    <Text style={styles.itemtext} numberOfLines={1} ellipsizeMode={'tail'}>{popular[2] ? popular[2].itemName : ''}</Text>
                    <Text style={styles.pricetext}>{popular[2] ? `Price:\n${popular[2].reqPrice} ${popular[2].priceType}`: ''}</Text>
                  </View>
                  <Image style={styles.imagezone} resizeMode="cover" resizeMode="contain" source={{uri: popular[2] ? popular[2].image : 'none'}} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touch} onPress={()=>{popular[3] ? navigate('Item', {itemInfo: popular[3]}) : false}}>
                <View style={styles.incolumn}>
                  <View style={styles.textzone}>
                    <Text style={styles.itemtext} numberOfLines={1} ellipsizeMode={'tail'}>{popular[3] ? popular[3].itemName : ''}</Text>
                    <Text style={styles.pricetext}>{popular[3] ? `Price:\n${popular[3].reqPrice} ${popular[3].priceType}`: ''}</Text>
                  </View>
                  <Image style={styles.imagezone} resizeMode="cover" resizeMode="contain" source={{uri: popular[3] ? popular[3].image : 'none'}} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.inrow}>
            <TouchableOpacity style={styles.touch} onPress={()=>{popular[4] ? navigate('Item', {itemInfo: popular[4]}) : false}}>
                <View style={styles.incolumn}>
                  <View style={styles.textzone}>
                    <Text style={styles.itemtext} numberOfLines={1} ellipsizeMode={'tail'}>{popular[4] ? popular[4].itemName : ''}</Text>
                    <Text style={styles.pricetext}>{popular[4] ? `Price:\n${popular[4].reqPrice} ${popular[4].priceType}`: ''}</Text>
                  </View>
                  <Image style={styles.imagezone} resizeMode="cover" resizeMode="contain" source={{uri: popular[4] ? popular[4].image : 'none'}} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touch} onPress={()=>{popular[5] ? navigate('Item', {itemInfo: popular[5]}) : false}}>
                <View style={styles.incolumn}>
                  <View style={styles.textzone}>
                    <Text style={styles.itemtext} numberOfLines={1} ellipsizeMode={'tail'}>{popular[5] ? popular[5].itemName : ''}</Text>
                    <Text style={styles.pricetext}>{popular[5] ? `Price:\n${popular[5].reqPrice} ${popular[5].priceType}`: ''}</Text>
                  </View>
                  <Image style={styles.imagezone} resizeMode="cover" resizeMode="contain" source={{uri: popular[5] ? popular[5].image : 'none'}} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Recommend
