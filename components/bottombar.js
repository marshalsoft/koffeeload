import React, { Component,PureComponent } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
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
  Image
} from 'react-native';
import mystyle from '../style/mystyle';
import Icons from '../components/font';
import { Actions } from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import moment from 'moment';

class BottomContent extends PureComponent {
    componentDidMount()
    {

    }
   constructor(props)
   {
       super(props);
       this.state = {
        section:""
       }
   }
    
    render()
    {
const color = this.props.focused?mystyle.navtabsTxt_active.color:"#ccc";
return(<View style={{flex:1,justifyContent:"center",alignItems:"center"}}  >
<View style={{height:25,justifyContent:"center",alignItems:"center"}}>
<Image 
style={{width: 20,height: 20 }} 
resizeMode="contain"
source={this.props.title == "Home"?require(`../images/home_icon.png`):this.props.title == "Shop"?require(`../images/shop_icon.png`):require(`../images/account_icon.png`)} 
tintColor={color}  />
</View>
<Text style={[mystyle.navtabsTxt_disable,{color:color}]}>{this.props.title}</Text> 
</View>)
    }
}
BottomContent.defaultProps = {
    selectedTab:"home",
    onPress:()=>{ },
    isProcessing:false
}
const mapStateToProps = (state) => {
    return state;
  };
  export default connect(mapStateToProps)(BottomContent);
  