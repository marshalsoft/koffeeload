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
import ItemView from '../components/ItemView';
import { StatusBar } from 'react-native';
const { width,height } = Dimensions.get("window");
class HomeScreen extends React.PureComponent {

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
<ScrollView 
 keyboardShouldPersistTaps="handled"
 showsVerticalScrollIndicator={false}
 showsHorizontalScrollIndicator={false}
style={{height,width}}>
<View style={[mystyle.container,{flexDirection:"column"}]}>
<View style={{padding:31,paddingBottom:0,flexDirection:"column",width}} >
<View style={{flexDirection:"row",alignItems:"center",width:"100%",justifyContent:"flex-start"}}>
<Text style={{fontFamily:"playfairdisplay_bold",fontSize:24,color:"#000000"}}>Welcome Adedire</Text>
<TouchableOpacity
onPress={()=>{
  Actions.cart()
}}
 style={{top:8,right:2,position:"absolute",height:"100%"}}>
<Image source={require("../images/cart_icon.png")} resizeMode="contain" style={{width:20,height:20}} />
<Text style={{top:-7,right:-5,position:"absolute",fontSize:12,color:"#FC696F"}}>{this.props.cart_list.length == 0?"":this.props.cart_list.length}</Text>
</TouchableOpacity>
</View>
<View style={{height:134,width:"100%",backgroundColor:"#ccc",borderRadius:10,top:10,overflow:"hidden"}}>
<Image source={require("../images/topimage.png")} style={{width:"100%",height:"100%"}} />
</View>
<View style={{width:"100%",marginTop:20}}>
<Image resizeMode="stretch" source={require("../images/koffee_name.png")} style={{width:132,height:16}} />
</View>
<View style={{width:"100%",marginTop:10}}>
<Text style={mystyle.subtext}>We have sourced the finest and rarest coffees, that easily allows coffee lovers to experience one of life's simple pleasures delivered right to your doorstep.</Text>
</View>
<View style={{height:96,width:"100%",backgroundColor:"#ccc",borderRadius:10,top:10,overflow:"hidden",justifyContent:"center",alignItems:"center"}}>
<Image source={require("../images/sec2.png")} style={{width:"100%",height:"100%"}} />
</View>
<View style={{width:"100%",marginTop:10}}>
<Text style={{fontFamily:"opensans_bold",fontSize:12,fontWeight:"bold",marginVertical:10,color:"black"}}>Top Selling Coffee</Text>
</View>
</View>
<View style={{justifyContent:"center",flexDirection:"row",flexWrap:"wrap",marginBottom:20,width}}>
{this.props.coffeelist.filter((a,i)=>i < 3).map((item,index)=><ItemView item={item} onPress={()=>{
 Actions.details({coffee:item})
}} />)}
</View>
<TouchableOpacity
onPress={()=>{
  Actions.shop();
}}
 style={mystyle.whitebtn}>
  <Text style={{fontWeight:"bold",fontSize:12,fontFamily:"opensans_bold",color:"black"}}>Create a Coffee Plans</Text>
</TouchableOpacity>
</View>
</ScrollView>
  </SafeAreaView>);
    }
}
HomeScreen.defaultProps ={ 
  coffeelist:[]
}
const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(HomeScreen);

  

