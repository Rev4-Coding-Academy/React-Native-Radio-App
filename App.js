import { LayoutAnimation, Animated,TouchableOpacity, Dimensions, StatusBar ,Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import React, { Component } from 'react';
var {height, width} = Dimensions.get('window');
import { ReactNativeAudioStreaming,Player } from 'react-native-audio-streaming';
import english from './assets/english';
import arabic from './assets/arabic';
import bengali from './assets/bengali';
import hindi from './assets/hindi';
import kannada from './assets/kannada';
import malayalam from './assets/malayalam';
import punjabi from './assets/punjabi';
import tamil from './assets/tamil';
import telugu from './assets/telugu';

StatusBar.setBackgroundColor('coral')

var play_btn=require('./assets/play_btn.png')
var stop_btn=require('./assets/stop.png')

const stations=[
    {char:'A',name:'English',channels:english,image:'http://photoarte.zenfolio.com/img/s11/v37/p16237260-3.jpg'},
    {char:'ह',name:'Hindi',channels:hindi,image:'https://drscdn.500px.org/photo/69181003/m=2048_k=1_a=1/7c5deda65e2d10eefaf34e2ced1ba33f'},
    {char:'ਪੰ',name:'Punjabi',channels:punjabi,image:'http://farm4.staticflickr.com/3083/3124146031_a1c7bba857_b.jpg'},
    {char:'த',name:'Tamil',channels:tamil,image:'http://static.dnaindia.com/sites/default/files/styles/half/public/2015/08/10/363946-shore-temple-getty.jpg?itok=HyG-R55F'},
    {char:'తె',name:'Telugu',channels:telugu,image:'https://cdn.pixabay.com/photo/2015/08/19/15/41/charminar-896162_960_720.jpg'},
    {char:'മ',name:'Malayalam',channels:malayalam,image:'http://maxpixel.freegreatpicture.com/static/photo/1x/Beach-South-India-Kerala-Kovalam-City-Ocean-India-2075353.jpg'},
    {char:'ಕ',name:'Kannada',channels:kannada,image:'http://l7.alamy.com/zooms/0574d5b9865b46e69d5744ea1ac147b4/black-and-white-image-of-a-cathedral-facade-featuring-carved-stone-exjrw1.jpg'},
    {char:'বা',name:'Bengali',channels:bengali,image:'https://upload.wikimedia.org/wikipedia/commons/f/f5/Kolkata_Victoria_Memorial_silhouette.jpg'},
    {char:'عر',name:'Arabic',channels:arabic,image:'http://images.fineartamerica.com/images-medium-large-5/taj-mahal-in-black-and-white-linda-phelps.jpg'},
    {image:''}
  ]
const url=stations[1].channels[2].file;
const smallSize = width / 10;
const itemWidth = width * .67;
const itemHeight = height / 2 - StatusBar.currentHeight * 2;
const fontSize=  250;

const COLORS = ['coral', 'mediumturquoise', 'burlywood', 'orange', 'tomato','plum','goldenrod','palevioletred','lightpink','lightgreen']

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      scrollX: new Animated.Value(0),
      indicator: new Animated.Value(1),
      station:stations[0],
      channel:stations[0].channels[2],
      state:0,//'▷',//'■'▢□,
      color:'coral'
    }
  }

  componentDidMount() {
    LayoutAnimation.spring()
  }

  changeLanguage(i){
    StatusBar.setBackgroundColor(COLORS[i],true)
    this.state.color=COLORS[i];
    this.state.station=stations[i];
    this.setState(this.state);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{height: itemWidth+80}}>
           <Image style={styles.backgroundImage} source={require('./assets/Candid-Background-DARKER.jpg')}>
            <Text style={styles.heading}>
            {this.state.station.name.toUpperCase()}
          </Text>
          {this.renderScroll()}
          {/*<View style={{height:50,width,backgroundColor:'white',paddingTop:65,elevation:5}}>
            <Player url={this.state.url} style={{fontSize:10}}/>
          </View>*/}
        </Image>
        </View>
        <View style={{flex: 1,backgroundColor:'white'}}>
          <ScrollView contentContainerStyle={{alignItems: 'flex-start'}} style={{paddingHorizontal: 12, flex: 1, width: width,paddingTop:20}}>
            {this.state.station.channels.map((channel,i) => {
              return this.renderNormal(channel, i)
            })}
          </ScrollView>
        </View>
        <TouchableOpacity
         onPress={()=>{
           if(this.state.state)ReactNativeAudioStreaming.stop()
           else ReactNativeAudioStreaming.play(this.state.channel.file, {showInAndroidNotifications: true})
           this.state.state=!this.state.state
           this.setState(this.state)
           }}
         style={{position:'absolute',top:10,right:8,flexDirection:'row',elevation:20}}>
          <View>
            <Text style={{fontSize:20,color:'white'}}>
              {(this.state.state)?'■':'▷'}{' '}
            </Text>
          </View>
          <View>
            <Text style={{fontSize:10,fontFamily:'CaviarDreams',color:'white'}}>
              CURRENT
            </Text>
            <Text style={{fontSize:12,fontFamily:'CaviarDreams_Bold',color:'white'}}>
              {this.state.channel.name}
            </Text>
          </View>
          <View style={{marginLeft:3}}>
            <Image source={require('./assets/equalizer.gif')} style={{width:(this.state.state)?40:0,height:40,position:'relative',bottom:10}}/>
          </View>
        </TouchableOpacity>
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
    return <View key={i} style={{marginBottom: 10,paddingBottom: 10,borderBottomColor:'rgba(175, 87, 0,0.1)',borderBottomWidth:1,width:width}}>
      <TouchableOpacity 
        onPress={()=>{
          ReactNativeAudioStreaming.stop()
          if(this.state.channel===channel && this.state.state){
            this.state.state=0
          }
          else{
            ReactNativeAudioStreaming.play(channel.file, {showInAndroidNotifications: true})
            this.state.state=1
            this.state.channel=channel
          }
          this.setState(this.state)
        }} 
        style={{flexDirection: 'row', flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start'}}>
        <Image source={(this.state.channel===channel && this.state.state)?stop_btn:play_btn} style={{height: smallSize, width: smallSize, opacity: 1, resizeMode: 'cover',backgroundColor:this.state.color}} />
        <View style={{marginLeft: 20}}>
          <Text style={{ fontSize: 20,fontFamily:'Champagne & Limousines Bold'}}>{channel.name}</Text>
          <Text style={{fontWeight: '300', fontSize: 20,fontFamily:'Sullivan'}}>{channel.city}</Text>
        </View>
      </TouchableOpacity>
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
            <Text style={{fontSize: fontSize,color: 'white',textAlign:'right'}} onPress={()=>this.changeLanguage(i)}>{station.char}</Text>
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
    justifyContent: 'center',
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
    fontSize: 26,paddingLeft:10,
    width:width,color:'white',
    fontFamily:'CaviarDreams_Bold',
    position:'relative',top:10
  },
  backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    }
});