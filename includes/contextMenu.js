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
    Clipboard,
    Modal } from 'react-native';
import { RNCamera, FaceDetector } from 'react-native-camera';
import mystyle from '../style/mystyle';
import Icon from '../style/font';

 const openContextMenu = (event, user, callback) => {
  const content = Clipboard.getString();
        ActionSheetIOS.showActionSheetWithOptions({
          options:content,
          cancelButtonIndex: [3],
          title: 'Hey',
          message : 'What do you want to do now?'
        }, (buttonIndexThatSelected) => {
          // Do something with result
          if(callback && typeof callback === 'function') callback();
        });
      };
      
  export openContextMenu;
  
     