import React, { PureComponent,createRef } from 'react';
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
import { Icon } from 'native-base';
const { width,height } = Dimensions.get("window");

export default class ItemView extends PureComponent {

  constructor(props)
  {
    super(props);
    this.state ={
      
    }
    
  }
render(){
  const {name,image,refNo,description,id,price,currency} = this.props.item;
  return name == null?<View style={[mystyle.flatitem,{backgroundColor:"#eee"}]}></View>
    :<View style={mystyle.flatitem}>
    <View style={{flexDirection:"column",flex:1,padding:5}}>
  <Image resizeMode="stretch" source={image == null?require("../images/placeholder_box.png"):image} style={{width:"100%",height:"100%"}} />
  </View>
  <View style={{marginBottom:5,alignItems:"center",flexDirection:"column"}}>
<Text style={[mystyle.titleText,{fontSize:10}]}>{name}</Text>
<Text style={{fontSize:10,marginVertical:2}}>{currency}{price}</Text>
 <TouchableOpacity style={mystyle.itembtn}
 onPress={()=>this.props.onPress()}
 >
   <Text style={{color:"white",fontSize:10}}>Add to cart</Text>
 </TouchableOpacity>
  </View>
    </View>;
}
}
ItemView.defaultProps = {
  onPress:()=>{},
  item:{
    price:"",
    name:"",
    image:null,
    id:"",
    description:"",
    currency:""
  }
}


  
