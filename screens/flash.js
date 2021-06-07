import React, { Component,createRef } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
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
  BackHandler,
  ToastAndroid,
  StatusBar
} from 'react-native';
import mystyle from '../style/mystyle';
import LottieView from 'lottie-react-native';
import Icons from '../components/font';
import { Actions } from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';

class FlashScreen extends React.PureComponent {
componentWillUnmount()
  {
  
}
componentDidMount() {
  StatusBar.setHidden(true);
  setTimeout(()=>{
  Actions.reset("login");
  },1000)
 }


componentWillMount()
{
  
}

  constructor(props)
  {
    super(props);
    this.state ={
      
    }
    
  }
 render() {
return(<SafeAreaView style={{flex:1}} >
<View style={[mystyle.container,{justifyContent:"center",alignItems:"center"}]}>
<Image source={require("../images/koffee_name.png")} style={{width:205,height:24}} />
   </View>
  </SafeAreaView>);
    }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(FlashScreen);

  

