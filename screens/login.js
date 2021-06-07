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
  StatusBar,
  Alert
} from 'react-native';
import mystyle from '../style/mystyle';
import LottieView from 'lottie-react-native';
import Icons from '../components/font';
import { Actions } from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
const { width,height } = Dimensions.get("window");
import PreLoader from '../components/loader';

class LoginScreen extends React.PureComponent {
componentWillUnmount()
  {
  
}
componentDidMount() {
  StatusBar.setBackgroundColor("#D0B49F");
 }


componentWillMount()
{
  
}
LoginUser()
{
  // api call
  this.setState({loader:true,processing:true});
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
    this.setState({loader:false});
    resolve(true)
  },500)
  })
}
  constructor(props)
  {
    super(props);
    this.state ={
      email:"",
      password:"",
      loader:false,
      info:"",
      processing:false
    }
    
  }
   validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
 render() {
return(<SafeAreaView  style={{flex:1}} >
<View style={[mystyle.container,{justifyContent:"center",flexDirection:"column"}]}>
<ScrollView 
 keyboardShouldPersistTaps="handled"
 showsVerticalScrollIndicator={false}
 showsHorizontalScrollIndicator={false}
style={{width,flex:1}}
>
<View style={{width,padding:44,flexDirection:"column",alignItems:"center"}}>
<Image source={require("../images/koffee_name.png")} style={{width:205,height:24,marginTop:30}} />
<View style={{width,padding:44,minHeight:height-200,flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
<Text style={[mystyle.titleText,{fontSize:12,alignSelf:"flex-start"}]}>Email</Text>
<View style={mystyle.InputWrp}>
<TextInput 
style={{width:"100%",height:"100%",paddingHorizontal:20}}
placeholder=""
maxLength={50}
onChangeText={(d)=>this.setState({email:String(d).replace(" ","")})}
value={this.state.email}
/>
</View>
<Text style={[mystyle.titleText,{fontSize:12,alignSelf:"flex-start",marginTop:20}]}>Password</Text>
<View style={mystyle.InputWrp}>
<TextInput 
style={{width:"100%",height:"100%",paddingHorizontal:20}}
placeholder=""
maxLength={50}
onChangeText={(d)=>this.setState({password:String(d).replace(" ","")})}
secureTextEntry={true}
value={this.state.password}
/>
</View>
<TouchableOpacity
style={{paddingVertical:5,alignSelf:"flex-end"}}
>
<Text style={[mystyle.titleText,{fontSize:12}]}>Forget Password?</Text>
</TouchableOpacity>
<TouchableOpacity style={[mystyle.itembtn,{height:48,width:"100%",marginTop:40}]}
 onPress={()=>{
  if(this.state.email == "")
   {
    Alert.alert("Oops!","Enter email address.",[
      {text:"Cancel",onPress:()=>{

      }},
      {style:"cancel"}
    ])
   }else if(!this.validateEmail(this.state.email))
   {
    Alert.alert("Oops!","Enter a valid email address.",[
      {text:"Cancel",onPress:()=>{

      }},
      {style:"cancel"}
    ])
   }else if(this.state.password == "")
   {
    Alert.alert("Oops!","Enter your password.",[
      {text:"Cancel",onPress:()=>{

      }},
      {style:"cancel"}
    ])
   }else{
   this.LoginUser().then((res)=>{
    Actions.reset("dashboard");
   })
   }
 }}
 >
   <Text style={{color:"white",fontSize:12,fontWeight:"bold"}}>Login</Text>
 </TouchableOpacity>
 <View style={{width:"100%",flexDirection:"row",justifyContent:"center",alignSelf:"center",marginTop:30}}>
   <View style={{flex:1,justifyContent:"center",alignSelf:"center"}}>
   <Image source={require("../images/line.png")} style={{width:"100%",height:2}} />
   </View> 
   <View style={{width:30,justifyContent:"center",alignSelf:"center"}}>
    <Text style={[mystyle.titleText,{fontSize:16,alignSelf:"center"}]}>OR</Text>
    </View>
  <View style={{flex:1,justifyContent:"center",alignSelf:"center"}}>
  <Image source={require("../images/line.png")} style={{width:"100%",height:2}} />
 </View>
 </View>
 <TouchableOpacity
 onPress={()=>{
   Actions.signup();
 }}
style={[mystyle.whitebtn,{height:48,width:"100%",marginTop:40}]}
 >
 <Text style={{color:"black",fontSize:12,fontWeight:"bold"}}>Sign Up with Email</Text>
 </TouchableOpacity>
 <TouchableOpacity
 onPress={()=>{
  
 }}
style={[mystyle.whitebtn,{height:48,width:"100%",marginTop:20}]}
 >
 <Text style={{color:"black",fontSize:12,fontWeight:"bold"}}>Sign in with Google</Text>
 </TouchableOpacity>
</View>
</View>
</ScrollView>
<TouchableOpacity
style={{paddingVertical:20}}
>
<Text style={[mystyle.titleText,{fontSize:12}]}>Terms of Service and Privacy Policy</Text>
</TouchableOpacity>
</View>
<PreLoader 
  {...this.state}
  returnData={(d)=>this.setState(d)}
/> 
</SafeAreaView>);
    }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(LoginScreen);

  

