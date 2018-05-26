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
      popular: [props.popular[5],props.popular[6],props.popular[7],props.popular[8],props.popular[9],props.popular[10]],
      newItem: [props.newItem[0],props.newItem[1],props.newItem[2],props.newItem[3],props.newItem[4],props.newItem[5]]
    }
  }

  componentDidMount() {
    const { popular } = this.state
    for(var i in popular) {
      switch(popular[i].priceType) {
        case 'D':
          popular[i].priceType = '/ day'
        case 'U':
          popular[i].priceType = '/ ' + popular[i].amountType
      }
    }
  }

  render() {
    const { navigate } = this.props
    const { popular } = this.state
    return (
      <View>
        <Text style={styles.texthead}>Recommended</Text>
        <View style={styles.container}>
          <View style={styles.recommendbox}>
            <View style={styles.inrow}>
              <TouchableOpacity style={styles.touch} onPress={()=>navigate('Item', {itemInfo: popular[0]})}>
                <View style={styles.incolumn}>
                  <View style={styles.textzone}>
                    <Text style={styles.itemtext} numberOfLines={1} ellipsizeMode={'tail'}>{popular[0].itemName}</Text>
                    <Text style={styles.pricetext}>{`Price:\n${popular[0].reqPrice} ${popular[0].priceType}`}</Text>
                  </View>
                  <Image style={styles.imagezone} resizeMode="cover" resizeMode="contain" source={{uri: popular[0].image}} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touch} onPress={()=>navigate('Item', {itemInfo: popular[1]})}>
                <View style={styles.incolumn}>
                  <View style={styles.textzone}>
                    <Text style={styles.itemtext} numberOfLines={1} ellipsizeMode={'tail'}>{popular[1].itemName}</Text>
                    <Text style={styles.pricetext}>{`Price:\n${popular[1].reqPrice} ${popular[1].priceType}`}</Text>
                  </View>
                  <Image style={styles.imagezone} resizeMode="cover" resizeMode="contain" source={{uri: popular[1].image}} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.inrow}>
              <TouchableOpacity style={styles.touch} onPress={()=>navigate('Item', {itemInfo: popular[2]})}>
                <View style={styles.incolumn}>
                  <View style={styles.textzone}>
                    <Text style={styles.itemtext} numberOfLines={1} ellipsizeMode={'tail'}>{popular[2].itemName}</Text>
                    <Text style={styles.pricetext}>{`Price:\n${popular[2].reqPrice} ${popular[2].priceType}`}</Text>
                  </View>
                  <Image style={styles.imagezone} resizeMode="cover" resizeMode="contain" source={{uri: popular[2].image}} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touch} onPress={()=>navigate('Item', {itemInfo: popular[3]})}>
                <View style={styles.incolumn}>
                  <View style={styles.textzone}>
                    <Text style={styles.itemtext} numberOfLines={1} ellipsizeMode={'tail'}>{popular[3].itemName}</Text>
                    <Text style={styles.pricetext}>{`Price:\n${popular[3].reqPrice} ${popular[3].priceType}`}</Text>
                  </View>
                  <Image style={styles.imagezone} resizeMode="cover" resizeMode="contain" source={{uri: popular[3].image}} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.inrow}>
              <TouchableOpacity style={styles.touch} onPress={()=>navigate('Item', {itemInfo: popular[4]})}>
                <View style={styles.incolumn}>
                  <View style={styles.textzone}>
                    <Text style={styles.itemtext} numberOfLines={1} ellipsizeMode={'tail'}>{popular[4].itemName}</Text>
                    <Text style={styles.pricetext}>{`Price:\n${popular[4].reqPrice} ${popular[4].priceType}`}</Text>
                  </View>
                  <Image style={styles.imagezone} resizeMode="cover" resizeMode="contain" source={{uri: popular[4].image}} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touch} onPress={()=>navigate('Item', {itemInfo: popular[5]})}>
                <View style={styles.incolumn}>
                  <View style={styles.textzone}>
                    <Text style={styles.itemtext} numberOfLines={1} ellipsizeMode={'tail'}>{popular[5].itemName}</Text>
                    <Text style={styles.pricetext}>{`Price:\n${popular[5].reqPrice} ${popular[5].priceType}`}</Text>
                  </View>
                  <Image style={styles.imagezone} resizeMode="cover" resizeMode="contain" source={{uri: popular[5].image}} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text style={styles.texthead}>New</Text>
        <View style={styles.container}>
        <View style={styles.recommendbox}>
            <View style={styles.inrow}>
              <TouchableOpacity style={styles.touch} onPress={()=>navigate('Item', {itemInfo: newItem[0]})}>
                <View style={styles.incolumn}>
                  <View style={styles.textzone}>
                    <Text style={styles.itemtext} numberOfLines={1} ellipsizeMode={'tail'}>{newItem[0].itemName}</Text>
                    <Text style={styles.pricetext}>{`Price:\n${newItem[0].reqPrice} ${newItem[0].priceType}`}</Text>
                  </View>
                  <Image style={styles.imagezone} resizeMode="cover" resizeMode="contain" source={{uri: newItem[0].image}} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touch} onPress={()=>navigate('Item', {itemInfo: newItem[1]})}>
                <View style={styles.incolumn}>
                  <View style={styles.textzone}>
                    <Text style={styles.itemtext} numberOfLines={1} ellipsizeMode={'tail'}>{newItem[1].itemName}</Text>
                    <Text style={styles.pricetext}>{`Price:\n${newItem[1].reqPrice} ${newItem[1].priceType}`}</Text>
                  </View>
                  <Image style={styles.imagezone} resizeMode="cover" resizeMode="contain" source={{uri: newItem[1].image}} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.inrow}>
              <TouchableOpacity style={styles.touch} onPress={()=>navigate('Item', {itemInfo: newItem[2]})}>
                <View style={styles.incolumn}>
                  <View style={styles.textzone}>
                    <Text style={styles.itemtext} numberOfLines={1} ellipsizeMode={'tail'}>{newItem[2].itemName}</Text>
                    <Text style={styles.pricetext}>{`Price:\n${newItem[2].reqPrice} ${newItem[2].priceType}`}</Text>
                  </View>
                  <Image style={styles.imagezone} resizeMode="cover" resizeMode="contain" source={{uri: newItem[2].image}} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touch} onPress={()=>navigate('Item', {itemInfo: newItem[3]})}>
                <View style={styles.incolumn}>
                  <View style={styles.textzone}>
                    <Text style={styles.itemtext} numberOfLines={1} ellipsizeMode={'tail'}>{newItem[3].itemName}</Text>
                    <Text style={styles.pricetext}>{`Price:\n${newItem[3].reqPrice} ${newItem[3].priceType}`}</Text>
                  </View>
                  <Image style={styles.imagezone} resizeMode="cover" resizeMode="contain" source={{uri: newItem[3].image}} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.inrow}>
              <TouchableOpacity style={styles.touch} onPress={()=>navigate('Item', {itemInfo: newItem[4]})}>
                <View style={styles.incolumn}>
                  <View style={styles.textzone}>
                    <Text style={styles.itemtext} numberOfLines={1} ellipsizeMode={'tail'}>{newItem[4].itemName}</Text>
                    <Text style={styles.pricetext}>{`Price:\n${newItem[4].reqPrice} ${newItem[4].priceType}`}</Text>
                  </View>
                  <Image style={styles.imagezone} resizeMode="cover" resizeMode="contain" source={{uri: newItem[4].image}} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touch} onPress={()=>navigate('Item', {itemInfo: newItem[5]})}>
                <View style={styles.incolumn}>
                  <View style={styles.textzone}>
                    <Text style={styles.itemtext} numberOfLines={1} ellipsizeMode={'tail'}>{newItem[5].itemName}</Text>
                    <Text style={styles.pricetext}>{`Price:\n${newItem[5].reqPrice} ${newItem[5].priceType}`}</Text>
                  </View>
                  <Image style={styles.imagezone} resizeMode="cover" resizeMode="contain" source={{uri: newItem[5].image}} />
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
