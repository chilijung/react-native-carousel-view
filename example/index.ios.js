/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  AppRegistry,
} from 'react-native';
import Carousel from 'react-native-carousel-view';

export default class example extends Component {
  constructor(props) {
    super(props);
    this.state = {page: 0};

    (this: any)._setPage = this._setPage.bind(this);
  }

  _setPage(page: number) {
    this.setState({
      page,
    });
  }

  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Button
          onPress={() => this._setPage(1)}
          title="set to page 2"
          color="#841584"
        />
        <View style={styles.container}>
          <Carousel
            width={300}
            height={300}
            initialPage={this.state.page}>
            <View style={styles.contentContainer}>
              <Text>Page 1</Text>
            </View>
            <View style={styles.contentContainer}>
              <Text>Page 2</Text>
            </View>
            <View style={styles.contentContainer}>
              <Text>Page 3</Text>
            </View>
          </Carousel>
        </View>
        <View style={styles.container}>
          <Carousel
            width={300}
            height={300}
            delay={2000}
            indicatorAtBottom={false}
            indicatorSize={20}
            indicatorOffset={20}
            indicatorText="✽"
            indicatorColor="red">
            <View style={styles.contentContainer}>
              <Text>Page 1</Text>
            </View>
            <View style={styles.contentContainer}>
              <Text>Page 2</Text>
            </View>
            <View style={styles.contentContainer}>
              <Text>Page 3</Text>
            </View>
          </Carousel>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    borderWidth: 2,
    borderColor: '#CCC',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


AppRegistry.registerComponent('example', () => example);
