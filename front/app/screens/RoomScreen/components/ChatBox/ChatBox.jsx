import { StyleSheet, Text, View,TouchableOpacity,TextInput, FlatList,Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import React,{useEffect,  useState} from 'react';
import { useSelector } from 'react-redux';
import Message from './component/Message'
import { MaterialIcons } from '@expo/vector-icons';

export default function ChatBox({socket,chatsInfo}) {

 const [chatList,setChatList]=useState([])   
 const [message,setMessage]=useState('')


let mychatList=[]
 const username=useSelector(state=>state.user.value)
  

  useEffect(()=>{
    socket.on('myCht',(data)=>{
      
      setChatList([])
      console.log('myCht')
      console.log(data)
      data.forEach((e)=>{
        setChatList(i=>[...i,{chatMSG:e.msg,name:e.name,time:e.time,avatar:e.avatar}])
      })
      
    })

    return ()=>{
      
      socket.off('myCht')
    }
  },[])
  useEffect(()=>{
       
          socket.on('chatsInfo',()=>{
            console.log('chatsInfo')
            console.log(chatsInfo)
            setChatList(chatsInfo)
           
          })

         
        
          socket.on('chatsInfo2',(data)=>{
            console.log('chatsInfo2')
            // mychatList=[]
            console.log(data)
            if(data !== username){
            
              
              data.forEach((e)=>{
                 mychatList.push({chatMSG:e.msg,name:e.name,time:e.time,avatar:e.avatar})
              
              })
              setChatList(mychatList)
            }
          }) 
  
     socket.on('chatServer',data=>{
      console.log('chatServer')
      setChatList(e=>[...e,{chatMSG:data.msg,name:data.name,time:data.time,avatar:data.avatar}])
      })
      return ()=>{
        socket.off('chatsInfo')
        socket.off('chatsInfo2')
        socket.off('chatServer')
      
      }
 })

 const handleNewMessage=(msg,name)=>{
       socket.emit('chat',{msg,name})
       setMessage('')
  }

  return (
    <>
    <View style={{ flex: 1}}>
      
      <View style={{flex:7}}>
        
            

               <FlatList
               style={{flexDirection:'column-reverse',margin:'2%'}}
                  data={chatList}
                  renderItem={({ item }) => (
                    <View style={{flex:1,flexDirection:'row',borderColor: 'yellow', borderWidth:1,backgroundColor:'blue',borderRadius:5,marginBottom:2}}>
                      <View style={[styles.imgContainer,]}>
                        
                        <Image source={{uri:(item.avatar)}}style={styles.img}/>
                      </View>
                      <View style={{flex:7}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                           <View style={{flex:1}}><Text style={{color:'black',fontWeight:'bold'}}>{item.name}</Text></View>
                           <View style={{flex:2}}><Text style={{color:'gray',fontSize:12}}>{item.time}</Text></View>
                        </View>
                        <View style={{flex:2}}>
                            <Text style={{color:'black'}}>{item.chatMSG}</Text>
                        </View>
                         
                      </View>
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
              />
        
        {/* <Image source={require('../../../../../assets/avatar.png')}style={styles.img}> */}
       
      </View>
      <View style={{flex:1,flexDirection:'row',margin:'2%'}}>
      
           <View style={{flex:6}}>
           <LinearGradient start={[0.5,0]}
                           end={[0.5, 1]}
                          
                           colors={['rgb(6,12,33)','rgb(46,0,72)' ]}
                           locations={[0.3,0.9]}
                           
           >
                                
                
                  <TextInput
                    style={{borderWidth: 1,borderColor:'white',color:'white',paddingTop:5,fontSize:15}}
                    numberOfLines={4}
                    multiline
                    scrollEnabled
                    autoFocus
                    textAlign='right'
                    maxLength={80}
                    value={message}
                    onChangeText={(e) => setMessage(e)}
             />
           </LinearGradient>
            
          </View>
          <View style={{flex:1}}>
                <TouchableOpacity
                    style={{borderWidth: 2,borderColor:'white',justifyContent:'center',alignItems:'center'}}
                    onPress={()=>handleNewMessage(message,username)}
                >
                  <View style={{height:78,justifyContent:'center',alignItems:'center'}}>
                    <MaterialIcons name="send" size={24} color="white" />
                        {/* <Text style={{ color:'white',fontSize:56,paddingHorizontal:'10%'}}>&rsaquo;</Text> */}
                   </View> 
                </TouchableOpacity>
          </View>
      </View>
    </View>
        
    </>
  )
}

const styles = StyleSheet.create({
imgContainer:{
  marginRight: 5,
  height:'100%',
  width: "100%",
  borderRadius: "50%",
  flex:1,
  // backgroundColor:'red'
},
img:{
  height:40,
  width: 40,
  borderRadius: 20,
}
     
})


// useLayoutEffect(()=>{
//   setUser(username)
//     socket.emit('findRoom')
//     socket.on('foundRoom',(e)=>{
//       setChatMessages(e)
//     })

    
// },[])
// useEffect(()=>{
//   socket.on('foundRoom',(e)=>{
//     setChatMessages(e)
//   })
// },[socket])
// const handleNewMessage=()=>{
//   const hour =
//   new Date().getHours() < 10
//       ? `0${new Date().getHours()}`
//       : `${new Date().getHours()}`;

// const mins =
//   new Date().getMinutes() < 10
//       ? `0${new Date().getMinutes()}`
//       : `${new Date().getMinutes()}`;
// socket.emit('newMessage',{
//   message,
//   room_id:id,
//   user,
//   timestamp: { hour, mins },
// })

//  setMessage('')
// }
// console.log(a)


{/* <View style={{ flex: 1}}>
<View style={{backgroundColor:'blue',flexDirection:'row',height:'90%'}}>
     {chatMessages[0] ? (
          <FlatList
                  data={chatMessages}
                  renderItem={({ item }) => (
                      <Message item={item} user={user} />
                  )}
                  keyExtractor={(item) => item.id}
              />
          ) : ("")
       }
</View>
<View style={{backgroundColor:'yellow',flexDirection:'row',height:'10%'}}>
{/* <Text>input box</Text> */}
//      <View >
//      <TextInput
//               style={{borderWidth: 2,borderColor:'black',height:'100%'}}
//               value={message}
//               onChangeText={(value) => setMessage(value)}
//      />
//     </View>
//     <View>
//           <TouchableOpacity
//               style={{borderWidth: 2,borderColor:'red',height:'100%'}}
//               onPress={handleNewMessage}
//           >
//               <View>
//                   <Text style={{ color:'black'}}>SEND</Text>
//               </View>
//           </TouchableOpacity>
//     </View>
// </View>
// </View> */}