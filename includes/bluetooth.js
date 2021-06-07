import React, { PureComponent } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  FlatList,
  Animated,
  Linking,
  Picker,
  AsyncStorage,
  Dimensions,
  ActivityIndicator,
  Easing,
  ScrollView,
  DatePickerAndroid,
  Share,
  ToastAndroid,
  PermissionsAndroid,
  Modal,
  ViewPagerAndroid,
  BackHandler,
  Image,
  NativeModules,
  NativeEventEmitter,
  DeviceEventEmitter,
  Alert
} from 'react-native';
import mystyle from '../style/mystyle';
import Icons from '../components/font';
import { Actions } from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';
const {width,height} = Dimensions.get("window");
import LottieView from 'lottie-react-native';
const bluecolor = "#54A9D2";
const {RNBlueTooth} = NativeModules;
import Blth  from 'react-native-ble-manager';
const bleManagerEmitter = new NativeEventEmitter(bleManagerEmitter);
import RNFetchBlob from 'rn-fetch-blob';
const {fs} = RNFetchBlob;
var nearbyDevices = [];

class BlueToothClass extends PureComponent
{
  static PropTypes = {
  scantext:String,
    fingerPrintImage:String,
    matchFinger:Boolean,
    saveImageByte:String
  }
  componentDidMount()
{ 
  DeviceEventEmitter.addListener("openfingerprint",(d)=>{
    // alert(JSON.stringify(d))
    this.setState({showModal:true});
    if(d.action == "card_issuance")
    {
      
    }
  });
      this.b0 =  bleManagerEmitter.addListener("VPDScannerEvent", (re) => {
          // Scanning is stopped
          // this.showDevices();
          console.log("VPDScannerEvent listening");
          console.log(re);
          if(re.action == "fingerPrintImage")
          {
            //   this.props.returnData({fingerPrint:re.name});
          }
          //else if(re.action == "disconnect")
          // {
          //   this.ScroSide.scrollTo({x:0,y:0,animated:true});
          //   this.setState({animatBlue:false,connecting:false,animatBlueScan:false,device_disconnect:re.status,info:re.message});
          // }else{

          // }
      });  
      this.b1 =  bleManagerEmitter.addListener("BleManagerStopScan", () => {
            console.log("stopedd");
            this.setState({scanning:false});
        });
      this.b2 = bleManagerEmitter.addListener("BleManagerDidUpdateState", (args) => {
            // The new state: args.state
            console.log("did change state");
            console.log(args);
         
          })
      this.b3 = bleManagerEmitter.addListener("BleManagerDisconnectPeripheral", (args) => {
            // The new state: args.state
            console.log(args);
            Blth.getConnectedPeripherals([]).then((r)=>{
              console.log("check connected devices 2");
              console.log(r);
              // return;
               if(r.length == 0)
               {
                console.log("disconnect state enter");
                this.setState({devicelist:this.state.devicelist.map((a,i)=>{
                  a.connected = false;
                  a.device_type = "paired";
                  a.selected = false;
                  return a; 
                  }),loading:false},()=>{
                    ToastAndroid.show("Device is disconnected.",ToastAndroid.SHORT);
                  })
              }else{
                this.setState({devicelist:this.state.devicelist.map((a,i)=>{
                  a.connected = true;
                  a.device_type = "paired";
                  a.selected = true;
                  return a; 
                  }),selectedDevice:{id:null}},()=>{
                    ToastAndroid.show("Device is disconnected.",ToastAndroid.SHORT);
                  })
              }
              })
          })
      this.b4 =  bleManagerEmitter.addListener("BleManagerDiscoverPeripheral", (args) => {
            // The id: args.id
            // The name: args.name
            if(this.state.devicelist.filter((a,i)=>a.id == args.id).length == 0)
            {
                args.connected = false;
                args.device_type = "discover";
                args.selected = false;
                nearbyDevices.push(args);
                // console.log(args);
                // console.log(nearbyDevices);
            this.setState({nearbyDevices:[args,...this.state.nearbyDevices],scanning:true});
            }
            
          });

      this.b5 = bleManagerEmitter.addListener("BleManagerConnectPeripheral", (args) => {
            // The new state: args.state
            console.log(args);
            Blth.getConnectedPeripherals([]).then((r)=>{
              console.log("check connected devices 1");
              console.log(r);
              // return;
               if(r.length != 0)
               {
                 var dev = r[0];
              console.log(dev);
                this.setState({devicelist:this.state.devicelist.map((a,i)=>{
                 if(dev.id == a.id)
                 {
                  a.connected = true;
                  a.device_type = "paired";
                  a.selected = true;
                 }
                  return a; 
                  }),loading:false},()=>{
                    ToastAndroid.show("Device is connected.",ToastAndroid.SHORT);
                    this.NextScreen(dev.id,dev.name);
                  })
               }
              })
          })
}
componentWillUnmount()
{
  if(this.b1)
  {
    this.b1.remove();
  }
  if(this.b2)
  {
    this.b2.remove();
  }
  if(this.b3)
  {
    this.b3.remove();
  }
  if(this.b4)
  {
    this.b4.remove();
  }
  if(this.b5)
  {
    this.b5.remove();
  }
}

NextScreen(id,name)
  {
     this.ScroSide.scrollTo({x:0,y:0,animated:true});
      RNBlueTooth.fingerPrintScreen(id,name,this.props.matchFinger,this.props.saveImageByte).then((response)=>{
      // Blth.postMsg(path);
      if(response.image_url != "0")
    {
    var data = "";
    RNFetchBlob.fs.readStream("file://"+response.image_url,'base64',4095).then((ifstream) => {
        ifstream.open();
        ifstream.onData((chunk) => {
          data += chunk;
        })
        ifstream.onError((err) => {

        })
        ifstream.onEnd(() => {
          if(data != "")
          {
          this.setState({showModal:false}); 
          this.props.returnData({
          image_byte:response.image_byte,
          fingerPrintImage:"data:image/png;base64,"+data});
          }
        })
    })
  }else{
    this.setState({showModal:false}); 
    this.props.returnData({
      image_byte:"0",
      fingerPrintImage:"0"});
  }
    })
  }
 scanBlue()
{
  this.setState({nearbyDevices:[]});
  Blth.enableBluetooth().then((pem) => {
    console.log("bluetooth permission");
    Blth.start({showAlert: false }).then((r)=>{
      this.setState({scanning:true});
      this.showDevices();
})
}).catch((error) => {
  // Failure code
  Alert.alert("Oops","Bluetooth permission rejected.",[]);
  this.setState({scanning:false,selectedDevice:{id:null}});
});

}
connectAndPrepare() {
  // Connect to device
  this.setState({loading:true});
  const MY_UUID = "00001101-0000-1000-8000-00805F9B34FB";
  // return ;
  var dv = this.state.selectedDevice;
  console.log(dv);
  Blth.isPeripheralConnected(dv.id,[]).then((isConnected) => {
    if (isConnected) {
      ToastAndroid.show("Device is already connected!",ToastAndroid.LONG);
      dv.device_type = "paired";
      dv.connected = true;
      dv.selected = true;
      this.setState({connecting:false,selectedDevice:dv}); 
      console.log(dv);
    } else {
      Blth.connect(dv.id,dv.name).then((re)=>{
    console.log("connected");
    console.log(re);
    Blth.getConnectedPeripherals([]).then((connectDevices) => {
  // Before startNotification you need to call retrieveServices
  if(connectDevices.length != 0)
  {
    dv.device_type = "paired";
    dv.connected = true;
    dv.selected = true;
    this.setState({selectedDevice:dv,connecting:false},()=>{
      // BleManager.stopScan();
    });
  }else{

  }
})
}).catch((e)=>{
  console.log(e);
  this.setState({connecting:false});
  ToastAndroid.show("Connection to device failed.",ToastAndroid.LONG);

});
}
  }).catch((e)=>{
    
  })
  // Actions triggereng BleManagerDidUpdateValueForCharacteristic event
}
showDevices(){
      Blth.getConnectedPeripherals([]).then((peripheralsArray) => {
          // Success code
      console.log("Connected peripherals: ");
      console.log(peripheralsArray);
      var d = this.state.selectedDevice;
      d.selected = false;
      d.connected = false;
      if(peripheralsArray.length != 0)
      {
      d = peripheralsArray[0];
      d.device_type = "paired";
      d.selected = true;
      d.connected = true;
      this.setState({selectedDevice:d})
      }
      console.log(d);
      Blth.getBondedPeripherals([]).then((peripheralsArray) => {
          // alert(JSON.stringify(peripheralsArray));
          console.log("paired devices");
          console.log(peripheralsArray);
          this.setState({devicelist:peripheralsArray.map((a,i)=>{
            a.device_type = "paired";
            a.connected = d.id == a.id?d.connected:false;
            a.selected = d.id == a.id?d.selected:false;
            return a;
          }).reverse()},()=>{
            if(d.connected)
            {
              if(this.ScroSide)
              {
                this.setState({info:"Connected to "+d.name+" ",animatBlueScan:true,animatBlue:false,device_disconnect:false})
                setTimeout(()=>{
                  this.ScroSide.scrollTo({x:width,y:0,animated:true});
                },500)
              }
            }
            this.setState({devicelist:this.state.devicelist.map((a,i)=>{
              if(this.state.selectedDevice.id == a.id)
              {
              a.connected = false;
              a.device_type = "paired";
              a.selected = true;
              }
              return a; 
              }),loading:false})
          });
      })
    
      })
  Blth.stopScan().then(() => {
  this.setState({nearbyDevices:[]},()=>{
    Blth.scan([],30,true);
  })
  
  })
}
pairDevice()
{
 var device = this.state.selectedDevice;
 console.log(device);
Blth.createBond(device.id,device.name).then(() => {
 device.device_type  = "paired";
 device.connected  = false;
  this.setState({connecting:false,devicelist:[device,...this.state.devicelist.filter((a,i)=>a.id != device.id).map((a,i)=>{
    a.selected = device.id == a.id?true:false;
    return a;
  })],
  selectedDevice:device,
  nearbyDevices:this.state.nearbyDevices.filter((a,i)=>a.id != device.id)})
  console.log("Device Paired successfully");
  ToastAndroid.show("Device Paired successfully.",ToastAndroid.SHORT);
}).catch(() => {
 this.setState({connecting:false})
  console.log("fail to bond");
  ToastAndroid.show("Oops! Pairing failed.",ToastAndroid.SHORT);
});
}
DisconnetDevice()
{

 Blth.getConnectedPeripherals([]).then((r)=>{
  console.log("connected devices");
  console.log(r);
  // return;
   if(r.length == 0)
   {
    ToastAndroid.show("No device connected",ToastAndroid.SHORT);
    this.setState({selectedDevice:device})
    return ;
   }
this.setState({scanning:false,loading:true});
Blth.disconnect(r[0].id,true);
}).catch(()=>{
  console.log("disconnection error");
  this.setState({scanning:false});
  Blth.getConnectedPeripherals([]).then((r)=>{
    console.log(r);
  })
 
})
}
 constructor(props)
 {
     super(props);
     this.state = {
         devicelist:[],
         nearbyDevices:[],
         showScanDevice:false,
         showModal:false,
         scanning:true,
         connecting:false,
         selectedDevice:{id:null},
         animatBlue:false,
         animatBlueScan:false,
         device_disconnect:true,
         info:"",
         autoplay:false,
         loading:false,
         scanned:false
     }
   this.scanBlue.bind();
   this.pairDevice.bind();
   this.connectAndPrepare.bind();
 }


