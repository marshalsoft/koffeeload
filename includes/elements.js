import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
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
  BackHandler
} from 'react-native';

import Icons from '../components/font';

class InputField extends React.Component<Props, State> {
  static defaultProps = {
    editable: true,
    keyboardType:"default" 
  }
  
  constructor(props) {
    super(props);
    this.state = {
      editable: !props.editable
    };
  }

  componentDidMount() {
    if (this.props.editable) {
      setTimeout(() => {
        this.setState({ editable: true });
      }, 100);
    }
  }

  render() {
    const { editable } = this.state;
    return <TextInput {...this.props} editable={editable} />;
  }
}

 export default InputField;

