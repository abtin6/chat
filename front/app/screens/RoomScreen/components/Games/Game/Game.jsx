import { StyleSheet, Text, View,TouchableOpacity ,FlatList, Image} from 'react-native'
import React,{useRef,useState,useEffect} from 'react';
import { AntDesign } from '@expo/vector-icons';
import {useSelector} from 'react-redux'


const Game = ({socket,myRoom,setHandleComp,GmName}) => {
  
  const username=useSelector(state=>state.user.value)
  const [usList,setUsList]=useState([])
  
let usersGmInfo=[]

  useEffect(()=>{
   
 
   socket.on('GameInformation',(gameInfo)=>{
      console.log('GameInformation')
      usersGmInfo=[]
      console.log(gameInfo)
      let acc1=gameInfo.listply.filter(e=>e !== username)
      console.log(acc1)
      acc1.forEach((e)=>{
            usersGmInfo.push({userList:e})
            setUsList(usersGmInfo)
      })
          
    })

 
    socket.on('joinRmToGm',data=>{
      console.log('joinRmToGm')
      console.log(data)
      if(data !== username){
         setUsList(e=>[...e,{userList:data}])
       }
     })

    socket.on('leftGmToRm',usr=>{
      console.log('leftGmToRm')
      console.log(usr)
      let us=usList.filter(e=>e.userList !== usr)
      setUsList(us)
    })
     

     socket.on('closePageGame',()=>{
      console.log('closePageGame')
      setHandleComp(true)
     })


     return ()=>{
      socket.off('joinRmToGm')
      socket.off('joinRmToGm')
      socket.off('closePageGame')
      socket.off('GameInformation')
      socket.off('leftGmToRm')
     }
  })

  const backBTN=()=>{
    console.log(GmName)
    socket.off('backGmToRm')
    socket.emit('backGmToRm',{room:myRoom,username,GmName})
    setHandleComp(true)
  }
  
  return (
    <>
       <View style={{flex:1}}>  
           <TouchableOpacity onPress={backBTN}><AntDesign name="leftsquareo" size={45} color='white' /></TouchableOpacity> 
       </View>
       <View  style={{flex:5,backgroundColor:'red'}}>
                    <FlatList 
                           data={usList} 
                           renderItem={({item})=>(
                            
                                  <View style={styles.myusBox}><Text style={{color:'white'}}>{item.userList}</Text></View>
                               
                           )}
                           keyExtractor={(item, index) => index.toString()}
                   />

        </View>             
    </>
  )
}

export default Game

const styles = StyleSheet.create({

      
  headerLFT:{
    backgroundColor:'rgb(109, 0,0)',
   height: '8%',
   flexDirection:"row-reverse",
   padding:'3%',
    
    
    
  },
  myusBox:{
    padding: '10%',
    backgroundColor: 'rgb(59, 0, 3)',
    margin: '3%',
    
  }
})

{/* 
       <FlatList 
                           data={usList} 
                           renderItem={({item})=>(
                            
                                  <View style={styles.myusBox}><Text style={{color:'white'}}>{item}</Text></View>
                               
                           )}
                           keyExtractor={(item, index) => index.toString()}
                   />
      <Text>Game</Text> */}


{/* <View style={[styles.LftBoxs,styles.headerLFT]}>
<TouchableOpacity onPress={backBTN}><AntDesign name="leftsquareo" size={25} color="white" /></TouchableOpacity> 
 {/* <Text style={{marginRight:25,color:"white"}} >{title}</Text> */}
 
//</View> */}