 render()
 {
     const {scantext,scanning,selectedDevice,showModal,devicelist,nearbyDevices,fingerPrintImage} = Object.assign(this.state,this.props);
     return (<View style={{alignSelf:"center",marginVertical:10}}>
       <TouchableOpacity
       disabled={this.props.disabled}
       onPress={()=>{
         this.setState({showModal:true});
       }}
style={[mystyle.defaultbtn,{backgroundColor:this.props.disabled?"#ccc":bluecolor,width:width-80}]}>
        {fingerPrintImage != null?<View style={{width:40,height:40,backgroundColor:"#ccc"}}>
          <Image source={{uri:fingerPrintImage}} style={{width:40,height:40}}
          resizeMode="contain"
          />
          </View>:null}
           <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
             <Text style={{color:"white",marginLeft:fingerPrintImage == null?0:-40}}>{scantext}</Text>
          </View>
           </TouchableOpacity>
           <Modal         onShow={()=>{
             
           }}
           onRequestClose={()=>{
             this.DisconnetDevice();
            this.setState({showModal:false});
           }}
           transparent={true}
           visible={showModal}>
               <ScrollView 
      keyboardShouldPersistTaps="handled"
               horizontal
               pagingEnabled
               scrollEventThrottle={16}
               scrollEnabled={true}
               ref={e=>this.ScroSide=e}
               style={{width,height}}>
<View style={{width,height,backgroundColor:"rgba(0,0,0,0.6)",justifyContent:"center",alignItems:"center"}} >
<Animatable.View 
onAnimationEnd={()=>{
  this.scanBlue();
}}
animation={{
from:{
transform:[
{translateY:50},
{rotateX:"20deg"}
]},
to:{
    transform:[
    {translateY:0},
    {rotateX:"0deg"}
    ]}

}}
easing="ease-in-out-back"
useNativeDriver
duration={1000}
style={{overflow:"hidden",width:width-60,height:height-100,backgroundColor:"white",borderRadius:15,flexDirection:"column"}}>
<View style={{width:"100%",padding:10,flexDirection:"column",backgroundColor:"#e4f1f8"}}>
<Text style={{color:bluecolor,fontWeight:"bold"}}>Paired Devices</Text>
{devicelist.length != 0 ?<Text style={{color:"black",fontSize:10}}>Select a device below to connect</Text>:null}
</View>
{devicelist.length == 0 && !scanning?<View style={[mystyle.alert,{borderRadius:0,paddingVertical:0,minHeight:10}]}>
<Text>No paired device found!</Text>
</View>:null}
<ScrollView 
      keyboardShouldPersistTaps="handled"
style={{flex:1}}>
{devicelist.map((a,i,self)=><TouchableOpacity 
onPress={()=>{
// alert(JSON.stringify(a));

if(a.connected)
{
  this.setState({info:"Connected to "+a.name+" ",animatBlueScan:true,animatBlue:false,device_disconnect:false})
  this.ScroSide.scrollTo({x:width,y:0,animated:true});
  return ;
}
if(this.state.selectedDevice.connected)
{
  this.DisconnetDevice();
}
a.device_type = "paired";
a.connected = false;
    this.setState({devicelist:self.map((b,o)=>{
        b.selected = i == o?true:false;
        return b;
    }),selectedDevice:a})
    console.log(a);
}}
style={{padding:10,flexDirection:"row",alignItems:"center",borderBottomColor:"#ccc",borderBottomWidth:0.5}}
key={i}>
   <Icons.FontAwesome5 name="bluetooth"  size={30} /> 
 <Text style={{marginLeft:10}}>{a.name}</Text>
 {a.selected?<View style={{paddingHorizontal:5,borderRadius:10,backgroundColor:a.connected?"limegreen":"white",flexDirection:"row",alignSelf:"center",justifyContent:"center",alignItems:"center",position:"absolute",top:15,right:20,}}>
 <Text style={{marginRight:5,fontSize:12,color:"white"}}>connected</Text>
   <Icons.AntDesign name="check" size={20} style={{color:a.connected?"white":"limegreen"}} /></View>:null}
 </TouchableOpacity>)}
</ScrollView>
<View style={{width:"100%",padding:10,flexDirection:"row",backgroundColor:"#e4f1f8"}}>
{scanning?<ActivityIndicator size="small" />:null}
<View style={{flexDirection:"column"}}>
<Text style={{color:bluecolor,fontWeight:"bold"}}>Nearby Devices</Text>
{nearbyDevices.length != 0 ?<Text style={{color:"black",fontSize:10}}>Select a device below to pair</Text>:null}
</View>
</View>
{nearbyDevices.length == 0 && !scanning?<View style={[mystyle.alert,{borderRadius:0,paddingVertical:0,minHeight:10}]}>
<Text>No nearby device found!</Text>
</View>:null}
{nearbyDevices.length != 0?<ScrollView 
  keyboardShouldPersistTaps="handled"
style={{flex:1}}>

{nearbyDevices.map((a,i,self)=><TouchableOpacity 
    onPress={()=>{
    // alert(JSON.stringify(aid));
    a.device_type = "discover";
    a.connected = false;
    this.setState({nearbyDevices:self.map((b,o)=>{
        b.selected = i == o?true:false;
        return b;
    }),selectedDevice:a})
    }}
    style={{padding:10,flexDirection:"row",alignItems:"center",borderBottomColor:"#ccc",borderBottomWidth:0.5}}
    key={i}>
       <Icons.FontAwesome5 name="bluetooth"  size={30} /> 
     <Text style={{marginLeft:10}}>{a.name == null?a.id:a.name}</Text>
 {a.selected?<Icons.AntDesign name="check" size={20} style={{position:"absolute",top:15,right:20,color:"limegreen"}} />:null}
    </TouchableOpacity>)}
    
</ScrollView>:null}
<TouchableOpacity
 onPress={()=>this.setState({showModal:false})}
style={{position:'absolute',borderRadius:20,justifyContent:"center",alignItems:"center",top:0,right:0,width:30,height:30,backgroundColor:"white"}}>
           <Icons.Ionicons name="md-close-circle" color="red" size={30}  />
           </TouchableOpacity>
<View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",width:"100%"}}>
{this.state.selectedDevice.connected?<View style={{flexDirection:"row",paddingHorizontal:5}}>
  <TouchableOpacity 
  onPress={()=>{
    this.DisconnetDevice();
  }}
style={[mystyle.defaultbtn,{backgroundColor:bluecolor,flex:1,marginRight:5}]}
>
{this.state.loading?<ActivityIndicator size="small" color="white" style={{marginRight:5}} />:null}
<Text style={{color:"white"}}>Disconnect</Text>
</TouchableOpacity>
  <TouchableOpacity 
  onPress={()=>{
   
  }}
style={[mystyle.defaultbtn,{backgroundColor:bluecolor,flex:2}]}
>
<Text style={{color:"white"}}>Proceed</Text>
</TouchableOpacity></View>:
<TouchableOpacity 
style={[mystyle.defaultbtn,{backgroundColor:bluecolor,width:"90%"}]}
onPress={()=>{
  var {device_type,connected,id} = this.state.selectedDevice;
  console.log(this.state.selectedDevice)
  // return ;
  if(id == null)
  {
    if(this.state.scanning)
  {
    ToastAndroid.show("Please wait...",ToastAndroid.SHORT);
  }else{
    this.scanBlue();
  }
  }else if(device_type == "discover"){
    this.pairDevice();
  }else if(device_type == "paired"){
    // this.connectAndPrepare(id);
    const {id,name} = this.state.selectedDevice;
    // var mch =  "[70, 77, 82, 0, 32, 50, 48, 0, 0, 0, 1, 122, 0, 0, 0, -4, 1, 68, 0, -59, 0, -59, 1, 0, 0, 0, 80, 29, 64, -110, 0, 24, -18, 93, 64, -41, 0, 71, 64, 93, 64, -101, 0, -120, 26, 93, 64, 105, 0, -66, -16, 93, -128, -83, 0, 18, 115, 93, -128, 125, 0, 24, 22, 93, -128, 32, 0, 32, 65, 93, -128, -107, 0, 44, -56, 93, -128, -106, 0, 66, -69, 93, -128, 34, 0, 72, 71, 93, -128, 58, 0, 100, 79, 93, -128, -50, 0, -118, 36, 93, -128, 85, 0, -90, 87, 93, -128, -102, 0, -79, 12, 93, -128, 86, 0, -47, -23, 93, -128, 124, 0, -27, 113, 93, -128, -66, 0, -25, -121, 93, 64, 20, 0, -44, 81, 87, 64, 17, 1, 13, -29, 87, -128, 39, 0, 112, -49, 87, -128, 27, 0, -31, -28, 87, -128, 21, 0, -127, 81, 81, -128, -123, 0, 116, 9, 75, -128, 29, 0, 122, 78, 75, 64, 23, 1, 1, 92, 68, 64, -116, 0, 83, 73, 62, 64, -106, 0, 91, 61, 62, -128, 97, 0, 81, 62, 56, -128, 72, 0, 85, -49, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]";
this.NextScreen(id,name);
  }else{
   
  }
}}
>
{this.state.connecting && !scanning?<ActivityIndicator size="small" color="white" style={{marginRight:10}} />:null}
{this.state.loading?<ActivityIndicator size="small" color="white" style={{marginRight:5}} />:null}
<Text style={{color:"white"}}>{selectedDevice.id == null?"Scan for nearby device":selectedDevice.device_type == "paired"?selectedDevice.connected?"Disconnect":"Connect to device":selectedDevice.device_type == "discover"?"Pair Device":"Scan Now"}</Text>
</TouchableOpacity>}
</View>
</Animatable.View>
</View>
<View style={{width,height,backgroundColor:"white",justifyContent:"center",alignItems:"center"}} >
<View style={{width:width,height:70,justifyContent:"space-between",flexDirection:"row",alignItems:"center"}}>
<TouchableOpacity
 onPress={()=>{
this.ScroSide.scrollTo({x:0,y:0,animated:true});
}} style={{padding:10,paddingHorizontal:20}} >
       <Icons.Ionicons name="ios-arrow-back" size={30} color="black" />        
       </TouchableOpacity>
<View style={{width:width-60,position:"absolute",right:0}} >

</View>
</View>
<ScrollView 
      keyboardShouldPersistTaps="handled"
style={{flex:1}}>
<View style={{flexDirection:"column",width:width,justifyContent:"center",alignItems:"center"}}>
<View style={{paddingHorizontal:15,flexDirection:"row",width:width-50}}>
<View style={{flexDirection:"column",flex:1}}>
<Text style={[mystyle.signTitle,{fontSize:width > 400 ? 28:26}]}>Scan Fingerprint</Text>                
<Text  style={{alignSelf:"flex-start",paddingTop:2,marginBottom:10}}>To complete your registration, Please scan user fingerprint.</Text>                
 </View>
 </View>
 <View >
  <Text style={{color:bluecolor,fontSize:16}}>{this.state.info}</Text>
</View>
 {this.state.animatBlue?<View style={{width:width-80}}>
<LottieView source={require("../json/bluetooth.json")} 
autoPlay
loop
speed={2}
style={{width:width-80,height:width-80}}
/>
 </View>:null}
 {this.state.animatBlueScan?<View style={{width:width-80,justifyContent:"center",alignItems:"center"}}>
 <View style={{width:width-80,height:250,justifyContent:"center",alignItems:"center"}}>
 <LottieView 
 source={require("../json/fingerprint-blue.json")} 
autoPlay
loop={this.state.autoplay}
speed={1}
style={{width:120,height:120}}
ref={animation => {
  this.aniFinger = animation;
}}
/>
</View>
<View style={{backgroundColor:"#c7e8f8",padding:10,width:width-80,marginBottom:20,borderRadius:5,justifyContent:"center",alignItems:"center"}}>
<Text style={{textAlign:"center",color:bluecolor}}>Place your finger firmly on the device and tap on the capture button below.</Text>
</View>
<TouchableOpacity 
  onPress={()=>{
    this.aniFinger.play()
//    VPDScanner.captureFingerPrint().then((imagePath)=>{
// console.log("imagePath");
// console.log(imagePath);
//    });
  }}
style={[mystyle.defaultbtn,{backgroundColor:bluecolor,width:"90%"}]}
>
<Text style={{color:"white"}}>Capture Fingerprint</Text>
</TouchableOpacity>
</View>:null}
{this.state.device_disconnect?<View style={{width:width-80,justifyContent:"center",alignItems:"center",height:width-80}}>

</View>:null}
</View>
</ScrollView>
</View>
</ScrollView>
</Modal> 
</View>)
 }
}
BlueToothClass.defaultProps = {
    scantext:"Scan fingerprint",
    fingerPrintImage:null,
    matchFinger:false,
    returnData:()=>{},
    saveImageByte:null,
    disabled:false,
}
export default BlueToothClass;