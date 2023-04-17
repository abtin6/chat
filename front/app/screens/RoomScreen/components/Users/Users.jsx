import { StyleSheet, Text, View ,TouchableOpacity,FlatList,Image} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import React,{useState,useEffect} from 'react';
import User from './User'
import { useSelector } from 'react-redux';


export default function Users({socket,navigation,RoomTitle,usersInfo,setTitle,title}) {

   
   const username=useSelector(state=>state.user.value)
   
   const [title2,setTitle2]=useState('')
 
   const [userList,setUserList]=useState([])

let myusrList=[]
  useEffect(()=>{

    setTitle2(RoomTitle)
   
    socket.on('usersInfo',()=>{
      console.log('usersInfo')
      setUserList(usersInfo) 
    })

   
    socket.on('joinMyUsr',data=>{
      console.log('joinMyUsr')
      console.log(data)
      setUserList(e=>[...e,{userList:data}])
    })
    
  
    
    socket.on('usersRoom',data=>{
      console.log('usersRoom')
      console.log(data)
      data.forEach((e)=>{
        setUserList(i=>[...i,{userList:e}])
      })
    
    })
    socket.on('usersRoom2',data=>{
      console.log('usersRoom2')
      console.log(data)
      // myusrList=[]
      let acc2=data.filter(e=>e !== username)
      console.log(acc2)
      acc2.forEach((e)=>{
        myusrList.push({userList:e})
      })
      setUserList(myusrList)
    })
    socket.on('myusr',(data)=>{
      console.log('myusr')
      setUserList([])
      console.log(data)
      // myusrList=[]
      let acc2=data.filter(e=>e !== username)
      console.log(acc2)
      acc2.forEach((e)=>{
        setUserList(i=>[...i,{userList:e}])
      })
      // setUserList(myusrList)
    })

    socket.on('usersRoom3',data=>{
      console.log('usersRoom3')
      setUserList([])
      console.log(data)
      if(data !== username){
         setUserList(e=>[...e,{userList:data}])
      }
    })
   
    socket.on('leftMyUsr',(usr)=>{
      console.log('leftMyUsr')
       let us=userList.filter(e=>e.userList !== usr)
       setUserList(us)
    })

    socket.on('leftRmToGm',(usr)=>{
      console.log('leftRmToGm')
       let us=userList.filter(e=>e.userList !== usr)
       setUserList(us)
    })

    
  return ()=>{
    socket.off('usersInfo')
    socket.off('joinMyUsr')
    socket.off('leftMyUsr')
    socket.off('leftRmToGm')
    socket.off('usersRoom')
    socket.off('usersRoom2')
    socket.off('myUserOnlone2')
    socket.off('myusr')
    socket.off('usersRoom3')
  }
})
  

  let backBTN=()=>{
    // socket.disconnect()
    console.log(title2,username)

    socket.emit('leave-room',{title:title2,username})
    
    setTitle(title)
    navigation.navigate('LOBI')
  
  }
  return (
    <>
     
    <View style={{flex:1,margin:"5%"}}>
       <View style={{flex:1 ,flexDirection:'row',justifyContent:'space-between'}} >
          <TouchableOpacity onPress={backBTN}><AntDesign name="leftsquareo" size={25} color='rgb(162,0,255)' /></TouchableOpacity> 
           <Text style={{color:'white'}}>2</Text>
       </View>
       <View style={{flex:2,justifyContent:'center',alignItems:'center'}}>
          <Text style={{color:"white"}} >{title2}</Text>
     
       </View>
       <View style={{borderWidth: 0.5,borderColor:'gray'}}
/>
    </View>
    
    <View style={{flex:9,justifyContent:'center',alignItems:'center'}}>
         <FlatList data={userList} 
                           renderItem={({item})=>(
                            
                                  <View style={{backgroundColor:'red'}}><User usr={item.userList}/></View>
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
  myusBox:{
    backgroundColor: 'rgb(59, 0, 3)',
  
  }
})


// Display the list of online chat room users (except myself) in React Native

// I want to display the list of online users (I managed to do this). But in this list I want to see all users except myself (I didn't manage to do this). The problem is that we cannot create elements in React Native and inside function sockets Please guide me how to do this


  //  useEffect(() => {
  //   Socket.on('chat-Room-Users', (data) => {
  //     console.log(data);
  //     setRoomUsers(data);
  //   })
  //   return () => Socket.off('chat-Room-Users');

  //   // Socket.emit('name',myuser.myname)
  //   // Socket.on('upusers',(b)=>{
  //   // const b={users:['mansa']}
  //   // let data=JSON.stringify(b.users)
  //   // let a=[]
  //   // a.forEach(value=>{
  //   //   console.log(`val : ${value}`)
      
  //   //   const socketExist=a.find(e=>e === b)
  //   //   if(!socketExist){
  //   //      a.push(b)
  //   //      seta(a)
  //        // let zz=a.shift()
  //        // setMylist=(zz)
  //       // console.log(`a2 : ${a}`)
  //       // console.log(`zz : ${zz}`)
     
  //   //    }
  //   // });
  //     // for(let value of a){
        
  //     //  };
     
  //     // const socketExist=my.find(e=>e === man)
  //     // if(!socketExist){setSam(users)}
  //     // if(!socketExist){console.log('peyda shod')}
       
  //     // setSam(sam.concat(users))
    
  //   //  console.log(`my socket : ${b}`)
  //   //  console.log(`object : ${b}`)
     
      
  //   //  console.log(`x : ${x}`);
  //   //  console.log(typeof(b))
    
     
   
  //   // })
  
    
  //   // Socket.on('remove-user',({socketId})=>{
  //   //   console.log(socketId)
  //     // if(socketId){
  //     //   socketId.remove()
  //     // }
  //   // })
  // }, [Socket]);
  // const leaveRoom = () => {
   
  //   Socket.emit('leave_room', { username});
  //   // Redirect to home page
  //   // navigate('/', { replace: true });

  // };




  {/*       
       <View style={[styles.LftBoxs,styles.headerLFT]}>
               <TouchableOpacity onPress={backBTN}><AntDesign name="leftsquareo" size={25} color="white" /></TouchableOpacity> 
                <Text style={{marginRight:25,color:"white"}} >{title2}</Text>
                
       </View>
       <View style={[styles.LftBoxs,styles.contentLFT]}>
      
      
                   <FlatList 
                           data={userList} 
                           renderItem={({item})=>(
                            
                                  <View style={styles.myusBox}><Text style={{color:'white'}}>{item.userList}</Text></View>
                               
                           )}
                           keyExtractor={(item, index) => index.toString()}
                   />
                

        </View> */}
  
