/**
 * @flow
 */
import React, {Component} from 'react';
import {
  ViewPagerAndroid,
} from 'react-native';

type Props = {
  width: number,
  onEnd: (activePage: number) => void,
  onBegin: () => void,
  contentContainerStyle: any,
  children: any,
}

export default class CarouselPager extends Component {
  viewPager: ViewPagerAndroid
  props: Props

  constructor(props: Props) {
    super(props);
    (this: any).scrollToPage = this.scrollToPage.bind(this);
    (this: any)._onPageSelected = this._onPageSelected.bind(this);
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

    this._onPageSelected(page);
  }

  _onPageSelected(page) {
    this.props.onEnd(page);
  }

  render() {
    const {children, contentContainerStyle, onBegin} = this.props;
    return (
      <ViewPagerAndroid
        ref={(viewPager) => {
          this.viewPager = viewPager;
        }}
        style={[contentContainerStyle]}
        onPageScroll={onBegin}
        onPageSelected={(e) => this._onPageSelected(e.nativeEvent.position)}
      >
        {children}
      </ViewPagerAndroid>
    );
  }
}
