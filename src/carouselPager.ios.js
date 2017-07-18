/**
 * @flow
 */
import React, {Component, Children} from 'react';
import {
  ScrollView,
} from 'react-native';

type Props = {
  height: number,
  width: number,
  onEnd: (activePage: number) => void,
  onBegin: () => void,
  onScroll: () => void,
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
    const {
      onBegin,
      onScroll,
      children,
      contentContainerStyle,
      width,
      height,
    } = this.props;
    const newChildren = Children.map(children, (element) => {
      if (!React.isValidElement(element)) return;
      const {style, ...restProps} = element.props;
      return React.cloneElement(element, {
        ...restProps,
        // add width and height from contentContainerStyle
        style: [{width, height}, style],
      });
    });

    return (
      <ScrollView
        ref={(scrollView) => {
          this.scrollView = scrollView;
        }}
        contentContainerStyle={contentContainerStyle}
        automaticallyAdjustContentInsets={false}
        scrollEventThrottle={16}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScrollBeginDrag={onBegin}
        onScroll={onScroll}
        onMomentumScrollEnd={this._onMomentumScrollEnd}
        scrollsToTop={false}
      >
        {newChildren}
      </ScrollView>
    );
  }
}
