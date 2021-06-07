import React, { Component } from 'react';
import {
  Platform,
  StyleSheet
} from 'react-native';
export default StyleSheet.create({
 container:{
    flex:1,
    flexDirection:"column"
 },
 navbar:{
    backgroundColor:"white",
    padding:10,
    flexDirection:"row"
 },
 bottombar:{
   backgroundColor:"white",
    flexDirection:"row",
    justifyContent:"space-around",
    position:"absolute",
    bottom:0,
    left:0,
    right:0,
    width:"100%",
    minHeight:40
 },
 bottombarItem:{
    padding:10,
    alignItems:"center",
    justifyContent:"center"
 }
})