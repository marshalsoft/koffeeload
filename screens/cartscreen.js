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
  Alert,
  StatusBar
} from 'react-native';
import mystyle from '../style/mystyle';
import LottieView from 'lottie-react-native';
import Icons from '../components/font';
import { Actions } from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
const { width,height } = Dimensions.get("window");
import ItemView from '../components/ItemView';
class CartScreen extends React.PureComponent {
componentWillUnmount()
  {
}
componentDidMount() {
  // alert(JSON.stringify(this.props.recent_views))
 }


componentDidUnMount()
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
<Text style={[mystyle.titleText,{fontSize:24,position:"absolute",bottom:10,left:24}]}>Cart</Text>
</View>
<ScrollView style={{flex:1,width,backgroundColor:"white"}} 
 keyboardShouldPersistTaps="handled"
 showsVerticalScrollIndicator={false}
 showsHorizontalScrollIndicator={false}
>
    <View style={{width,minHeight:height,flexDirection:"column",paddingBottom:5}}>
    {this.props.cart_list.length == 0?<View style={{padding:10,flexDirection:"column",width:"100%",backgroundColor:"#FFDADB"}}>
      <Text>No Item found!</Text>
    </View>:<View style={{padding:31,paddingBottom:5,flexDirection:"column"}} >
    <FlatList
    data={this.props.cart_list}
    renderItem={({item,index})=><View style={{flexDirection:"column",height:147,marginVertical:15,width:"100%",backgroundColor:"#E4D4C8",borderRadius:10,overflow:"hidden",justifyContent:"center",alignItems:"center"}}>
    <View style={{flex:1,flexDirection:"row",marginBottom:20}}>
    <View style={{padding:10}}>
    <Image resizeMode="stretch" source={item.image} style={{width:90.01,height:69.69}} />
    </View>
    <View style={{flex:1,flexDirection:"column"}}>
    <Text style={{fontFamily:"Open Sans",fontSize:18,fontWeight:"700",marginVertical:10,color:"#000000"}} ellipsizeMode="tail" numberOfLines={1}>{item.name}</Text>
    <Text style={{fontFamily:"Open Sans",fontSize:12,fontWeight:"600",color:"#000000"}}>{item.currency}{item.price}</Text>
    </View>
    </View>
   <Image source={require("../images/line.png")} style={{width:"90%",height:1.5}} />
   <View style={{flexDirection:"row",height:40,width:"100%",alignItems:"center",marginTop:10}}>
   <TouchableOpacity style={{padding:10,justifyContent:"center",alignItems:"center",marginLeft:10}}>
   <Image source={require("../images/save_order_icon.png")} resizeMode="contain" style={{width:18,height:18}} />
</TouchableOpacity>
<TouchableOpacity 
onPress={()=>{
  Alert.alert("Alert","Are you sure you want to remove this item?",[
    {text:"No",onPress:()=>{
      
    }},
    {text:"Yes",onPress:()=>{
      this.props.dispatch({type:"update",data:{cart_list:this.props.cart_list.filter((a,i)=>i != index)}})
    }},
  ],{style:"cancel"})
}}
style={{padding:10,justifyContent:"center",alignItems:"center"}}>
   <Image source={require("../images/delete.png")} resizeMode="contain" style={{width:18,height:18}} />
</TouchableOpacity>
<TouchableOpacity
onPress={()=>{
  Alert.alert("Alert","Are you sure you want to remove this item?",[
    {text:"No",onPress:()=>{
      
    }},
    {text:"Yes",onPress:()=>{
   this.props.dispatch({type:"update",data:{cart_list:this.props.cart_list.filter((a,i)=>i != index)}})
    }},
  ],{style:"cancel"})
}}
 style={{flex:1,flexDirection:"column"}}>
<Text style={[mystyle.titleText,{fontSize:12}]}>Remove</Text>
   </TouchableOpacity>
   <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
   <TouchableOpacity  onPress={()=>{
   this.props.dispatch({type:"update",data:{cart_list:this.props.cart_list.map((a,i)=>{
     if(a.qty >= 2 && index == i)
     {
       a.qty = a.qty - 1;
     }
     return a;
   })}})

     }} style={{padding:10,justifyContent:"center",alignItems:"center"}}>
   <Image source={require("../images/minus_icon.png")} resizeMode="contain" style={{width:18,height:18}} />
</TouchableOpacity>
   <View style={[mystyle.InputWrp,{width:40,height:30,borderRadius:2,justifyContent:"center",alignItems:"center"}]}>
     <Text>{item.qty}</Text>
     </View> 
     <TouchableOpacity
     onPress={()=>{
   this.props.dispatch({type:"update",data:{cart_list:this.props.cart_list.map((a,i)=>{
     if(a.qty >= 1 && i == index)
     {
       a.qty = a.qty + 1;
     }
     return a;
   })}})

     }}
      style={{padding:10,justifyContent:"center",alignItems:"center"}}>
   <Image source={require("../images/plus_icon.png")} resizeMode="contain" style={{width:18,height:18}} />
</TouchableOpacity>
   </View>
   </View>
    </View>} />
    <View style={{flexDirection:"row"}}>
    <Text style={{fontFamily:"Open Sans",fontSize:14,fontWeight:"700",marginVertical:10,color:"#000000",flex:1}}>Total</Text>
    <Text style={{fontFamily:"Open Sans",fontSize:14,fontWeight:"700",marginVertical:10,color:"#000000",flex:1,textAlign:"right"}}>{this.props.cart_list[0].currency}{[{price:0,qty:1},...this.props.cart_list].map((a,i)=>parseFloat(a.price)*parseInt(a.qty)).reduce((a,b)=>parseFloat(a) + parseFloat(b))}</Text>
</View>
<TouchableOpacity style={[mystyle.itembtn,{height:48,alignSelf:"center"}]}
 onPress={()=>{
var  total = [{price:0,qty:1},...this.props.cart_list].map((a,i)=>parseFloat(a.price)*parseInt(a.qty)).reduce((a,b)=>parseFloat(a) + parseFloat(b))
 Alert.alert("Check out",`Total checkout value: ${this.props.cart_list[0].currency}${total}\n Are you sure you want to proceed?`,[
   {text:"No",onPress:()=>{

   }},
   {text:"Yes",onPress:()=>{
     
    }}
 ],{style:"cancel"})
 }}
 >
   <Text style={{color:"white",fontSize:12}}>Complete Your Order</Text>
 </TouchableOpacity>
 <View style={{width:"100%",marginTop:0}}>
<Text style={{fontFamily:"Open Sans",fontSize:12,fontWeight:"bold",marginTop:10,marginBottom:0}}>Recently Viewed</Text>
</View>
</View>}
    <FlatList 
    scrollEnabled={false}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{flexDirection:"row",flexWrap:"wrap",marginBottom:20,justifyContent:"center",alignItems:"center",width}}
    data={[...this.props.recent_views,
      ...[{name:null},
      {name:null},
      {name:null},
      {name:null},
      {name:null},
      {name:null}].filter((a,i,self)=>i < (self.length - this.props.recent_views.length)),
      ]}
    renderItem={({item,index})=><ItemView item={item} 
      onPress={()=>{
      Actions.popTo("details",{coffee:item})
      }}
    />}
    />
    </View>
     </ScrollView> 
     </View>
  </SafeAreaView>);
    }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(CartScreen);

  

