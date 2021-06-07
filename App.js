import React, {PureComponent,useEffect} from 'react';
import {AppRegistry,Easing,Animated,StatusBar,Platform,Linking,View,PermissionsAndroid,Text,Dimensions,AsyncStorage,AppState,TouchableOpacity,DeviceEventEmitter} from 'react-native';
import {Scene,Router,Stack,Drawer,Lightbox, Actions, Modal } from 'react-native-router-flux';
import LoginScreen from './screens/login';
import FlashScreen from './screens/flash';
import SignUpScreen from './screens/signup';
import HomeScreen from './screens/home';
import ShopScreen from './screens/shop';
import DetailScreen from './screens/details';
import AccountScreen from './screens/account';
import CoffeeListScreen from './screens/coffeelist';
import TermsScreen from './screens/terms';
import PolicyScreen from './screens/policy';
import CartScreen from './screens/cartscreen';
import BottomBar from './components/bottombar';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// import SplashScreen from 'react-native-splash-screen';
const { width,height} = Dimensions.get("window");
const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 200,
      easing: Easing.out(Easing.poly(3)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {      
      const { position, layout, scene, index, scenes } = sceneProps
      const thisSceneIndex = scene.index
      const height = layout.initHeight
      const width = layout.initWidth
      const  screens = ["signup","login"];
      // We can access our navigation params on the scene's 'route' property
      var thisSceneParams = scene.route.params || {}
      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [width, 0, 0]
      })

      const translateY = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [height, 0, 0]
      })
      const translateX2 = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [width, 0, 0]
      })

      const translateY2 = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [height, 0, 0]
      })
      const opacity = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.5, thisSceneIndex],
        outputRange: [0, 1, 1],
      })

      const scale = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [4, 1, 1]
      })
      const radius = position.interpolate({
        inputRange: [0, 1],
        outputRange: [100, width]
      })
      const slideFromRight = { transform: [{ translateX }] }
      const scaleWithOpacity = { opacity, transform: [{ scaleX: scale }, { scaleY: scale }] }
      const slideInFromBottom = { transform: [{ translateY }] }
      const slideInExpandBottom = {overflow:"hidden",borderRadius:radius, transform: [
        { scaleX: scale },
        {translateY:translateY2},
        {translateX:translateX2},
        {opacity}
      ] }

      if (thisSceneParams.plain)
      {
       return slideFromRight;
      }else if (screens.includes(thisSceneParams.routeName)){
       return slideFromRight;
        } else if(thisSceneParams.routeName == "register"){
          return slideInExpandBottom;
        } 
      else{ return slideInFromBottom;
      }
    },
  }
}

export default class App extends PureComponent{
 componentDidMount() {
 
   }
  
  constructor(props)
  {
  super(props);
  this.state = {
  }
  console.disableYellowBox = true;
  }
  componentWillUnmount()
  {
   
  }
  componentWillMount()
  {
  
  }
  render(){
    return (
      <Provider store={store}  >
      <Router  >
      <Stack key="root"  transitionConfig={transitionConfig}>
      <Scene initial key="flash" component={FlashScreen} hideNavBar />
      <Scene key="login" component={LoginScreen} hideNavBar />
      <Scene key="signup" component={SignUpScreen} hideNavBar />
      <Scene key="details" component={DetailScreen} hideNavBar />
      <Scene key="coffeelist" component={CoffeeListScreen} hideNavBar />
      <Scene key="cart" component={CartScreen} hideNavBar />
      <Scene key="terms" component={TermsScreen} hideNavBar />
      <Scene key="policy" component={PolicyScreen} hideNavBar />
      <Scene key="dashboard" 
        tabs
        default="home"
        showLabel={false}
        hideNavBar={true}
        > 
      <Scene 
       key="home"
       title="Home"
       component={HomeScreen} 
       hideNavBar
       icon={BottomBar}
       />
      <Scene 
       key="shop"
       title="Shop"
       component={ShopScreen} 
       hideNavBar
       icon={BottomBar}
       />
        <Scene 
       key="account"
       title="Account"
       component={AccountScreen} 
       hideNavBar
       icon={BottomBar}
       />
       </Scene>
   </Stack>
</Router>
</Provider>);
  }
}

const initialState = {
  username:"",
  coffeelist:[
    {name:"Cappuccino",image:require("./images/c1.png"),price:"20.00",description:"An intense sweetness coupled with rich flavours of roasted hazelnut and vanilla spice make the Brazil Yellow Bourbon a truly unmissable blend.",refNo:"Cappuccino-1",currency:"£"},
    {name:"Irish Tea",image:require("./images/c2.png"),price:"10.00",description:"rish Breakfast Tea is a robust blend of black tea that is hearty and delicious. Which makes it the perfect cup of tea to wake up to. Take it as the Irish do, with a splash of milk and maybe a scone or two. Here’s how to brew that perfect cup of Irish Breakfast Tea",refNo:"IrishTea-1",currency:"£"},
    {name:"Jamaican blu",image:require("./images/c3.png"),price:"50.00",description:"At Jamaica Blue we pride ourselves on offering a diverse range of high-quality dishes, freshly made on the premises and prepared using premium, local ingredients.",refNo:"Jamaicanblu-18",currency:"£"},
    {name:"C. Macchiatto",image:require("./images/c4.png"),price:"20.00",description:"From the volcanic Kona region with unique weather conditions, Hawaii Kona coffee has a delicate sweet taste, with hints of berry-like chocolatey aromas.",refNo:"Macchiatto-31",currency:"£"},
    {name:"Kofi",image:require("./images/c5.png"),price:"15.00",description:",Lemon juice, sparkling H2O, lavender. Green Lantern. matcha, mint extract, honey, steamed milk. Fresh Prince. espresso, sparkling H2O, agave, ...",refNo:"Kofi-71",currency:"£"},
    {name:"Espresso",image:require("./images/c6.png"),price:"25.00",description:"Espresso-based drinks, on the other hand, assault your senses (and we mean that in a good way). They’re meant to be drunk quickly; milk is always steamed at a lower temperature so there isn’t a “wait-for-it-to-cool” lag period, and espresso is, as it’s name suggests, made for express. The flavours are powerful and hit you hard. Acidity! Wham! Bitterness!.",refNo:"Espresso-58",currency:"£"},
    {name:"Black Tea",image:require("./images/c7.png"),price:"20.00",description:", lemon juice, sparkling H2O, lavender. Green Lantern. matcha, mint extract, honey, steamed milk. Fresh Prince. espresso, sparkling H2O, agave, ...",refNo:"BlackTea-6",currency:"£"},
    {name:"Corretto",image:require("./images/c8.png"),price:"25.00",description:"Colombia Caturra coffee is famous for its dark fruit aromas and flavour of blackberry and cherry. It also features notes of toasted almond and toasted sourdough.",refNo:"Corretto-42",currency:"£"},
    {name:"HAWAII KONA",image:require("./images/c9.png"),price:"35.00",description:"Kona Coffee is world-renowned and consistently rated among the very best gourmet coffees in the world.  If you are a coffee enthusiast you shouldn’t visit the Big Island without a trying out a good cup of Kona Coffee. You can do this as easily as with a well-placed order in a roadside coffee shack, a cafe, or restaurant, but you can also go on a farm tour.",refNo:"HAWAIIKONA-02",currency:"£"}
  ],
  recent_views:[],
  cart_list:[]
}

const reducer = (state = initialState,action)=>{
  switch(action.type)
  {
  case 'update':
  return {...state,...action.data};
  default:
  return state;
  }
}
const store = createStore(reducer);