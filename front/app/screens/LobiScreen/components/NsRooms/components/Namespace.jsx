
import { StyleSheet, Text, View ,TouchableOpacity,FlatList} from 'react-native'
import React,{useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import { AddRooms } from '../../../../../../Redux-toolkit/reducers/NameSpacesSlice';
import { io } from "socket.io-client";
let nsSocket=null;
export default function Namespace({setTitle,setHandleComp,setNsSocket}) {  //,joinNamespace
 
    
    const [nsRooms,setNsRooms]=useState([])
   
    const dispatch=useDispatch()
    const namespace=useSelector(state=>state.namespace)
   
    useEffect(()=>{
      setNsRooms(namespace)
    })

   let handlerNS=(ns)=>{ //async
        setTitle(ns)

        let myNs=namespace.find(e=>e.namespace === ns)
       
        if(nsSocket){nsSocket.disconnect()}  // socket.disconnect()   nsSocket.close()
        nsSocket=io.connect(`http://192.168.1.161:3000${myNs.endpoint}`)
        setNsSocket(nsSocket)
        let gam=myNs.rooms
        if(gam == ''){
            nsSocket.emit('RoomLoad')
            nsSocket.on('RoomLoad',roomData=>{
            console.log('RoomLoad')
            console.log(roomData)
  
            roomData.forEach(e=>{
               let endpoint=myNs.endpoint
               dispatch(AddRooms({endpoint,name:e.name,title:e.title,history:e.history,userList:e.userList,showPlay:e.showPlay}))
            })
         })
         }
        
       
        setHandleComp(false)
       
        
    }


  return (
    <>
       <View>
          <FlatList 
             data={nsRooms} 
             renderItem={({item})=>(
                <TouchableOpacity onPress={()=>handlerNS(item.namespace)}>
                   <View style={styles.BtnRooms}>
                      <Text style={{color:'white'}}>{item.namespace}</Text>
                                  
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
 
  BtnRooms:{
    flex:1,
    flexDirection:"row",
    padding: '10%',
    backgroundColor: 'rgb(10,2,62)',
    margin: '3%',
    // 'rgb(58,47,142)'
  }
})















// import { StyleSheet, Text, View ,TouchableOpacity,FlatList} from 'react-native'
// import { AntDesign } from '@expo/vector-icons';
// import React,{useState,useEffect} from 'react';
// import {useSelector} from 'react-redux'
// import { io } from "socket.io-client";
// import socket from '../../../api/Socket';
// // import RoomComponent from './Room'



// let nsSocket=null;
// export default function Rooms({setNsRoom,rooms1,ns}) {
  
//     //Get user of Redux
//     const myuser=useSelector(state=>state.user)
//     const username=myuser.myname
    

//     const initalTitle='Rooms'

//     const [title,setTitle]=useState(initalTitle);

//     const [nsRooms,setNsRooms]=useState([])
//     const [namespaces,setNamespaces]=useState([])

//     const [Rooms,setRooms]=useState([])
//     const [nsConnect,setNsConnect]=useState({})
//     // const [numUsers,setNumUsers]=useState(0)
//     // const [noNumber,setNoNumber]=useState(false)
    
  
//     let a=[]
//     let b=[]
//     // let numUsers=0
// socket.on("nameSpaceLoad", (nsData) => {
//        console.log(nsData)
       
//        nsData.forEach((e)=>{
          
//           a.push({room:e.title,endpoint:e.endpoint})
          
//         })
        
//        setNsRooms(a)
//        setNamespaces(a)
// 		});
// console.log(nsRooms,rooms1)
//   let sam=(room)=>{
//    console.log(ns)
  
//    ns=nsRooms.find(e=>{return e.room === room})
//    setNsRoom(false)
//     joinNamespace(ns.endpoint)
//     setNsConnect(ns.endpoint)
    
//     // setTitle(ns.room)
//     // rooms1(a)
//       // if(room == namespaces[0].room && title == initalTitle ){
        
//         //  setTitle(room)
         
//         // joinNamespace(nsRooms[0].endpoint)
//         // setNsConnect(nsRooms[0].endpoint)
//         // setNoNumber(true)
        
//       // }else if (room == namespaces[1].room && title == initalTitle) {
//       //   setTitle(room)
//       //   joinNamespace(nsRooms[1].endpoint)
//       //   setNsConnect(nsRooms[1].endpoint)
//       //   // setNoNumber(true)
        
//       // }else if (room == namespaces[2].room && title == initalTitle){
//       //   setTitle(room)
//       //   joinNamespace(nsRooms[2].endpoint)
//       //   setNsConnect(nsRooms[2].endpoint)
//       //   // setNoNumber(true)
        
//       // }else {
          
//       //      setNsRooms(null)
//       //      joinNamespace(nsConnect)
//       //      console.log(username)
//       //      nsSocket.emit('joinRoom',{room,username})
//       //      navigation.navigate('ROOM',{socket:nsSocket,Rooms:Rooms,nsRooms:setNsRooms,RoomTitle:room})
          
//       // }
  
//     }
// const joinNamespace=(endpoint)=>{
//   if(nsSocket){nsSocket.disconnect()}  // socket.disconnect()   nsSocket.close()
//   nsSocket=io.connect(`http://192.168.1.161:3000${endpoint}`)
//   nsSocket.on('RoomLoad',(roomData)=>{
//     console.log(roomData)
//     roomData.forEach(e=>{
     
//         b.push({room:e.title})
        
//     })
//     setNsRooms(b)
//     setRooms(b)
    
     
//   })
// }

//     let zam=()=>{
//         if (title == namespaces[0].room || title == namespaces[1].room || title == namespaces[2].room ){
//          setTitle(initalTitle);
//          setNsRooms(namespaces)
//         //  setNoNumber(false)
//          socket.disconnect()
   
//         }else if (title == "Room-1" || title == "Room-2" ){
//          setTitle(namespaces[0].room);
//         // setNsRooms(Rooms)
//         setNoNumber(false)

//         }else if (title == "MafLaf Gruop"){
//          setTitle(namespaces[1].room);
//          setNsRooms(Rooms)
//         //  setNoNumber(false)
//         }else if (title == "mozakere scenario" || title == "nato scenario" ){
//          setTitle(namespaces[2].room);
//          setNsRooms(Rooms)
//         //  setNoNumber(false)
//         } 
//      }
     
    

//   return (
//     <>
//        <View style={styles.headerLFT}>
//                <TouchableOpacity onPress={zam}><AntDesign name="leftsquareo" size={25} color="white"/></TouchableOpacity> 
//                <Text style={{marginRight:25,color:"white"}}>{title}</Text>
                
//        </View>
//        <View>

//               <FlatList 
//                    data={nsRooms} 
//                    renderItem={({item})=>(
//                            <TouchableOpacity onPress={()=>sam(item.room)}>
//                                   <View style={styles.BtnRooms}>
//                                     <Text style={{color:'white'}}>{item.room}</Text>
                                    
                                    
                                    
//                                   </View>
                                  
//                            </TouchableOpacity>
//                     )}
//                     keyExtractor={(item, index) => index.toString()}
//                />
                   

//         </View>
            
//     </>
//   )
// }

// const styles = StyleSheet.create({
  
  
//   headerLFT:{
//     backgroundColor:'rgb(109, 0,0)',
//    height: '8%',
//    flexDirection:"row-reverse",
//    padding:'3%',
    
    
    
//   },
//   BtnRooms:{
//     flex:1,
//     flexDirection:"row",
//     padding: '10%',
//     backgroundColor: 'rgb(59, 0, 3)',
//     margin: '3%',
    
//   }
// })