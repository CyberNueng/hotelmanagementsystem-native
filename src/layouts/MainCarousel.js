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
      data: [props.popular[0], props.popular[1], props.popular[2], props.popular[3], props.popular[4]]
    };
  }

  _renderItem ({item, index}) {
    return (
      <Image style={styles.imageitem} resizeMode="cover" source={{uri: item.image}} />
    );
}

render () {
    return (
      <View style={styles.carousel}>
        <Carousel
          layout={'default'}
          ref={(c) => { this._carousel = c; }}
          data={this.state.data}
          renderItem={this._renderItem}
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
