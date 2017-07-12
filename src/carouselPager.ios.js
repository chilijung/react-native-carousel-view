/**
 * @flow
 */
import React, {Component} from 'react';
import {
  ScrollView,
} from 'react-native';

export default class CarouselPager extends Component {
  constructor(props) {
    super(props);

    (this: any).scrollToPage = this.scrollToPage.bind(this);
    (this: any)._onMomentumScrollEnd = this._onMomentumScrollEnd.bind(this);
  }

  scrollToPage(page: number, animated: boolean) {
    if (typeof animated === 'undefined') {
      animated = true;
    }
    this.refs.scrollView.scrollTo({
      x: page * this.props.width,
      y: 0,
      animated,
    });
  }

  _onMomentumScrollEnd(e) {
    const activePage = e.nativeEvent.contentOffset.x / this.props.width;
    this.props.onEnd(activePage);
  }

  render() {
    return (
      <ScrollView ref="scrollView"
        contentContainerStyle={this.props.contentContainerStyle}
        automaticallyAdjustContentInsets={false}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScrollBeginDrag={this.props.onBegin}
        onMomentumScrollEnd={this._onMomentumScrollEnd}
        scrollsToTop={false}
      >
        {this.props.children}
      </ScrollView>
    );
  }
}
