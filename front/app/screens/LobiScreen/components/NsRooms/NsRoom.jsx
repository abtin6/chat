import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React,{useState,useEffect} from 'react';
import { AntDesign } from '@expo/vector-icons';
import Namespace from './components/Namespace';
import Rooms from './components/Rooms'
import socket from '../../../../api/Socket';
import {useDispatch,useSelector} from 'react-redux'
import { namespaceAdded } from '../../../../../Redux-toolkit/reducers/NameSpacesSlice';


export default function NsRooms({navigation}) {
  const initialTitle='Rooms'
  const [title,setTitle]=useState(initialTitle);
 const [handleComp,setHandleComp]=useState(true);
 const [nsSocket,setNsSocket]=useState('')
  const ns=useSelector(state=>state.namespace)
  const dispatch=useDispatch()
  // useEffect(()=>{
     socket.on('nsLoad',(nsData) => {
       console.log(nsData);
   
         nsData.forEach((e)=>{
         dispatch(namespaceAdded({namespace:e.title,endpoint:e.endpoint}));
     
       });

    });

  // })
   

    

    let backBTN=()=>{
         if (title == ns[0].namespace || title == ns[1].namespace || title == ns[2].namespace ){  
             setTitle(initialTitle);
             setHandleComp(!handleComp)
             socket.disconnect()
   
         }
    
     }
    
  return (
    <>
    <View style={{backgroundColor:'rgb(58,47,142)',flex:1}}>
       <View style={styles.headerLFT}>
          {title !== initialTitle
              ?<TouchableOpacity onPress={backBTN}><AntDesign name="leftsquareo" size={25} color="white"/></TouchableOpacity>
              :null 
          }
         
          <Text style={{marginRight:25,color:"white"}}>{title}</Text>
       </View>
 
       <View style={styles.contentLFT}>
         
           {handleComp?<Namespace setTitle={setTitle} handleComp={handleComp} setHandleComp={setHandleComp} setNsSocket={setNsSocket}/>
                      :<Rooms title={title} setTitle={setTitle} navigation={navigation} nsSocket={nsSocket}/>
            }
        </View>
        </View>   
    </>
  )
}

const styles = StyleSheet.create({
  
  headerLFT:{
    backgroundColor:'rgb(34, 56,177)',
   flex:1,
   flexDirection:"row-reverse",
   padding:'3%',
    
    
    
  },
  contentLFT:{
    flex:15
  },
  BtnRooms:{
    flex:1,
    flexDirection:"row",
    padding: '10%',
    backgroundColor: 'rgb(59, 0, 3)',
    margin: '3%',
    
  }

})









