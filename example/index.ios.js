/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Carousel from 'react-native-carousel-view';

export default class example extends Component {
  render() {
    return (
      <View>
        <Carousel width={200} contentContainerStyle={{
          height: 300,
        }}>
          <View style={styles.container}>
            <Text>Page 1</Text>
          </View>
          <View style={styles.container}>
            <Text>Page 2</Text>
          </View>
          <View style={styles.container}>
            <Text>Page 3</Text>
          </View>
          {undefined}
        </Carousel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    backgroundColor: 'red',
  },
});

AppRegistry.registerComponent('example', () => example);
