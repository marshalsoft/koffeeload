import React, {Component} from 'react';
import {Platform,
     StyleSheet,
     Image, 
     Text, 
     View,
     TouchableOpacity,
    TextInput ,
    ScrollView,
    Dimensions,
    Animated,
    Easing,
    Modal } from 'react-native';
import mystyle from '../style/mystyle';
import Icons from '../font';

export class SearchScreen extends React.Component {
 componentDidMount() {


 }
 constructor(props)
 {
  super(props)
  this.state = {
   searchTxt:""
  }
 }

 searchBar()
{
    return <View style={mystyle.searchbarWrp}>
     <Icons.Awe name="search" size={20} color="#3a3a3a"style={{marginHorizontal:10}} />
     <TextInput value={this.state.searchTxt} onChangeText={(text)=>{
         this.setState({searchTxt:text});
     }} placeholder="search transaction..." style={{flex:1}} underlineColorAndroid="transparent" />
     {this.state.searchTxt != ""?<TouchableOpacity onPress={()=>{
         this.setState({searchTxt:""})
     }} style={{paddingHorizontal:10}}>
     <Icons.AntDesign name="closecircle" size={20} color="#3a3a3a" />
     </TouchableOpacity>:null}
      </View>
}
render()
 {
 return(<View></View>)
 }
}