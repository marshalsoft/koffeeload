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
  ToastAndroid
} from 'react-native';
import mystyle from '../style/mystyle';
import LottieView from 'lottie-react-native';
import Icons from '../components/font';
import { Actions } from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';

class TermsScreen extends React.PureComponent {
componentWillUnmount()
  {
  
}
componentDidMount() {
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
return(<SafeAreaView  style={{flex:1}} >
<View style={mystyle.container}>
   </View>
  </SafeAreaView>);
    }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(TermsScreen);

  

