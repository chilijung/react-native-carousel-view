/**
 * @flow
 */

import React, {Component, Children} from 'react';
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
  height: number,
  initialPage: number,
  indicatorSpace: number,
  animate: boolean,
  delay: number,
  loop: boolean,
  contentContainerStyle?: {[attr: string]: any},
  children: any,
  onPageChange?: (number) => void,
  onScrollBegin?: () => void,
  onScroll?: () => void,
}

export default class Carousel extends Component {
  props: Props
  state: {
    activePage: number
  }
  pager: CarouselPager
  children: any[]
  timer: any
  clearTimeout: any
  setTimeout: any

  static defaultProps = {
    hideIndicators: false,
    indicatorColor: '#000000',
    indicatorSize: 20,
    inactiveIndicatorColor: '#999999',
    indicatorAtBottom: true,
    indicatorOffset: 0,
    indicatorText: '●',
    inactiveIndicatorText: '●',
    width: null,
    height: 200,
    initialPage: 0,
    indicatorSpace: 20,
    animate: true,
    delay: 1000,
    loop: true,
    onScroll: () => {},
  }

  constructor(props: Props) {
    super(props);

    if (!props.height) {
      throw new Error('You must set a height props.');
    }

    this.state = {
      activePage: props.initialPage > 0 ? props.initialPage : 0,
    };

    (this: any).getWidth = this.getWidth.bind(this);
    (this: any).indicatorPressed = this.indicatorPressed.bind(this);
    (this: any).renderPageIndicator = this.renderPageIndicator.bind(this);
    (this: any)._setUpTimer = this._setUpTimer.bind(this);
    (this: any)._animateNextPage = this._animateNextPage.bind(this);
    (this: any)._onAnimationBegin = this._onAnimationBegin.bind(this);
    (this: any)._onAnimationEnd = this._onAnimationEnd.bind(this);
    (this: any)._filterChildren = this._filterChildren.bind(this);
    (this: any)._resetPager = this._resetPager.bind(this);
    this._filterChildren();
  }

  _filterChildren() {
    const {children} = this.props;

    if (!children) {
      throw new Error('You have to set children inside Carousel component');
    }

    // filter undefined children
    this.children = Children.toArray(children).filter((child) => child);
  }

  componentWillReceiveProps(nextProps: Props) {
    this._filterChildren();

    // when received props it will update all views, with new props.
    this.clearTimeout(this.timer);
    this._resetPager();
  }

  componentDidMount() {
    this._resetPager();
  }

  indicatorPressed(activePage: number) {
    this.setState({activePage});
    this.pager.scrollToPage(activePage);
  }

  _resetPager() {
    const {initialPage} = this.props;
    if (initialPage > 0) {
      this.setState({activePage: initialPage});
      this.pager.scrollToPage(initialPage, false);
    }

    if (this.children) {
      this._setUpTimer();
    }
  }

  _setUpTimer() {
    const {animate} = this.props;
    if (this.timer) {
      this.clearTimeout(this.timer);
    }

    if (animate && this.children.length > 1) {
      this.timer = this.setTimeout(this._animateNextPage, this.props.delay);
    }
  }

  getWidth(): number {
    const {width} = this.props;
    if (width) {
      return width;
    }
    return Dimensions.get('window').width;
  }

  _animateNextPage() {
    let {activePage} = this.state;
    if (activePage < this.children.length - 1) {
      activePage++;
    } else if (this.props.loop) {
      activePage = 0;
    } else if (!this.props.loop) {
      // no loop, clear timer
      this.clearTimeout(this.timer);
      return;
    }

    this.indicatorPressed(activePage);
    this._setUpTimer();
  }

  _onAnimationBegin() {
    const {onScrollBegin} = this.props;
    if (onScrollBegin) {
      onScrollBegin();
    }
    this.clearTimeout(this.timer);
  }

  _onAnimationEnd(activePage) {
    const {onPageChange} = this.props;
    if (onPageChange) {
      onPageChange(activePage);
    }
    this.setState({activePage}, this._setUpTimer());
  }

  renderPageIndicator() {
    const {hideIndicators, indicatorOffset,
      indicatorAtBottom, indicatorSpace,
      indicatorColor, inactiveIndicatorColor,
      indicatorSize, indicatorText, inactiveIndicatorText} = this.props;
    const {activePage} = this.state;
    if (hideIndicators === true) {
      return null;
    }

    const indicators = [];
    const positionIndicatorStyle = indicatorAtBottom ?
      {bottom: indicatorOffset} :
      {top: indicatorOffset};
    const indicatorWidth = this.children.length * indicatorSpace;
    let style;
    let position;

    position = {
      minWidth: indicatorWidth,
      left: (this.getWidth() - indicatorWidth) / 2,
    };

    this.children.forEach((child, i) => {
      style = i === activePage ?
        {color: indicatorColor} :
        {color: inactiveIndicatorColor};
      indicators.push(
        <Text
          style={[style, {fontSize: indicatorSize}]}
          key={i}
          onPress={() => this.indicatorPressed(i)}
        >
          {i === activePage ? indicatorText : inactiveIndicatorText}
        </Text>
      );
    });

    // only one item don't need indicators
    if (indicators.length === 1) {
      return null;
    }

    return (
      <View style={[styles.pageIndicator, position, positionIndicatorStyle]}>
        {indicators}
      </View>
    );
  }

  render() {
    const {height, contentContainerStyle, onScroll} = this.props;
    const width = this.getWidth();
    return (
      <View style={{width}}>
        <View style={{width, height, overflow: 'hidden'}}>
          <CarouselPager
            ref={(pager) => {
              this.pager = pager;
            }}
            width={width}
            height={height}
            contentContainerStyle={[
              styles.contentContainer,
              contentContainerStyle,
            ]}
            onScroll={onScroll}
            onBegin={this._onAnimationBegin}
            onEnd={this._onAnimationEnd}
          >
            {this.children}
          </CarouselPager>
        </View>
        {this.renderPageIndicator()}
      </View>
    );
  }
};

reactMixin(Carousel.prototype, TimerMixin);
