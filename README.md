# react-native-carousel-view

react-native carousel, work on both `iOS` and `android`, test on RN 0.46.1

## Demo

<img src="./example/android.gif" width="300" style="float: left;">
<img src="./example/ios.gif" width="300" style="float: left;">

## Props

```js
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
  contentContainerStyle?: {[attr: string]: any},
  children: any,
  onPageChange?: (number) => void,
}
```

default props:

```js
static defaultProps = {
  hideIndicators: false,
  indicatorColor: '#000000',
  indicatorSize: 20,
  inactiveIndicatorColor: '#999999',
  indicatorAtBottom: true,
  indicatorOffset: 0,
  indicatorText: '•',
  inactiveIndicatorText: '•',
  width: null,
  initialPage: 0,
  indicatorSpace: 10,
  animate: true,
  delay: 1000,
  loop: true,
}
```

## NOTE

this repo is original from https://github.com/nick/react-native-carousel with lots of improvements.

## License

Apache 2.0