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
import { Icon } from 'native-base';
const { width,height } = Dimensions.get("window");
class CoffeeListScreen extends React.PureComponent {
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
return(<SafeAreaView  style={[mystyle.container,{width,height,flexDirection:"column"}]} >
<View style={{width,height,flexDirection:"column",paddingBottom:5}}>
<View style={{padding:31,flexDirection:"column"}} >
<View style={{flexDirection:"row",alignItems:"flex-start",width:"100%",height:50}}>
<TouchableOpacity
onPress={()=>{
  Actions.pop();
}}
 style={{top:0,left:0,position:"absolute",height:20}}>
  <Image source={require("../images/arrow_left.png")} style={{width:20,height:20}} />
</TouchableOpacity>
<TouchableOpacity style={{top:0,right:0,position:"absolute",height:"100%"}}>
<Image source={require("../images/cart_icon.png")} resizeMode="contain"  style={{width:25,height:25}} />
</TouchableOpacity>
</View>
<View
style={{
  width: "100%",
height:45,
backgroundColor:"#FFFFFF",
borderRadius:10,
flexDirection:"row",
borderColor:"rgba(0, 0, 0, 0.5)",
alignItems:"center",
overflow:"hidden",
borderWidth:0.5
}}
>
<Icons.Ionicons name="ios-search" style={{color:"#A47551",fontSize:30,margin:10}} />
<TextInput 
placeholder="Search"
placeholderTextColor="#A47551"
/>
</View>
<View style={{height:96,marginVertical:15,width:"100%",backgroundColor:"#ccc",borderRadius:10,overflow:"hidden",justifyContent:"center",alignItems:"center"}}>
<Image source={require("../images/topimage.png")} style={{width:"100%",height:"100%"}} />
<Text style={{position:"absolute",color:"white",fontSize:20}}>Our Coffee</Text>
<View style={{position:"absolute",width:"100%",height:"100%",backgroundColor:"background: rgba(0, 0, 0, 0.08)"}}></View>
</View>
</View>
<FlatList 
showsVerticalScrollIndicator={false}
contentContainerStyle={{flexDirection:"row",flexWrap:"wrap",marginBottom:20,justifyContent:"center",alignItems:"center",width}}
data={this.props.coffeelist}
renderItem={({item,index})=><ItemView 
item={item} 
onPress={()=>{
  
}}
/>}
/>
</View>
  </SafeAreaView>);
    }
}
CoffeeListScreen.defaultProps = {
  coffeelist:[]
}
const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(CoffeeListScreen);

  

