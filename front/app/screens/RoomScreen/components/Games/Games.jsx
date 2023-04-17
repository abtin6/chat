import { StyleSheet, Text, View ,TouchableOpacity,FlatList} from 'react-native'
import { useSelector } from 'react-redux';
import React,{useState,useEffect} from 'react';
import { Octicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
export default function Games({socket,RoomName,setHandleComp,setMyRoom,gamesInfo,setGmName}) {
    
   const [gameList,setGameList]=useState([])
   const username=useSelector(state=>state.user.value)


useEffect(()=>{
  socket.on('myGm',(data)=>{
    console.log('myGm')
    setGameList([])
    console.log(data)
    data.forEach((e)=>{
      setGameList(i=>[...i,{showPlay:e.name,creator:e.creator,listply:e.listply,uID:e.uID}])
    })
    

  }) 
  return () => {
    
    socket.off('myGm')
}; 
},[gameList])
   useEffect(()=>{

      socket.on('gamesInfo',()=>{
        console.log('gamesInfo')
         console.log(gamesInfo)
         setGameList(gamesInfo)
         
      })
      socket.on('gamesInfo2',()=>{
        console.log('gamesInfo2')
        console.log(gamesInfo)
        setGameList(gamesInfo)
        
     })
     
     
      socket.on('GameIcon',data=>{
        console.log('GameIcon')
           console.log(data)
           setGameList(e=>[...e,{showPlay:data.name,creator:data.creator,listply:data.listply,uID:data.uID}])
      })

      socket.on('deleteMyGame',(Gm)=>{
        console.log('deleteMyGame')
        let us=gameList.filter(e=>e.showPlay !== Gm)
       
        setGameList(us)
      })
        
      return () => {
          socket.off('gamesInfo')
          socket.off('gamesInfo2')
          socket.off('GameIcon')
          socket.off('deleteMyGame')
          socket.off('myGm')
      };

   })
   

   //      socket.off('myplaylist')
   //      socket.on('myplaylist',data=>{
   //         console.log(plays)
   //         console.log(data)
   //         let us= plays.filter(e=>e.showPlay !== data.name)
   //         console.log(us)
   //         setPlays(us)
   //      })
  
   const handlePlay=()=>{
     console.log(RoomName,username)
     var Random_Number = Math.floor(Math.random() * 10000);
     socket.emit('createGm',{Random_Number,username})
     setHandleComp(false)
     setMyRoom(RoomName)
     setGmName(Random_Number)
   }
   const handlePlay2=(e)=>{
    console.log(e)
    socket.emit('joinGm',{title:RoomName,username,gameName:e})
    
    setHandleComp(false)
   
    // setMyRoom(RoomName)
   
   }
 
  return (
    <>
       
       <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>

           <LinearGradient start={[0.5,0]}
                           end={[0.5, 1]}
                           colors={['rgb(0,188,212)','rgb(162,0,255)' ]}
                           style={styles.myusBox2}
           >
                                
                 <TouchableOpacity onPress={handlePlay}>
                    <Text style={{color:'rgb(6,12,33)',fontSize:40,fontWeight:'bold'}}>+</Text>
                 </TouchableOpacity>
                 
           </LinearGradient>
                 
                               
                               
                   <View style={{flexDirection:'row'}}>

                  

                  <FlatList
                             data={gameList}
                             renderItem={({ item }) => (
                              <LinearGradient start={[0,0]}
                                              end={[1, 1]}
                                              locations={[0.2,0.4,0.5]}
                                              colors={['rgb(0,188,212)','rgb(6,12,33)','rgb(6,12,33)','rgb(162,0,255)' ]}
                                              style={{borderRadius: 5,margin:10,marginTop:20}}
                              >
                                   <TouchableOpacity style={styles.circleGradient1}  onPress={()=>handlePlay2(item.showPlay)}>
                                         <Text style={{color:'white'}}>{item.showPlay}</Text>
                                    </TouchableOpacity>
                             </LinearGradient>
                                        
                                            
                              )}
                             keyExtractor={(item, index) => index.toString()}
                  />
                         
                                 
                    </View>
                     
                   
                   
                    

        </View>
            
    </>
  )
}

const styles = StyleSheet.create({
  
  

  myusBox2:{
       paddingBottom:8,
      marginHorizontal:5,
      borderRadius: 5,
      marginVertical:15,
      justifyContent:'center',
      alignItems:'center'
    },
    circleGradient1: {
          margin: 2,
          backgroundColor: 'rgb(6,12,33)',
          borderRadius: 5 ,
          padding:5,
          
        },
    
  
})



                              