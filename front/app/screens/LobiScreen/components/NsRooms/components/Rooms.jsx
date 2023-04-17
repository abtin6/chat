import { StyleSheet, Text, View ,TouchableOpacity,FlatList,Image} from 'react-native'
import React,{useState,useEffect} from 'react';
import {useSelector} from 'react-redux'

export default function Rooms({title,setTitle,navigation,nsSocket}) {
    
    const [Rooms1,setRooms1]=useState([])

    const namespaces=useSelector(state=>state.namespace)
    const username=useSelector(state=>state.user.value)
  
useEffect(()=>{
      
        if (title == namespaces[0].namespace || title == namespaces[1].namespace || title == namespaces[2].namespace ){{ 
          
           let exist=namespaces.find(e=>e.namespace===title)
           let myRooms=exist.rooms
           setRooms1(myRooms)
        }
    }
   
})

  let handleRoom=(room)=>{
           setTitle(room)
           nsSocket.emit('joinRoom',{room,username})
           navigation.navigate('ROOM',{nsSocket,title,RoomTitle:room,setTitle})
     
   }

  return (
    <>
       
       <View>
       
          <FlatList 
             data={Rooms1} 
             renderItem={({item})=>(
                <TouchableOpacity onPress={()=>handleRoom(item.title)}>
                   <View style={styles.BtnRooms}>
                      <Text style={{color:'white'}}>{item.title}</Text>
                      {/* {noNumber?<Text style={{color:'white',borderWidth: 1,borderColor: "white",marginLeft:'60%'}}>{numUsers}</Text>:null} */}
                                    
                                    
                    </View>
                                  
                </TouchableOpacity>
               )}
             keyExtractor={(item, index) => index.toString()}
           />

        </View>
        
            
    </>
  )
}

const styles = StyleSheet.create({
  
  
  headerLFT:{
    backgroundColor:'rgb(109, 0,0)',
   height: '8%',
   flexDirection:"row-reverse",
   padding:'3%',
   
  },
  BtnRooms:{
    flex:1,
    flexDirection:"row",
    padding: '10%',
    backgroundColor: 'rgb(10,2,62)',
    margin: '3%',
    
  }
})
