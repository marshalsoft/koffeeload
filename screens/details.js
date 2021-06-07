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
import { Alert } from 'react-native';
const { width,height } = Dimensions.get("window");
import ItemView from '../components/ItemView';

class DetailsScreen extends React.PureComponent {
componentWillUnmount()
  {
  
}
componentDidMount() {
  var cofeeExist = this.props.recent_views.map((a,i)=>a.name);
  if(!cofeeExist.includes(this.props.coffee.name))
  {
  this.props.dispatch({type:"update",data:{recent_views:[...this.props.recent_views,this.props.coffee]}})
 }
 this.setState({...this.props.coffee,toplist:this.props.coffeelist})
}
componentWillMount()
{
  
}

  constructor(props)
  {
    super(props);
    this.state ={
      qty:1,
      name:"",
      description:"",
      price:"",
      image:null,
      refNo:"",
      toplist:[],
      searchtext:"",
      searching:false
    }
    
  }
  render() {
    const {name,description,price,image,refNo,currency,toplist,searching} = this.state
    return(<SafeAreaView  style={[mystyle.container,{width,height,flexDirection:"column"}]} >
    <ScrollView 
     keyboardShouldPersistTaps="handled"
 showsVerticalScrollIndicator={false}
 showsHorizontalScrollIndicator={false}
    ref={e=>this.scrVW = e}
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
    onChangeText={(d)=>{
      this.setState({searchtext:d},()=>{
        var dd = this.props.coffeelist.filter((a,i)=>String(a.name).toLowerCase().trim().includes(String(d).toLowerCase().trim()))
        if(dd.length != 0)
        {
          if(d != "")
          {
          this.setState({toplist:dd,searching:true})
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
        this.setState({toplist:this.props.coffeelist})
      })
    }} style={{position:"absolute",right:10}}>
      <Icons.AntDesign name="closecircle" size={15} />
    </TouchableOpacity>:null}
    </View>
   <Animatable.View 
    animation={
      searching?{from:{
      height:420
    },
    to:{
      height:0
      }}:
    {from:{
      height:0
    },
    to:{
      height:450
      }}
    }
   duration={500}
    style={{overflow:"hidden"}}>
    <View style={{height:196,marginVertical:15,width:"100%",backgroundColor:"#ccc",borderRadius:10,overflow:"hidden",justifyContent:"center",alignItems:"center"}}>
    {image != null?<Image source={image} resizeMode="cover" style={{width:"115%",height:"100%"}} />:null}
    <View style={{position:"absolute",width:"100%",padding:20,bottom:0,justifyContent:"center",alignItems:"center",backgroundColor:"background: rgba(0, 0, 0, 0.7)"}}>
    <Text style={{color:"white",fontSize:24}}>{name}</Text>
    </View>
    </View>
    <Text ellipsizeMode="tail" numberOfLines={4} >{description}</Text>
    <Text style={{fontFamily:"Open Sans",fontSize:14,fontWeight:"700",marginVertical:10,color:"#000000"}}>SKU: {String(refNo).toUpperCase()}</Text>
    <Text style={{fontFamily:"Open Sans",fontSize:18,fontWeight:"700",marginBottom:10,color:"#000000"}}>{`${currency}${price}`}</Text>
    <View style={{width:40,marginVertical:10,justifyContent:"center",alignItems:"center",width:"100%",flexDirection:"row"}}>
    <View style={{width:80,backgroundColor:"white",borderRadius:10,justifyContent:"center",alignItems:"center",flexDirection:"row",paddingHorizontal:10}}>
    <Icons.Ionicons name="ios-arrow-down" size={20} />
    <Picker
style={{width:100,marginRight:-70,backgroundColor:"transparent"}}
mode="dropdown"
onValueChange={(d,i)=>{
this.setState({qty:parseInt(d)})

}}
selectedValue={String(this.state.qty)}
>
{[
  {name:"1"},
  {name:"2"},
  {name:"3"},
  {name:"4"}
].map((a,i)=><Picker.Item 
  key={i} value={a.name} label={a.name}
   />)}
</Picker>
</View>
<View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
<TouchableOpacity style={[mystyle.itembtn,{height:48}]}
 onPress={()=>{
   var selectedCoffee = {
     name,
     refNo,
   description,
   price,
   image,
   currency,
   qty:this.state.qty
   }
   if(this.props.cart_list.filter((a,i)=>a.refNo == refNo).length == 0)
   {
   this.props.dispatch({type:"update",data:{cart_list:[selectedCoffee,...this.props.cart_list]}})
    Actions.cart();
   }else{
     alert("Item already added to shopping cart");
   }
 }}
 >
   <Text style={{fontFamily:"opensans_bold",color:"white",fontSize:12}}>Add to cart</Text>
 </TouchableOpacity>
</View>
    </View>
 <View style={{width:"100%",marginTop:0}}>
<Text style={{fontFamily:"opensans_bold",fontSize:12,fontWeight:"bold",marginVertical:10,color:'#000000'}}>Top Selling Coffee</Text>
</View>
</Animatable.View>
</View>
    <FlatList 
    style={{backgroundColor:"#D0B49F",marginTop:10}}
    scrollEnabled={false}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{flexDirection:"row",flexWrap:"wrap",marginBottom:20,justifyContent:"center",alignItems:"center",width}}
      data={[...toplist,
      ...[{name:null},
      {name:null},
      {name:null},
      {name:null},
      {name:null},
      {name:null}].filter((a,i,self)=>i < (self.length - toplist.length)),
      ]}
    renderItem={({item,index})=>{
      if(refNo == item.refNo)
      {
        return null
      }
    return <ItemView item={item} onPress={()=>{
      // alert(refNo)
      this.setState({...item,qty:1,searching:false},()=>{
        if(this.scrVW)
        {
        this.scrVW.scrollTo({x:0,y:0,animated:true})
        }
      })
    }} />
    
    }}
    />
    </View>
     </ScrollView> 
      </SafeAreaView>);
        }
}
DetailsScreen.defaultProps = {
  coffee:{name:"",image:require("../images/topimage.png")}
}
const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(DetailsScreen);

  

