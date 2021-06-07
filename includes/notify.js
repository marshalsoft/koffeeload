import React, {PureComponent} from 'react';
import {Platform,
     StyleSheet,
     Text, 
     View,
     Clipboard,
     SafeAreaView,
     FlatList,
     ToastAndroid,
     TouchableOpacity,
    TextInput ,
    ScrollView,
    Animated,
   Alert,
   AsyncStorage,
   DeviceEventEmitter,
    Modal } from 'react-native';
import PushNotification from 'react-native-push-notification';
import {Actions} from 'react-native-router-flux';
import Moment from 'moment';
import Intercom from 'react-native-intercom';

export async function NotifyAlert(data)
{
 var channelId = "vpd_notification_channel";
    PushNotification.configure({
        onNotification:(notification)=>{
            const {data} = notification;
            if(data.url != "")
            {
              AsyncStorage.setItem("push_notification",JSON.stringify(data));
              DeviceEventEmitter.emit('custom_push_notification',data);
            }
            console.log("notification opened:",data);
            if(data.type == "chat")
            {
              // AsyncStorage.getItem("userlog").then((rs)=>{
              // if(rs != null)
              // {
              // var res = JSON.parse(rs);
              // var user = {
              //   email:res.email,
              //   user_id:String(res.accounts[0].customer_id),
              //   name:String(res.firstname),
              //   phone:String(res.phone),
              //   language_override:'en',
              //   signed_up_at:Moment(new Date()).format("YYYY-MM-DD hh:mm:ss a"),
              //   unsubscribed_from_emails: false,
              //   companies:[
              //     {
              //     company_id:String(res.accounts[0].customer_id),
              //     name:"VPD Money"//this.props.firstname
              //     }
              //   ],
              //   custom_attributes:{
              //    chat_header:1
              //   }
              // }
              // Intercom.registerIdentifiedUser({userId:user})
              // Intercom.updateUser(user);
              // // Intercom.logEvent('intercom_chat', { extra:user.user_id});
              // Intercom.displayConversationsList();
              // }
              // });
            }
            },
          onRegister:(token)=>{
            console.log('TOKEN:', token)
          },
          onAction:(notification)=>{
            console.log("ACTION:", notification);
            // process the action
          }
    });
    PushNotification.createChannel(
        {
          channelId:channelId, // (required)
          channelName: "My channel", // (required)
          channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
          soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
          importance: 4, // (optional) default: 4. Int value of the Android notification importance
          vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        },
        (created) =>{
       console.log("channel",created);
  var notfData = {
    /* Android Only Properties */
    autoCancel:false, // (optional) default: true
    largeIcon:"ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
    largeIconUrl:"ic_launcher", // (optional) default: undefined
    smallIcon:"white_log", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
    color:"#1784a7", // (optional) default: system default
    vibration:300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    ongoing:false, // (optional) set whether this is an "ongoing" notification
    priority:"high", // (optional) set notification priority, default: high
    visibility:"private", // (optional) set notification visibility, default: private
    importance:"high", // (optional) set notification importance, default: high
    ignoreInForeground:false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)
    channelId:channelId, // (optional) custom channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
    onlyAlertOnce:false, // (optional) alert will open only once with sound and notify, default: false
    
    usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
  
    messageId:new Date().getTime(), // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module. 
   
    /* iOS only properties */
    alertAction: "view", // (optional) default: view
    category: "", // (optional) default: empty string
  
    /* iOS and Android properties */
    id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
    message: data.body == undefined?"VPD Notification":data.body, // (required)
    userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
    playSound: true, // (optional) default: true
    soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    title:data.title == undefined?"VPD notification":data.title,
    body:data.body == undefined?"You have a notification from VPD app":data.body,
    subText:Moment().format("Do MMM, YYYY hh:mm A"),
    permissions: {
      alert: true,
      badge: true,
      sound: true
    },
     popInitialNotification: true,
    requestPermissions: true,
    data:data
  }
  if(data.bigText != undefined)
  {
    notfData.bigText = data.bigText;
  }
  if(data.ticker != undefined)
  {
    notfData.ticker = data.ticker;
  }
  if(data.bigPictureUrl != undefined)
  {
    notfData.bigPictureUrl = data.bigPictureUrl;
  }
  if(data.btn != undefined)
  {
    notfData.actions = data.btn;
    notfData.invokeApp = true;
  }
  if(data.action != undefined)
  {
    notfData.actions = data.action;
    notfData.invokeApp = true;
  }
  console.log("actions:",data);
  console.log("notfData",notfData);
  PushNotification.localNotification(notfData);
}
);
}

export function sendNotification(key,data)
{
    // Defined in above step
    return fetch("https://fcm.googleapis.com/fcm/send", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':'key=AAAAhF5vX8o:APA91bFim4A0_Bn0odzi_DzWE6FE5A4TTIlhG1EwpxHhigW7NT-5CPkDDed98bdLkINhsE_hLNwGVmWVAYAhlqedjwd-c9n6ZKzCusN2J4_oR4XFtCLulPRPeGb67EPO8iYeXi2YliIy'
      },
      body: JSON.stringify({
        to:key,
        collapse_key:"type_a",
        data:data})
    }).then((res)=>res.text()).then((res)=>{
      console.log(res);
    });
    // Defined in next step
}