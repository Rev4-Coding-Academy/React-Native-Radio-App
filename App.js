import { LayoutAnimation, Animated, Dimensions, StatusBar ,Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import React, { Component } from 'react';
var {height, width} = Dimensions.get('window');
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';
import charts from './assets/charts';
import english from './assets/english';
import arabic from './assets/arabic';
import bengali from './assets/bengali';
import hindi from './assets/hindi';
import kannada from './assets/kannada';
import malayalam from './assets/malayalam';
import punjabi from './assets/punjabi';
import tamil from './assets/tamil';

const stations=[
    {name:'Charts',channels:charts,image:'https://s-media-cache-ak0.pinimg.com/564x/1d/00/9d/1d009d53dd993bd0a604397e65bbde6d.jpg'},
    {name:'English',channels:english,image:'https://s-media-cache-ak0.pinimg.com/564x/1d/00/9d/1d009d53dd993bd0a604397e65bbde6d.jpg'},
    {name:'Hindi',channels:hindi,image:'https://s-media-cache-ak0.pinimg.com/564x/1d/00/9d/1d009d53dd993bd0a604397e65bbde6d.jpg'},
    {name:'Punjabi',channels:punjabi,image:'https://s-media-cache-ak0.pinimg.com/564x/1d/00/9d/1d009d53dd993bd0a604397e65bbde6d.jpg'},
    {name:'Tamil',channels:tamil,image:'https://s-media-cache-ak0.pinimg.com/564x/1d/00/9d/1d009d53dd993bd0a604397e65bbde6d.jpg'},
    {name:'Telugu',channels:charts,image:'https://s-media-cache-ak0.pinimg.com/564x/1d/00/9d/1d009d53dd993bd0a604397e65bbde6d.jpg'},
    {name:'Malayalam',channels:malayalam,image:'https://s-media-cache-ak0.pinimg.com/564x/1d/00/9d/1d009d53dd993bd0a604397e65bbde6d.jpg'},
    {name:'Kannada',channels:kannada,image:'https://s-media-cache-ak0.pinimg.com/564x/1d/00/9d/1d009d53dd993bd0a604397e65bbde6d.jpg'},
    {name:'Bengali',channels:bengali,image:'https://s-media-cache-ak0.pinimg.com/564x/1d/00/9d/1d009d53dd993bd0a604397e65bbde6d.jpg'},
    {name:'Arabic',channels:arabic,image:'https://s-media-cache-ak0.pinimg.com/564x/1d/00/9d/1d009d53dd993bd0a604397e65bbde6d.jpg'}
  ]
const url=stations[1].channels[2].file;
const smallSize = width / 5;
const itemWidth = width * .67;
const itemHeight = height / 2 - StatusBar.currentHeight * 2;
const fontSize=  300;

const COLORS = ['coral', 'mediumturquoise', 'palevioletred', 'papayawhip', 'tomato','plum','goldenrod']

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      scrollX: new Animated.Value(0),
      indicator: new Animated.Value(1),
      station:stations[0]
    }
  }

  componentDidMount() {
    LayoutAnimation.spring()
  }

  changeLanguage(i){
    this.state.station=stations[i];
    this.setState(this.state);
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={{height: 20 + height / 2}}>
          <Text style={[styles.heading, {fontSize: 28}]}>Favorites</Text>
          {this.renderScroll()}
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.heading}>{this.state.station.name}</Text>
          <ScrollView contentContainerStyle={{alignItems: 'flex-start'}} style={{paddingHorizontal: 10, flex: 1, width: width}}>
            {this.state.station.channels.map((channel,i) => {
              return this.renderNormal(channel, i)
            })}
          </ScrollView>
          </View>
      </View>
    );
  }

  renderScroll() {
    return <Animated.ScrollView
      horizontal={true}
      style={{flex: 1}}
      contentContainerStyle={{alignItems: 'center', flexGrow: 1}}
      decelerationRate={0}
      snapToInterval={itemWidth}
      scrollEventThrottle={16}
      snapToAlignment="start"
      showsHorizontalScrollIndicator={false}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: this.state.scrollX } } }]
      )}
    >
      {stations.map((station,i) => {
        return this.renderRow(station, i)
      })}
    </Animated.ScrollView>
  }


  renderNormal(channel, i) {
    return <View key={i}  style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
        <Image source={{uri: 'https://s-media-cache-ak0.pinimg.com/564x/e3/44/6f/e3446f61632a9381c96362b45749c5f6.jpg'}} style={[{height: smallSize, width: smallSize, opacity: 1, resizeMode: 'cover'}]} />
        <View style={{marginLeft: 20}}>
          <Text style={{fontWeight: '600', fontSize: 16}}>{channel.name}</Text>
          <Text style={{fontWeight: '300', fontSize: 12}}>{channel.city}</Text>
        </View>
      </View>
  }

  renderRow(station, i) {
    let inputRange = [(i - 1) * itemWidth, i * itemWidth, (i + 1) * itemWidth, (i + 2) * itemWidth];
    let secondRange = [(i - 1) * itemWidth, i * itemWidth, (i + 1) * itemWidth]

    // Ensure that we're leaving space for latest item.
    if (station.image === '') {
      return <View key={i} style={[styles.emptyItem, {width: width * .33}]}></View>
    }

    return (
      <Animated.View key={i} style={[styles.emptyItem, {
        opacity: this.state.scrollX.interpolate({
          inputRange: secondRange,
          outputRange: [.3, 1, 1]
        }),
        height: this.state.scrollX.interpolate({
          inputRange: secondRange,
          outputRange: [itemHeight*0.8, itemHeight, itemHeight],
        })
      }]}>
        <Image key={i} source={{uri: station.image}} style={[StyleSheet.AbsoluteFill, {height: itemHeight, width: itemWidth, opacity: 1, resizeMode: 'cover'}]}>
          <View style={[StyleSheet.AbsoluteFill, {opacity: 0.6, backgroundColor: COLORS[i], width: itemWidth, height: itemHeight}]}>
            <Text style={{fontSize: fontSize,color: 'white',textAlign:'right'}} onPress={()=>this.changeLanguage(i)}>{i+1}</Text>
          </View>
        </Image>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyItem: {
    overflow: 'hidden',
    height: itemHeight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 20,
    borderColor: 'transparent',
    width: itemWidth,
    backgroundColor: 'transparent'
  },
  heading: {
    fontSize: 22,
    fontWeight: '300',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 10,
  }
});