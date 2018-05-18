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
  state = {
    data: [{title: 'A', image: 'https://www.w3schools.com/w3css/img_lights.jpg'}, {title: 'B', image: 'https://www.w3schools.com/w3css/img_lights.jpg'}]
  }

  _renderItem ({item, index}) {
    return (
      <Image style={styles.imageitem} stresizeMode="cover" source={{uri: item.image}} />
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
