import { Carousel, WingBlank } from 'antd-mobile';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import React from 'react';

const styles = StyleSheet.create({
  spaceCarousel: {
    padding: 16 + 'px',
    backgroundColor: '#DEF1E5',
    overflow: 'hidden',
  },
});

class MainCarousel extends React.Component {
  state = {
    data: ['1', '2', '3'],
  }
  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);
  }
  render() {
    return (
      <View>
        <Carousel className="spaceCarousel"
          frameOverflow="visible"
          cellSpacing={10}
          slideWidth={0.8}
          autoplay
          infinite
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => this.setState({ slideIndex: index })}
        >
          {this.state.data.map((val, index) => (
            <TouchableOpacity
              key={val}
              onPress={() => console.log('click')}
              style={{
                position: 'relative',
                top: this.state.slideIndex === index ? -10 : 0,
                height: '80%',
                boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
              }}
            >
              <Image
                source={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                style={{ height: '100%', verticalAlign: 'top' }}
                resizeMode="cover" resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </Carousel>
      </View>
    );
  }
}

export default MainCarousel
