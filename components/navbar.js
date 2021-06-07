import React, {Component} from 'react';
import {Platform,
     StyleSheet,
     Image, 
     Text, 
     View,
     TouchableOpacity,
    TextInput ,
    ScrollView,
    Animated,
    Easing,
    Modal } from 'react-native';
import Icon from './../components/font';
import mystyle from '../style/mystyle';
import {Actions,Drawer} from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';

export default class LoadContent extends Component {
    componentDidMount()
    {

    }
   
    goBack()
    {
    if(this.props.isProcessing =="none")
    {
this.setState({isProcessing:false});
    
        Actions.pop();
    }
    }
    showNotifications()
    {
    this.props.showNotifications();
    }
    render()
    {
return(<View style={[mystyle.topNav,{...this.props.style}]}>
{this.props.closeicon?<TouchableOpacity style={{width:40,justifyContent:"center",alignItems:"center",height:60}} onPress={()=>{this.props.navBack?this.props.navBack():Actions.pop()}}>
<Icon.Ionicons name="ios-close" color={!this.props.color?"white":this.props.color} size={40} />
</TouchableOpacity>:<View style={{width:40}}>{!this.props.menu?
<TouchableOpacity style={{width:40,justifyContent:"center",alignItems:"flex-start",height:60}} onPress={()=>{this.props.navBack?this.props.navBack():Actions.pop()}}>
<Icon.Ionicons color={!this.props.color?"white":this.props.color} name="ios-arrow-back" size={30} />
</TouchableOpacity>:
    <TouchableOpacity style={{width:40,justifyContent:"center",alignItems:"flex-start",height:60}} onPress={()=>{Actions.drawerOpen()}}>
    <Icon.Ionicons name="ios-menu" color={!this.props.color?"white":this.props.color} size={30} />
    </TouchableOpacity>}</View>}
<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
<Text style={{alignSelf:"flex-start",fontWeight:'bold',color:!this.props.color?"white":this.props.color}}>{this.props.title?this.props.title:""}</Text>
</View>
{this.props.leftTitle?<TouchableOpacity style={{justifyContent:"center",alignItems:"center",height:60,paddingRight:15}} onPress={()=>{
this.props.leftFunc();
}}>
<Text style={{alignSelf:"flex-end",textAlign:"left",fontWeight:'bold',color:!this.props.color?"white":this.props.color}}>{this.props.leftTitle}</Text>
    </TouchableOpacity>:null}
</View>)
    }
}