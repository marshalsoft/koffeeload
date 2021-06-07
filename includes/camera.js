import React, {PureComponent} from 'react';
import {Platform,
     StyleSheet,
     Image, 
     Text, 
     View,
     TouchableOpacity,
    TextInput,
    Scrollview,
    Animated, Easing,
    Dimensions,
    Modal } from 'react-native';
import { RNCamera, FaceDetector } from 'react-native-camera';
import mystyle from '../style/mystyle';
import Icon from '../style/font';
const { width,height } = Dimensions.get("window");
const allData = require("../json/db").default;

import {returnAllNumbers,returnUsername,postDATA,convertHexToBinary,checkPassword,returnAllLetter} from '../components/func';
export default class CameraClass extends PureComponent{
constructor(props)
{
super(props);
this.state = {
  cameraSnaped:false,
  hidebtn:true,
  detectTXt:"Face not detected",
  flash:false
}
  }
captureCamera() {
  if (this.camera) {
      const options = {mirrorImage:true,doNotSave:false,fixOrientation:true,base64:true, quality:1.0,height:220,width:220 };
  this.camera.takePictureAsync(options).then((data)=>{
        // alert(JSON.stringify(data)); 
    const uriParts = data.uri.split('.');
     const fileType = uriParts[uriParts.length - 1];
     const filename = String(new Date().getMilliseconds()).replace(/[.]/g,'')
    
        // console.log(data)
        this.props.returnData({uri:'data:image/png;base64,'+data.base64,name:filename,type:fileType});
      });
    }
  }
  setFlash()
  {

  }
  render()
  {
    return(
      <Modal

      animationType="slide"
      transparent={false}
      visible={this.props.showMe}
      onRequestClose={() => {
       this.props.hideMe();
      }}
      onShow={()=>{
        this.setState({cameraSnaped:false,hidebtn:true});
      }}
      style={mystyle.container}>
  <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        captureAudio={false}
        style = {mystyle.preview}
        type={this.props.camera_type == "back"?RNCamera.Constants.Type.back:RNCamera.Constants.Type.front}
        faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.fast}
        flashMode={this.state.flash?RNCamera.Constants.FlashMode.torch:RNCamera.Constants.FlashMode.off}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}
        onBarCodeRead={({ barcodes }) => {
          // AlertBox(JSON.stringify(barcodes));
        }}
        onFacesDetected={(d)=>{
          // AlertBox(JSON.stringify(d))
          if(!this.state.cameraSnaped)
          {
          // 
          if(this.state.hidebtn)
          {
          this.setState({hidebtn:false,detectTXt:"Face detected, tab the button to snap."});
          !this.props.hidemark?this.captureCamera():null;
        }
          }
        }}
        
        onFaceDetectionError={()=>{
          
        }}
        style={{width:width,height:height}}
    />
    <View style={{width:"100%",height:"100%",position:'absolute',alignItems:'center',justifyContent:'center',top:0}}>
    {this.props.showmark && this.props.showBtn?<View style={{borderWidth:1,borderColor:allData.color.light,width:width-50,height:width-50,borderRadius:20}}>
    </View>:null}
    {this.props.showmark && this.props.showBtn?<Text style={mystyle.whiteTxt}>{this.state.hidebtn?"Face not detected":"Face detected."}</Text>:null}
    </View>
    <View style={{height:100,position:'absolute',alignItems:'center',justifyContent:'center',bottom:40,width:"100%"}}>
    <View style={{height:100,position:'relative',alignItems:'center',justifyContent:'center',width:100,height:100}}>
<TouchableOpacity onPress={()=>{this.captureCamera()}} style={[mystyle.camerabtn,{position:'absolute'}]}>
    <Icon.Awe name="camera" size={20} />
      </TouchableOpacity>
    </View>
    <TouchableOpacity onPress={()=>this.setState({flash:!this.state.flash})} style={{position:'absolute',right:10,width:50}}>
    <Icon.AntDesign name={this.state.flash?"flash":"off-flash"} size={20} color="#ffffff" />
    </TouchableOpacity>
    </View>
    <TouchableOpacity onPress={()=>this.props.hideMe()} 
    style={{position:'absolute',right:10,width:30,top:10}}>
    <Icon.Ionicons name="ios-close" size={30} color="#ffffff" />
    </TouchableOpacity>
    </Modal>)
          }
        }
        CameraClass.defaultProps = {
          hideMe:()=>{},
          returnData:()=>{},
          showmark:false,
          showBtn:false,
          camera_type:"back",
          showMe:false
        }
     