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
import ItemView from '../components/ItemView';
class ShopScreen extends React.PureComponent {
componentWillUnmount()
  {
  
}
componentDidMount() {
 }


componentWillMount()
{
  this.setState({list:this.props.coffeelist})
}

  constructor(props)
  {
    super(props);
    this.state ={
      searchtext:"",
      list:[]
    }
    
  }
 render() {
return(<SafeAreaView  style={[mystyle.container,{width,height,flexDirection:"column"}]} >
<ScrollView 
 keyboardShouldPersistTaps="handled"
 showsVerticalScrollIndicator={false}
 showsHorizontalScrollIndicator={false}
style={{width,height}}>
<View style={{width,minHeight:height,flexDirection:"column",paddingBottom:5}}>
<View style={{padding:31,paddingBottom:0,flexDirection:"column"}} >
<View style={{flexDirection:"row",alignItems:"flex-start",width:"100%",height:50}}>
<TouchableOpacity
onPress={()=>{
  Actions.pop();
}}
 style={{top:0,left:0,position:"absolute",height:20}}>
  <Image source={require("../images/arrow_left.png")} style={{width:20,height:20}} />
</TouchableOpacity>
<TouchableOpacity
onPress={()=>{
  Actions.cart()
}}
 style={{top:8,right:2,position:"absolute",height:"100%"}}>
<Image source={require("../images/cart_icon.png")} resizeMode="contain" style={{width:20,height:20}} />
<Text style={{top:-7,right:-5,position:"absolute",fontSize:12,color:"#FC696F"}}>{this.props.cart_list.length == 0?"":this.props.cart_list.length}</Text>
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
    style={{fontFamily:"OpenSans-Regular",width:"70%"}}
    onChangeText={(d)=>{
      this.setState({searchtext:d},()=>{
        var dd = this.props.coffeelist.filter((a,i)=>String(a.name).toLowerCase().trim().includes(String(d).toLowerCase().trim()))
        if(dd.length != 0)
        {
          if(d != "")
          {
          this.setState({list:dd,searching:true})
          }
        }else{
          this.setState({searching:false,toplist:this.props.coffeelist})
          ToastAndroid.showWithGravity("No item found!",ToastAndroid.SHORT,ToastAndroid.TOP,
      50,
      50);
        }
        
      })
    }}
    value={this.state.searchtext}
    />
    {this.state.searchtext != ""?<TouchableOpacity
     onPress={()=>{
      this.setState({searchtext:"",searching:false},()=>{
        this.setState({list:this.props.coffeelist})
      })
    }} style={{position:"absolute",right:10}}>
      <Icons.AntDesign name="closecircle" size={15} />
    </TouchableOpacity>:null}
   
</View>
<View style={{height:96,marginVertical:15,width:"100%",backgroundColor:"#ccc",borderRadius:10,overflow:"hidden",justifyContent:"center",alignItems:"center"}}>
<Image source={require("../images/sec2.png")} style={{width:"100%",height:"100%"}} />
</View>
</View>
<FlatList 
scrollEnabled={false}
showsHorizontalScrollIndicator={false}
showsVerticalScrollIndicator={false}
contentContainerStyle={{flexDirection:"row",flexWrap:"wrap",marginBottom:50,justifyContent:"center",width,flex:1}}
data={this.state.list}
renderItem={({item,index})=><ItemView item={item} onPress={()=>{
  Actions.details({coffee:item})
}} />}
/>
</View>
</ScrollView>
  </SafeAreaView>);
    }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(ShopScreen);

  

