/**
 * @flow
 */

import React, {Component} from 'react';
import {
  Dimensions,
  Text,
  View,
} from 'react-native';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
import CarouselPager from './carouselPager';
import styles from './styles/carousel';

type Props = {
  hideIndicators: boolean,
  indicatorColor: string,
  indicatorSize: number,
  inactiveIndicatorColor: string,
  indicatorAtBottom: boolean,
  indicatorOffset: number,
  indicatorText: string,
  inactiveIndicatorText: string,
  width: ?number,
  initialPage: number,
  indicatorSpace: number,
  animate: boolean,
  delay: number,
  loop: boolean,
  children: any,
  refs: any,
}

export default class Carousel extends Component {
  props: Props
  state: {
    activePage: number
  }

  static defaultProps = {
      hideIndicators: false,
      indicatorColor: '#000000',
      indicatorSize: 50,
      inactiveIndicatorColor: '#999999',
      indicatorAtBottom: true,
      indicatorOffset: 250,
      indicatorText: '•',
      inactiveIndicatorText: '•',
      width: null,
      initialPage: 0,
      indicatorSpace: 25,
      animate: true,
      delay: 1000,
      loop: true,
  }

  constructor(props: Props) {
    super(props);

    this.state = {
      activePage: this.props.initialPage > 0 ? this.props.initialPage : 0,
    };

    (this: any).getWidth = this.getWidth.bind(this);
    (this: any).indicatorPressed = this.indicatorPressed.bind(this);
    (this: any).renderPageIndicator = this.renderPageIndicator.bind(this);
    (this: any)._setUpTimer = this._setUpTimer.bind(this);
    (this: any)._animateNextPage = this._animateNextPage.bind(this);
    (this: any)._onAnimationBegin = this._onAnimationBegin.bind(this);
    (this: any)._onAnimationEnd = this._onAnimationEnd.bind(this);
  }

  getWidth() {
    if (this.props.width !== null) {
      return this.props.width;
    } else {
      return Dimensions.get('window').width;
    }
  }

  componentDidMount() {
    if (this.props.initialPage > 0) {
      this.refs.pager.scrollToPage(this.props.initialPage, false);
    }

    if (this.props.animate && this.props.children){
        this._setUpTimer();
    }
  }

  indicatorPressed(activePage) {
    this.setState({activePage});
    this.refs.pager.scrollToPage(activePage);
  }

  renderPageIndicator() {
    if (this.props.hideIndicators === true) {
      return null;
    }
    const indicators = [];
    const indicatorStyle = this.props.indicatorAtBottom ? { bottom: this.props.indicatorOffset } : { top: this.props.indicatorOffset }
    let style;
    let position;

    position = {
      width: this.props.children.length * this.props.indicatorSpace,
    };
    position.left = (this.getWidth() - position.width) / 2;

    for (const i = 0, l = this.props.children.length; i < l; i++) {
      if (typeof this.props.children[i] === "undefined") {
        continue;
      }

      style = i === this.state.activePage ? { color: this.props.indicatorColor } : { color: this.props.inactiveIndicatorColor };
      indicators.push(
         <Text
            style={[style, { fontSize: this.props.indicatorSize }]}
            key={i}
            onPress={this.indicatorPressed.bind(this,i)}
          >
             { i === this.state.activePage  ? this.props.indicatorText : this.props.inactiveIndicatorText }
          </Text>
      );
    }

    if (indicators.length === 1) {
      return null;
    }

    return (
      <View style={[styles.pageIndicator, position, indicatorStyle]}>
        {indicators}
      </View>
    );
  }

  _setUpTimer() {
     if (this.props.children.length > 1) {
         this.clearTimeout(this.timer);
         this.timer = this.setTimeout(this._animateNextPage, this.props.delay);
     }
  }

  _animateNextPage() {
     let activePage = 0;
     if (this.state.activePage < this.props.children.length - 1) {
         activePage = this.state.activePage + 1;
     } else if (!this.props.loop) {
         return;
     }

     this.indicatorPressed(activePage);
     this._setUpTimer();
  }

  _onAnimationBegin() {
     this.clearTimeout(this.timer);
  }

  _onAnimationEnd(activePage) {
    this.setState({activePage});
    if (this.props.onPageChange) {
      this.props.onPageChange(activePage);
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CarouselPager
          ref="pager"
          width={this.getWidth()}
          contentContainerStyle={styles.container}
          onBegin={this._onAnimationBegin}
          onEnd={this._onAnimationEnd}
        >
          {this.props.children}
        </CarouselPager>
        {this.renderPageIndicator()}
      </View>
    );
  }
};

reactMixin(Carousel.prototype, TimerMixin);
