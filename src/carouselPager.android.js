/**
 * @flow
 */
import React, {Component} from 'react';
import {
  ViewPagerAndroid,
} from 'react-native';

type Props = {
  width: number,
  height: number,
  onEnd: (activePage: number) => void,
  onBegin: () => void,
  onScroll: () => void,
  contentContainerStyle: any,
  children: any,
}

export default class CarouselPager extends Component {
  viewPager: ViewPagerAndroid
  props: Props

  state: {
    pageState: string
  }

  constructor(props: Props) {
    super(props);
    (this: any).scrollToPage = this.scrollToPage.bind(this);
    (this: any)._pageStateChange = this._pageStateChange.bind(this);
    (this: any)._selectedPage = this._selectedPage.bind(this);
    (this: any)._pageScroll = this._pageScroll.bind(this);

    this.state = {
      pageState: 'idle',
    };
  }

  scrollToPage(page: number, animated?: boolean) {
    if (typeof animated === 'undefined') {
      animated = true;
    }
    if (animated) {
      this.viewPager.setPage(page);
    } else {
      this.viewPager.setPageWithoutAnimation(page);
    }
  }

  _pageScroll() {
    const {onScroll} = this.props;
    onScroll();
  }

  _selectedPage(e) {
    const {onEnd} = this.props;
    const activePage = e.nativeEvent.position;
    this.setState({activePage});

    onEnd(activePage);
  }

  _pageStateChange(pageState) {
    const {onBegin} = this.props;
    if (pageState === 'dragging') {
      // if page state is dragging, call on begin
      return this.setState({pageState}, onBegin());
    }
    return this.setState({pageState});
  }

  render() {
    const {children, contentContainerStyle, width, height} = this.props;
    return (
      <ViewPagerAndroid
        ref={(viewPager) => {
          this.viewPager = viewPager;
        }}
        style={[contentContainerStyle, {width, height}]}
        onPageScroll={this._pageScroll}
        onPageScrollStateChanged={this._pageStateChange}
        onPageSelected={this._selectedPage}
      >
        {children}
      </ViewPagerAndroid>
    );
  }
}
