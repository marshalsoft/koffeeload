import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  TextInput,
  Modal,
  FlatList,
  Animated,
  Linking,
  Picker,
  AsyncStorage,
  Dimensions,
  ActivityIndicator,
  Easing,
  PermissionsAndroid,
  ScrollView,
  DeviceEventEmitter,
  TouchableWithoutFeedback,
  DatePickerAndroid,
  Clipboard,
  BackHandler
} from 'react-native';

import Icons from '../components/font';
import {connect} from 'react-redux';
const {width} = Dimensions.get("window");
class RoundBtn extends React.Component<Props, State> {
  static defaultProps = {
    enable: true,
    style:{height:70,width:70},
    isProcessing:false
  }
  componentWillUnmount()
  {
    this.KeyHide.remove();
    this.KeyShow.remove();
  }
  constructor(props) {
    super(props);
    this.state = {
     enable:!props.enable,
    };
   this.moveElem = new Animated.Value(50);
  }

  componentDidMount() {
    this.KeyShow = Keyboard.addListener("keyboardDidShow",(e)=>{

  Animated.timing(this.moveElem,{
   toValue:parseInt(e.endCoordinates.height)-50,
   duration:100,
   easing:Easing.linear
  }).start()
   })
  this.KeyHide = Keyboard.addListener("keyboardDidHide",(e)=>{
    Animated.timing(this.moveElem,{
    toValue:50,
   duration:100,
   easing:Easing.linear
   }).start()
     })
  }

  render() {
    const { enable} = this.state;
    
    const { isProcessing,showResend,btnColor } = this.props;
    return (<Animated.View style={{position:"absolute",bottom:this.moveElem,right:30,width:this.props.width,height:this.props.height}}>
     <TouchableOpacity {...this.props} >
     {isProcessing && showResend?<ActivityIndicator size="large" color={"white"}/>:<Icons.Ionicons name="ios-arrow-forward" size={40} color={btnColor} />}
     </TouchableOpacity>
     </Animated.View>);
  }
}
RoundBtn.defaultProps = {
  btnColor:"white" 
}
 const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(RoundBtn);
