import React, {PureComponent} from 'react';
import {Platform,
     StyleSheet,
     Image, 
     Text, 
     View,
     FlatList,
     TouchableOpacity,
    TextInput ,
    ScrollView,
    Animated,
    Easing,
    AsyncStorage,
    ActivityIndicator,
    Dimensions,
    BackAndroid,
    Modal } from 'react-native';
import Icon from './../style/font';
import mystyle from './../style/mystyle';
import * as Animatable from 'react-native-animatable';
import DateTime from 'react-native-customize-selected-date'
const allData = require("../json/db").default;
import {returnAllNumbers,returnUsername,postDATA,convertHexToBinary,checkPassword,returnAllLetter} from '../components/func';

class calenderClass extends PureComponent {
    componentDidMount()
    {
        var im = new Date();
        var limit = parseFloat(parseFloat(im.getFullYear()) - parseFloat(this.props.limit?this.props.limit:0)) + "-"+parseInt(im.getMonth()+1) +"-"+ im.getDate();
        // AlertBox(limit.replace(/-/g,'/'));
        this.setState({limit:limit.replace(/-/g,'/')});
    }
    constructor(props)
    {
        super(props);
        this.state ={
            showModal:true,
            startDate:null,
            endDate:null,
            time: '',
            limit:"",
            error:false
        }
    }


onChangeDate(d)
{
  var im = new Date();
  var splT = d.split("-");
//   AlertBox(this.props.limit);
  if(this.props.limit)
  {
      
    if(parseFloat(splT[0]) <= parseFloat(im.getFullYear() - parseFloat(this.props.limit)))
    {
        if(parseFloat(splT[1]) <= parseFloat(im.getMonth()+1))
        {
            if(parseFloat(splT[2]) <= parseFloat(im.getDate()))
            {
           this.props.saveDate(String(d));   
            }
        }
    }else{
        this.setState({error:true});
    }
  }else{
  if(parseFloat(splT[0]) >= parseFloat(im.getFullYear()))
  {
  if(parseFloat(splT[1]) <= parseFloat(im.getMonth()+1))
  {
  if(parseFloat(splT[2]) > parseFloat(im.getDate()))
  {
  d = d+" "+im.getHours()+":"+im.getMinutes()+":"+im.getSeconds();
  this.props.saveDate(String(d));
  }
    }
  }
}
}
renderChildDay()
{

}
render() 
{
const {width,height} = Dimensions.get("window");
return(<Modal

visible={this.props.showMe}
transparent={true}
animationType="slide"
onRequestClose={()=>{
    this.props.hideMe("");
}}
>
<View style={mystyle.modalback}>
<Animatable.View animation="slideInUp" duration={1000} easing="ease-in-out-back" style={[mystyle.modalInner,{height:380,width:320}]}>
{!this.state.error?<View style={{backgroundColor:"black",padding:20,flexDirection:"column",borderRadius:10,height:360,width:300}}>
<DateTime
            date={this.state.limit}
            changeDate={(date) => this.onChangeDate(date)}
            format='YYYY-MM-DD'
            
            renderChildDay={(day) => this.renderChildDay(day)}
          />

</View>:<Animatable.View animation="slideInUp" duration={1000} easing="ease-in-out-back" style={[mystyle.card,{flexDirection:"column",padding:20}]}>
<Text style={{fontSize:18}}>{allData.singupLocal.dob.sub}</Text>
<TouchableOpacity onPress={()=>{this.setState({error:false})}} style={[mystyle.defaultbtn,{marginTop:10,backgroundColor:allData.color.orange}]}>
    <Text style={mystyle.whiteTxt}>try again</Text>                
</TouchableOpacity>
</Animatable.View>}
<TouchableOpacity onPress={()=>{this.props.saveDate("")}} style={{zIndex:999,elevation:3,position:"absolute",right:0, top:0,width:60,height:60,alignItems:"center",justifyContent:"center"}}>
    <Icon.Ionicons name="md-close-circle" color="red" size={30} />
</TouchableOpacity>
</Animatable.View>
</View>
</Modal>)
    }
}

export default calenderClass;