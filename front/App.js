
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {Provider} from 'react-redux'

import {store} from './Redux-toolkit/store';

import WlcScreen from './app/screens/WlcScreen/WlcScreen';
import RoomScreen from './app/screens/RoomScreen/RoomScreen';
import LobiScreen from './app/TabNavigators/LobiScreen'

const Stack = createNativeStackNavigator();


 
const App = () => {
 
  return (

   <Provider store={store}>
     <NavigationContainer>
       <Stack.Navigator screenOptions={{headerShown:false}}>
       
         <Stack.Screen name="WLC" component={WlcScreen} />
         <Stack.Screen name="LOBI" component={LobiScreen} />
         <Stack.Screen name="ROOM" component={RoomScreen} />
       
     </Stack.Navigator>
    </NavigationContainer>
   </Provider>
  )
}

export default App



// // code kholaseh
//  import { StyleSheet, Text,TextInput, View ,TouchableOpacity, Button,Modal,FlatList,Alert} from 'react-native';

//  import socket from './app/api/Socket'
//  import React,{useState,useEffect} from 'react';
//  import { io } from "socket.io-client";
//  let Random_Number
//  let socket1=null
// const App = () => {
//   const [nsRooms,setNsRooms]=useState([])
//   const [Random_Number,setRandom_Number]=useState()
//   const [namei,setNamei]=useState([])
//   useEffect(()=>{
//     socket.on('nsLoad',(data)=>{
//       console.log(data)
      
   
//       socket1=io.connect(`http://192.168.1.161:3000/public`)
//       socket1.emit('RoomLoad')
//       socket1.on('RoomLoad',roomData=>{
//          console.log('RoomLoad')
//          console.log(roomData)
 
//       })
      
//     })
//   })
// const handleNew=()=>{
//   let am=Math.floor(Math.random() * 10000)
//   setRandom_Number(am);
//   console.log(am,Random_Number)
//   socket1.emit('createGm',{Random_Number,username:namei})
// }
// const handleBack=()=>{
  
//   socket1.emit('backGmToRm',{room:'Room-1',username:namei,Random_Number})
// }
//   return (

//    <>
//    <View style={styles.container}>
//    <TextInput 
//          title='name' 
//          value={namei} 
//          onChangeText={e=>setNamei(e)} 
//          autoCapitalize='none'
         
//         />
//         <TouchableOpacity onPress={()=> socket1.emit('joinRoom',{room:'Room-1',username:namei})}><Text>ok</Text></TouchableOpacity>
//         <TouchableOpacity onPress={handleNew}><Text>new</Text></TouchableOpacity>
//         <TouchableOpacity onPress={handleBack}><Text>back</Text></TouchableOpacity>
//     </View>
//    </>
//   )
// }

