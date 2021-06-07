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
    Picker,
    ActivityIndicator,
    Dimensions,
    BackAndroid,
    TouchableWithoutFeedback,
    Modal
    } from 'react-native';
import mystyle from './../style/mystyle';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
const {width,height} = Dimensions.get("window");
import LottieView from 'lottie-react-native';

class LoaderClass extends PureComponent{
    componentDidMount()
    {
       
        // this.setState({showModal:this.props.showMe});
    }
    constructor(props)
    {
        super(props);
        this.state ={
            showModal:true
        }
    }
   
 render() 
{
const {processing,loader} = this.props;
console.log(this.props);
if(!loader)
{
return null;
}
return(<View
style={[StyleSheet.absoluteFill,{}]}
>
<View style={[mystyle.modalback,{backgroundColor:"rgba(0,0,0,0.7)"}]}>
<TouchableWithoutFeedback
onPress={()=>{
    if(!processing)
    {
        this.props.returnData({
            loader:false,
            processing:false
        });
    }
}} style={{width:width,height:height}}> 
<View style={[mystyle.modalInner,{width:width,height:height,justifyContent:"center"}]}>
{processing?<ActivityIndicator size="large" style={{}} color="#E4D4C8" />:<View style={{width:"70%",borderRadius:10,alignSelf:"center",minHeight:50,justifyContent:"flex-start",alignItems:"center",flexDirection:"column",backgroundColor:"#ffffff",padding:15}}>
<Text style={{marginTop:10,textAlign:"center",fontSize:14}}>{this.props.info}</Text>
</View>}
</View>
</TouchableWithoutFeedback>
</View>
</View>)
    }
}
LoaderClass.defaultProps = {
    returnData:null,
    info:"",
    loader:false,
    processing:false
}
const mapStateToProps = (state) => {
    return state;
  };
  
  export default connect(mapStateToProps)(LoaderClass);
  