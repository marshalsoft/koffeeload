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
const { width,height } = Dimensions.get("window");
class AccountScreen extends React.PureComponent {
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
<View style={[mystyle.container,{backgroundColor:"#A47551",flexDirection:"column"}]}>
<View style={{height:125,width,flexDirection:"column",padding:24}}>
<Text style={{fontSize:24,fontFamily:"playfairdisplay_bold",color:"black"}}>Account</Text>
<Text style={{fontFamily:"playfairdisplay_bold",color:"black",fontSize:14,position:"absolute",bottom:10,left:24}}>Welcome Adedire!</Text>
</View>
<ScrollView 
 keyboardShouldPersistTaps="handled"
 showsVerticalScrollIndicator={false}
 showsHorizontalScrollIndicator={false}
style={{flex:1,width}} 
showsVerticalScrollIndicator={false}
showsHorizontalScrollIndicator={false}
>
<View style={{flex:1,width,backgroundColor:"white",flexDirection:"column",padding:24}}>
<Text style={{fontSize:14,marginTop:20,fontFamily:"playfairdisplay_bold",color:"black"}}>My Coffee Account</Text>
<TouchableOpacity style={mystyle.linebtn}>
<Image source={require("../images/order_icon.png")} resizeMode="contain" style={{width:20,height:20,marginRight:10,color:"#000000"}} />
<Text style={{fontWeight:"bold",fontSize:12,color:"#000000"}}>Orders</Text>
<Icons.MaterialIcons name="keyboard-arrow-right"  style={{position:"absolute",right:10,fontSize:30,color:"#000000"}} />
</TouchableOpacity>
<TouchableOpacity style={mystyle.linebtn}>
<Image source={require("../images/pending_icon.png")}  resizeMode="contain" style={{width:20,height:20,marginRight:10,color:"#000000"}} />
<Text style={{fontWeight:"bold",fontSize:12,color:"#000000"}}>Pending Orders</Text>
<Icons.MaterialIcons name="keyboard-arrow-right" style={{position:"absolute",right:10,fontSize:30,color:"#000000"}} />
</TouchableOpacity>
<TouchableOpacity style={mystyle.linebtn}>
<Image source={require("../images/save_order_icon.png")}  resizeMode="contain" style={{width:20,height:20,marginRight:10,color:"#000000"}} />
<Text style={{fontWeight:"bold",fontSize:12,color:"#000000"}}>Saved Orders</Text>
<Icons.MaterialIcons name="keyboard-arrow-right" style={{position:"absolute",right:10,fontSize:30,color:"#000000"}} />
</TouchableOpacity>
<TouchableOpacity style={mystyle.linebtn}>
<Image source={require("../images/recent_icon.png")}  resizeMode="contain" style={{width:20,height:20,marginRight:10,color:"#000000"}} />
<Text style={{fontWeight:"bold",fontSize:12,color:"#000000"}}>Recently Viewed</Text>
<Icons.MaterialIcons name="keyboard-arrow-right" style={{position:"absolute",right:10,fontSize:30,color:"#000000"}} />
</TouchableOpacity>
<Text style={[mystyle.titleText,{fontSize:14,marginTop:20,fontFamily:"playfairdisplay_bold",color:"black"}]}>My Settings</Text>
<TouchableOpacity style={mystyle.linebtn}>
<Image source={require("../images/user_icon.png")}  resizeMode="contain" style={{width:20,height:20,marginRight:10,color:"#000000"}} />
<Text style={{fontWeight:"bold",fontSize:12,color:"#000000",color:"#000000"}}>My Account Settings</Text>
<Icons.MaterialIcons name="keyboard-arrow-right" style={{position:"absolute",right:10,fontSize:30,color:"#000000"}} />
</TouchableOpacity>
<TouchableOpacity style={mystyle.linebtn}>
<Image source={require("../images/payment_icon.png")}  resizeMode="contain" style={{width:20,height:20,marginRight:10,color:"#000000"}} />
<Text style={{fontWeight:"bold",fontSize:12,color:"#000000"}}>Payment Method</Text>
<Icons.MaterialIcons name="keyboard-arrow-right" style={{position:"absolute",right:10,fontSize:30,color:"#000000"}} />
</TouchableOpacity>
<TouchableOpacity style={mystyle.linebtn}>
<Image source={require("../images/security_icon.png")} resizeMode="contain" style={{width:20,height:20,marginRight:10,color:"#000000"}} />
<Text style={{fontWeight:"bold",fontSize:12,color:"#000000"}}>Security</Text>
<Icons.MaterialIcons name="keyboard-arrow-right" style={{position:"absolute",right:10,fontSize:30,color:"#000000"}} />
</TouchableOpacity>
<TouchableOpacity style={[mystyle.itembtn,{height:52,borderRadius:10,alignSelf:"center",marginTop:20,marginBottom:90}]}
 onPress={()=>{
   Actions.reset("login");
 }}
 >
   <Text style={{color:"white",fontSize:12,fontFamily:"opensans_bold"}}>Log Out</Text>
 </TouchableOpacity>
</View>
 </ScrollView>
   </View>
  </SafeAreaView>);
    }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(AccountScreen);

  