// export default App


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   BtnRooms:{
//     flex:1,
//     flexDirection:"row",
//     padding: '10%',
//     backgroundColor: 'rgb(10,2,62)',
//     margin: '3%',
//     // 'rgb(58,47,142)'
//   }
// })

//////////////////////////////////////
// import { StyleSheet, Text, View ,TouchableOpacity,Modal} from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useState } from 'react';




// export default function App() {
//   const [showModal,setShowModal]=useState(false)
//   return (
//     <View style={styles.container}>
//       <Modal animationType='fade' visible={showModal} transparent={true}>
//         <View style={{backgroundColor:'green',padding:100,position:'absolute',top:150,left:60}}>
//         <TouchableOpacity onPress={()=>{setShowModal(!showModal)}}>
//            <Text style={{color:'red'}}>x</Text>
//         </TouchableOpacity>
//         </View>
//       </Modal>
      
//       <LinearGradient   colors={['rgb(0,188,212)','rgb(6,12,33)','rgb(6,12,33)','rgb(162,0,255)' ]}
//                      start={[0,0]}
//                      end={[1, 0.005]}                     
//                      style={{borderRadius: 5,flex:1,margin:2}}>
//              <View style={styles.circleGradient}>
        
//                <View style={styles.content}></View>
//              </View>
//          </LinearGradient>
      
//       <View style={{flex:5,margin:2}}>
       
//         <LinearGradient   colors={['rgb(0,188,212)','rgb(6,12,33)','rgb(6,12,33)','rgb(162,0,255)' ]}
//                      start={[0.526,0]}
//                      end={[0.55, 1]}                     
//                      style={{borderRadius: 1,flex:1,margin:2}}>
//              <View style={styles.circleGradient}>
         
//                <View style={[styles.content,{justifyContent:'center',alignItems:'center'}]}>
//                <LinearGradient start={[0.5,0.06]}
//                                end={[0.45, 1]}
//                                locations={[0.2,0.4,0.5]}
//                                colors={['rgb(0,188,212)','rgb(6,12,33)','rgb(6,12,33)','rgb(162,0,255)' ]}
//                                style={{borderRadius: 5,margin:10}}>
                                
//                  <TouchableOpacity style={styles.circleGradient1} onPress={()=>{setShowModal(!showModal)}}>
//                    <Text style={styles.visit}>new Game</Text>
//                  </TouchableOpacity>
                 
//                </LinearGradient>
//                <LinearGradient start={[0.5,0.06]}
//                                end={[0.45, 1]}
//                                locations={[0.2,0.4,0.5]}
//                                colors={['rgb(0,188,212)','rgb(6,12,33)','rgb(6,12,33)','rgb(162,0,255)' ]}
//                                style={{borderRadius: 5,margin:10}}>
                                
//                  <TouchableOpacity style={styles.circleGradient1} onPress={()=>{setShowModal(!showModal)}}>
//                    <Text style={[styles.visit,{backgroundColor:'rgb(6,12,33)',paddingHorizontal:10,paddingVertical:5}]}>new Game</Text>
//                  </TouchableOpacity>
                 
//                </LinearGradient>
               
               
//                </View>
//              </View>
//          </LinearGradient>
        
//         <LinearGradient   colors={['rgb(0,188,212)','rgb(6,12,33)','rgb(6,12,33)','rgb(162,0,255)' ]}
//                      start={[0,0]}
//                      end={[1, 0.25]}                     
//                      style={{borderRadius: 1,flex:9,margin:2}}>
//              <View style={[styles.circleGradient]}>
              
//                <View style={[styles.content,]}>
//                 <View style={{flex:6,margin:2,backgroundColor:'yellow',borderWidth:1,opacity:0.04,margin:5}}></View>
//                 <View style={{flex:1,margin:2,backgroundColor:'yellow',borderWidth:1,opacity:0.04,margin:5}}>
//                 {/* <MaskedView
//                            style={{ height: 24 }}
//                            maskElement={<Text style={s.text}>{children}</Text>}
//                 >
//                     <LinearGradient
//                                colors={['cadetblue', '#fabada']}
//                                start={{ x: 1, y: 1 }}
//                                end={{ x: 0, y: 0.33 }}
//                                style={{ flex: 1 }}
//                     />
//                  </MaskedView> */}
//                  {/* <GradientText style={styles.text}>Hello world</GradientText> */}
//                 </View>
//                </View>
//              </View>
//          </LinearGradient>
          
        
//       </View>
      
 
//     </View>
//   );
// }
// const styles = StyleSheet.create({ 
//   container:{
//     flex:1,
//     backgroundColor:'rgb(6,12,33)',
//     flexDirection:'row'
//   },
//   circleGradient: {
//     margin: 2,
//     backgroundColor: 'rgb(6,12,33)',
//     borderRadius: 5 ,
//     flex:1,
//    flexDirection:'row',
   
//   },
//   circleGradient1: {
//     margin: 0.1,
//     // backgroundColor: 'rgb(6,12,33)',
//     borderRadius: 5 ,
//     flex:1,
//    flexDirection:'row',
   
   
   
//   },

//   content:{
//     borderRadius: 5 ,
      
//       backgroundColor:'rgb(6,12,33)',
      
//       flex:1,
//       flexDirection:'row'

//   },
//    visit: {
//     margin: 4,
//     paddingHorizontal: 2,
//     textAlign: "center",
//     // backgroundColor: 'rgb(6,12,33)',
//     color: 'white',
//     fontSize: 12
//   },
//   text:{
//     fontSize:60
//   }


//  });



//  import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
//  import { LinearGradient } from 'expo-linear-gradient';
 
//  export default function App() {
//    return (
//      <View style={styles.container}>
//        <View >
//          <LinearGradient   colors={['rgb(0,188,212)','rgb(6,12,33)','rgb(6,12,33)','rgb(162,0,255)' ]}
//                      start={[0,0]}
//                      end={[1, 0.35]}
//                      style={{borderRadius: 5}}>
//              <View style={styles.circleGradient}>
//                <View style={styles.visit1}></View>
//                <View style={styles.visit2}></View>
//                <View style={styles.content}></View>
//              </View>
//          </LinearGradient>
//        </View>
     
  
//      </View>
//    );
//  }
//  const styles = StyleSheet.create({ 
//    container:{
//      flex:1,
//      justifyContent: 'center',
//      alignItems: 'center',
//      backgroundColor:'rgb(6,12,33)',
//      flexDirection:'row'
//    },
//    circleGradient: {
//      margin: 1,
//      backgroundColor: 'rgb(6,12,33)',
//      borderRadius: 5 ,
//      flex:1,
//     flexDirection:'row',
//     position:'relative'
    
//    },
//     visit1: {
//      paddingHorizontal: 50,
//      paddingVertical:150,
     
//      textAlign: "center",
//      backgroundColor: 'rgb(6,12,33)',
//      color: '#008f68',
//      fontSize: 22,
//      borderRadius: 5 ,
//      shadowColor: 'rgb(0,188,212)',
//      shadowOffset: { width: -20, height: -20},
//      shadowOpacity: 0.05,
//      shadowRadius: 50,
     
//    },
//    visit2: {
     
//      paddingHorizontal: 50,
//      paddingVertical:150,
//      textAlign: "center",
//      backgroundColor: 'rgb(6,12,33)',
//      color: '#008f68',
//      fontSize: 22,
//      borderRadius: 5 ,
//      shadowColor: '#a200ff',
//      shadowOffset: { width: 20, height: 20},
//      shadowOpacity: 0.05,
//      shadowRadius: 50,
     
//    },
  
//    content:{
//      borderRadius: 5 ,
//        position:'absolute',
//        left:0,
//        top:0,
//        backgroundColor:'rgb(6,12,33)',
//        paddingHorizontal: 100,
//        paddingVertical:150,
 
//    }
 
 
//   });
 







// import React, {useRef} from 'react';
// import {Animated,Text,View,StyleSheet,Button,SafeAreaView} from 'react-native';

// const App = () => {
  
//   const fadeAnim = useRef(new Animated.Value(100)).current;

//   const fadeIn = () => {
    
//     Animated.timing(fadeAnim, {
//       toValue: 300,
//       duration: 2000,
//       useNativeDriver: false,
//     }).start();
//   };

//   const fadeOut = () => {
    
//     Animated.timing(fadeAnim, {
//       toValue: 0,
//       duration: 3000,
//       useNativeDriver: false,
//     }).start();
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Animated.View
//         style={[
//           styles.fadingContainer,
//           {
//             // Bind opacity to animated value
//             height:fadeAnim
//           },
//         ]}>
//         <Text style={styles.fadingText}>Fading View!</Text>
//       </Animated.View>
//       <View style={styles.buttonRow}>
//         <Button title="Fade In View" onPress={fadeIn} />
//         {/* <Button title="Fade Out View" onPress={fadeOut} /> */}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   fadingContainer: {
//     padding: 20,
//     backgroundColor: 'powderblue',
//   },
//   fadingText: {
//     fontSize: 28,
//   },
//   buttonRow: {
//     flexBasis: 100,
//     justifyContent: 'space-evenly',
//     marginVertical: 16,
//   },
// });

// export default App;





// import { StyleSheet, Text, View ,TouchableOpacity,FlatList,Image} from 'react-native'

//  export default function App() {
//    return (
//      <View style={styles.container}>
//       <View>
// <Image source={require('./assets/avatar.png')} style={{width:40,height:40}}/>

// </View>
     
  
//      </View>
//    );
//  }
//  const styles = StyleSheet.create({ 
//    container:{
//      flex:1,
//      justifyContent: 'center',
//      alignItems: 'center',
//      backgroundColor:'rgb(6,12,33)',
//      flexDirection:'row'
//    }
 
//   });









// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import GradientText from './GradientText';
// import LobiScreen from './../frontend/app/screens/LobiScreen/LobiScreen';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>mansa</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'blue',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
