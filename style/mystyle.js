import { StyleSheet,Dimensions } from 'react-native';
const { width,height } = Dimensions.get("window");
export default StyleSheet.create({
    container:{
        flex: 1,
        minHeight:height,
        width,
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"#D0B49F"
    },
    navtabsTxt_disable:{
      color:"#6A6A6A" ,
      fontSize:10 
    },
    navtabsTxt_active:{
        color:"#523A28",
        fontSize:12 
      },
    tabsNav:{
        height:180,
        elevation:3,
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"white",
        margin:1
    },
bottomBar:{
height:50,
justifyContent:"space-evenly",
alignItems:"center",
flexDirection:"row",
backgroundColor:"white",
elevation:3,
zIndex:5
},
title:{

},
modalback:{

},
titleText:{
fontFamily: "opensans_bold",
fontSize: 24,
fontStyle: "normal",
fontWeight: "700",
textAlign: "left",
color:"#000000"
},
subtext:{
fontSize:12,
fontFamily:"OpenSans-Regular",
color:"#000"
},
flatitem:{
   backgroundColor:"#E4D4C8",
   height:150.99,
   width:(width / 3) - 26,
   borderRadius:10,
   margin:5
},
itembtn:{
    height: 20.33,
    backgroundColor: "#523A28",
    borderRadius: 4.83936,
    padding:5,
    justifyContent:"center",
    alignItems:"center",
    width:"90%"
},
whitebtn:{
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal:30,
    height:40,
    justifyContent:"center",
    alignItems:"center",
    width:"90%"
},
linebtn:{
    borderWidth:0.5,
    borderColor:"rgba(0, 0, 0, 0.5)",
    height:44,
    borderRadius:10,
    backgroundColor: "#FFFFFF",
    marginVertical:10,
    alignItems:"center",
    flexDirection:"row",
    paddingHorizontal:20
},
InputWrp:{
    height:50,
    borderRadius:10,
    backgroundColor: "#FFFFFF",
    marginVertical:10,
    alignItems:"center",
    flexDirection:"row",
    width:"100%"  
}
});