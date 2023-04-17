import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React,{useEffect,useState} from 'react';
import Users from './components/Users/Users'
import Games from './components/Games/Games';
import ChatBox from './components/ChatBox/ChatBox'
import { useSelector } from 'react-redux';
import Game from './components/Games/Game/Game'
import { LinearGradient } from 'expo-linear-gradient';

export default function RoomScreen({ route,navigation }) {
  const {nsSocket,title,RoomTitle,setTitle}=route.params

  const [handleComp,setHandleComp]=useState(true);
  const [myRoom,setMyRoom]=useState('')
  const [GmName,setGmName]=useState('')
  const username=useSelector(state=>state.user.value)



 
  let chatsInfo=[]
  let usersInfo=[]
  let gamesInfo=[]
  let usersGmInfo=[]
  let RoomName
  
  useEffect(()=>{
    
    
   nsSocket.on('RoomInformation',(roomInfo)=>{
      
       console.log(roomInfo)
         RoomName=roomInfo.name
         console.log(RoomName)
         roomInfo.history.forEach((e)=>{
            chatsInfo.push({chatMSG:e.msg,name:e.name,time:e.time,avatar:e.avatar})
          
        })
     
        let acc1=roomInfo.userList.filter(e=>e !== username)
        console.log(acc1)
        acc1.forEach((e)=>{
          usersInfo.push({userList:e})
        })
       
        roomInfo.showPlay.forEach((e)=>{
         
          gamesInfo.push({showPlay:e.name,creator:e.creator,listply:e.listply,uID:e.uID})
          
        })


        
    })

   
    return ()=>{
      nsSocket.off('RoomInformation')
      nsSocket.off('chatsInfo2')
    }
 
  },[handleComp])
  
 

  return (
  <View style={styles.container}>

  
{handleComp?

   
    <View style={{flex:1,flexDirection:'row'}}>

          <LinearGradient   colors={['rgb(0,188,212)','rgb(6,12,33)','rgb(6,12,33)','rgb(162,0,255)' ]}
                            start={[0,0]}
                            end={[1, 0.005]}                     
                            style={{borderRadius: 5,flex:1,margin:2}}
          >
              <View style={styles.circleGradient}>
        
                  <View style={styles.content}>
                      <Users navigation={navigation} 
                             socket={nsSocket} 
                             RoomTitle={RoomTitle}
                             setTitle={setTitle}
                             title={title}
                             usersInfo={usersInfo}
                            
                      />
                  </View>
              </View>
          </LinearGradient>
      
          <View style={{flex:4,margin:2,}}>

                  <LinearGradient  colors={['rgb(0,188,212)','rgb(6,12,33)','rgb(6,12,33)','rgb(162,0,255)' ]}
                                   start={[0.526,0]}
                                   end={[0.55, 1]}                     
                                   style={{borderRadius: 4,flex:1,margin:2}}
                  >
                      <View style={styles.circleGradient}>
                         <View style={styles.content}>
                            <Games gamesInfo={gamesInfo} 
                                   RoomName={RoomTitle}
                                   socket={nsSocket}
                                   setHandleComp={setHandleComp}
                                   setMyRoom={setMyRoom}
                                   setGmName={setGmName}
                            />
                         </View>
                      </View>
                  </LinearGradient>


                  <LinearGradient  colors={['rgb(0,188,212)','rgb(6,12,33)','rgb(6,12,33)','rgb(162,0,255)' ]}
                                   start={[0.0]}
                                   end={[1, 0.25]}                     
                                   style={{borderRadius: 4,flex:9,margin:2}}
                  >
                      <View style={styles.circleGradient}>
                         <View style={styles.content}>
                            <ChatBox socket={nsSocket} 
                                     chatsInfo={chatsInfo}
                            />
                         </View>
                      </View>
                  </LinearGradient>
            
          </View>

    </View>



     :<View style={[styles.containerBoxs ,styles.content]}><Game socket={nsSocket}
                                                                         myRoom={myRoom}
                                                                         GmName={GmName}
                                                                         setHandleComp={setHandleComp}
                                                                         
                                                                  />
     </View>}

  </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
     
    backgroundColor: 'black',
    
  },
  containerBoxs:{
    
  
    
  },
  header:{
    
     flex: 1,
    flexDirection:'row',
    margin:'1%',
    // height: '10%',
    justifyContent:'space-between',
    alignItems:'center',
    
    backgroundColor: 'rgb(215,182,163)',
    borderRadius: 10,
    
  },
  // content:{
  //      flex:9,
  //   flexDirection: 'row',
  // },
  contentBoxs:{
    
       
    margin: '1%',
    flexDirection: 'column',
   
    textAlign: 'left',
    color: 'aliceblue',
    borderRadius: 15,


  },
  secRYT:{
  
    backgroundColor:"rgb(215,182,163)",
    flex:1,
    marginHorizontal:'1%'
  },
  secMID:{
    flex:1,
    backgroundColor:"rgb(215,182,163)"
  },
  secLFT:{
    flex:1,
    marginHorizontal:'1%',
    backgroundColor: 'rgb(215,182,163)',
    padding:15,
  },
 game:{
  flex:9,
  marginHorizontal:'1%',
  backgroundColor: 'rgb(215,182,163)',
  padding:15,
 },
 circleGradient: {
      margin: 2,
      backgroundColor: 'rgb(6,12,33)',
      borderRadius: 5 ,
      flex:1,
     flexDirection:'row',
     
    },
  
    content:{
      borderRadius: 5 ,
        
        backgroundColor:'rgb(6,12,33)',
        
        flex:1,
        // flexDirection:'row'
  
    },
  

});





  {/* <View style={ styles.header}>

       <View>
         <Text>sing</Text>
         <Text>out</Text>
       </View>
       <View>
         <Text style={{fontWeight:'bold'}}>MafLine</Text>
       </View>

       <View>
         <Text>online:</Text>
         <Text>250</Text>
       </View>

     </View> */}

  // screen,nsSocket,title,RoomTitle,setTitle
  // const [x,setX]=useState({})
//  var x
//  const {screen}=route.params
//  if(screen === 'lobiScreen'){
//    const {...n}=route.params
//    x={...n}
//    console.log(n)
   
// }else if (screen === 'gameScreen') {
//   const {screen,...n}=route.params
  
//   x={...n}
//   console.log(n)
// } 


 //   <View style={[styles.containerBoxs ,styles.content]}>
        

    //     <View style={[styles.contentBoxs ,styles.secRYT]}><ChatBox 
    //                                                              socket={nsSocket} 
    //                                                              chatsInfo={chatsInfo}
    //                                                         />
    //     </View>
        
    //     <View style={[styles.contentBoxs ,styles.secMID]}><Games gamesInfo={gamesInfo} 
    //                                                              RoomName={RoomTitle}
    //                                                              socket={nsSocket}
    //                                                              setHandleComp={setHandleComp}
    //                                                              setMyRoom={setMyRoom}
    //                                                         />
    //     </View>
        
    //     <View style={[styles.contentBoxs,styles.secLFT] }><Users navigation={navigation} 
    //                                                              socket={nsSocket} 
    //                                                              RoomTitle={RoomTitle}
    //                                                              setTitle={setTitle}
    //                                                              title={title}
    //                                                              usersInfo={usersInfo}
    //                                                          />
    //       </View>

    //  </View> 



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





