import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Carousel from 'react-native-snap-carousel';
import React from 'react';

var {height, width} = Dimensions.get('window');
height = height-24 //-24 on Android Statusbar
const styles = StyleSheet.create({
  imageitem: {
    height: '100%',
    width: '100%',
  },
  carousel: {
    height: height*0.36,
    backgroundColor: '#DDD',
  }
});

class MainCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [props.newItem[0], props.newItem[1], props.newItem[2], props.newItem[3], props.newItem[4]],
    };
  }

  _renderItem ({item, index}) {
    const { navigate } = this.props
    return (
      <TouchableOpacity onPress={()=>navigate('Item', {itemInfo: item})}>
        <Image style={styles.imageitem} resizeMode="cover" source={{uri: item.image}} />
      </TouchableOpacity>  
    );
  }

render () {
    return (
      <View style={styles.carousel}>
        <Carousel
          layout={'default'}
          ref={(c) => { this._carousel = c; }}
          data={this.state.data}
          renderItem={this._renderItem.bind(this)}
          sliderWidth={width}
          itemWidth={width}
          loop
          autoplay
        />
      </View>
    );
  }
}

export default MainCarousel
