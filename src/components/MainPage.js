import { StyleSheet, Text, View } from 'react-native';

import React from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const MainPage = () => (
  <View style={styles.container}>
    <Text>Welcome</Text>
  </View>
);

MainPage.navigationOptions = {
  header: null,
};

export default MainPage;