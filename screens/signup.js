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
class SignUpScreen extends React.PureComponent {
componentWillUnmount()
  {
  
}
componentDidMount() {
 }
checkPassword(d){
  var regex = /[a-z]/;
  var regexCap = /[A-Z]/;
  var regexSp = /[!@#$%^&*()\-_=+{};:,<.>]/;
  var regexNum = /[0-9]/;

  if(regex.test(d) && regexCap.test(d) && regexSp.test(d) && regexNum.test(d)) {
        return true;
    }
return false;  
}

componentWillMount()
{
  
}

  constructor(props)
  {
    super(props);
    this.state = {
      info:"",
      loader:false,
      processing:false
    }
  }
  registerUser()
{
  // api call
  this.setState({loader:true,processing:true});
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
    this.setState({loader:false});
    resolve(true)
  },1000)
  })
}
validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
 render() {
return(<KeyboardAvoidingView  
keyboardVerticalOffset={40}
behavior="padding"
style={{flex:1}} >
<View style={[mystyle.container,{justifyContent:"center",flexDirection:"column"}]}>
<ScrollView 
 keyboardShouldPersistTaps="handled"
 showsVerticalScrollIndicator={false}
 showsHorizontalScrollIndicator={false}
style={{width,flex:1}}
>
<View style={{width,padding:44,flexDirection:"column",alignItems:"center"}}>
<Image source={require("../images/koffee_name.png")} style={{width:205,height:24,marginTop:30}} />
<View style={{width,padding:44,minHeight:height-260,flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
<Text style={[mystyle.titleText,{fontSize:18,alignSelf:"flex-start",marginTop:30,marginBottom:20}]}>Create an Account</Text>
<Text style={[mystyle.titleText,{fontSize:12,alignSelf:"flex-start",marginTop:10}]}>Email</Text>
<View style={mystyle.InputWrp}>
<TextInput 
style={{width:"100%",height:"100%",paddingHorizontal:20}}
placeholder=""
maxLength={50}
onChangeText={(d)=>this.setState({email:String(d).replace(" ","")})}
/>
</View>
<Text style={[mystyle.titleText,{fontSize:12,alignSelf:"flex-start",marginTop:10}]}>Password</Text>
<View style={mystyle.InputWrp}>
<TextInput 
style={{width:"100%",height:"100%",paddingHorizontal:20}}
placeholder=""
maxLength={50}
onChangeText={(d)=>this.setState({password:String(d).replace(" ","")})}
secureTextEntry={true}
/>
</View>
<Text style={[mystyle.titleText,{fontSize:12,alignSelf:"flex-start",marginTop:10}]}>Confirm Password</Text>
<View style={mystyle.InputWrp}>
<TextInput 
style={{width:"100%",height:"100%",paddingHorizontal:20}}
placeholder=""
maxLength={50}
onChangeText={(d)=>this.setState({confirm_password:String(d).replace(" ","")})}
secureTextEntry={true}
/>
</View>
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
   }else if(!this.checkPassword(this.state.password))
   {
    Alert.alert("Oops!","Password must have upper and lower case, number or  special character",[
      {text:"Cancel",onPress:()=>{

      }},
      {style:"cancel"}
    ])
   }else if(this.state.confirm_password == "")
   {
    Alert.alert("Oops!","Enter confirm password.",[
      {text:"Cancel",onPress:()=>{

      }},
      {style:"cancel"}
    ])
   }else if(this.state.password != this.state.confirm_password)
   {
    Alert.alert("Oops!","Password not matched.",[
      {text:"Cancel",onPress:()=>{

      }},
      {style:"cancel"}
    ])
   }else{
   this.registerUser().then((res)=>{
    alert("This is for demo.")
   })
   }
 }}
 >
 <Text style={{color:"white",fontSize:12,fontWeight:"bold"}}>Sign Up</Text>
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
</KeyboardAvoidingView>);
    }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(SignUpScreen);

  

