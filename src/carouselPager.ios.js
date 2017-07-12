/**
 * @flow
 */
import React, {Component} from 'react';
import {
  ScrollView,
} from 'react-native';

type Props = {
  width: number,
  onEnd: (activePage: number) => void,
  onBegin: () => void,
  contentContainerStyle: any,
  children: any,
}

export default class CarouselPager extends Component {
  props: Props
  scrollView: ScrollView

  constructor(props: Props) {
    super(props);
    (this: any).scrollToPage = this.scrollToPage.bind(this);
    (this: any)._onMomentumScrollEnd = this._onMomentumScrollEnd.bind(this);
  }

  scrollToPage(page: number, animated?: boolean) {
    if (typeof animated === 'undefined') {
      animated = true;
    }

    this.scrollView.scrollTo({
      x: page * this.props.width,
      y: 0,
      animated,
    });
  }

  _onMomentumScrollEnd(e) {
    const {onEnd, width} = this.props;
    const activePage = e.nativeEvent.contentOffset.x / width;
    onEnd(activePage);
  }

  render() {
    const {onBegin, children, contentContainerStyle} = this.props;
    return (
      <ScrollView
        ref={(scrollView) => {
          this.scrollView = scrollView;
        }}
        contentContainerStyle={contentContainerStyle}
        automaticallyAdjustContentInsets={false}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScrollBeginDrag={onBegin}
        onMomentumScrollEnd={this._onMomentumScrollEnd}
        scrollsToTop={false}
      >
        {children}
      </ScrollView>
    );
  }
}
