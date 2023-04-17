import { StyleSheet, Text, View,TouchableOpacity,TextInput,Image, Button } from 'react-native'

import React,{useState} from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {useSelector} from 'react-redux'





export default function Profile() {

const user=useSelector(state=>state.user.value)

  const [nickname,setNickname]=useState('')
  const [getImg,setImg]=useState(null)
  const [score,setScore]=useState(0)
  const [chat,setChat]=useState('')
  const [chats,setChats]=useState([])
  const [nick3,setNick3]=useState(false)
    const pic=async()=>{
        let result=await ImagePicker.launchImageLibraryAsync({
          mediaTypes:ImagePicker.MediaTypeOptions.Images,
          allowsEditing:true,
          aspect:[3,4],
          quality:1
        })
        if (!result.cancelled) {
          setImg(result.uri)
        }
      }
      let nick=()=>{
        setNick3(!nick3)
        
  }
  let inpName=null;
  let btnName=null;
  if (nick3) {
    inpName= <TextInput
    placeholder='nick name'
    onSubmitEditing={()=>{subnam}}
    autoCorrect={false}
    value={nickname}
    style={styles.myInput}
    placeholderTextColor='gray'
    onChangeText={value=>setNickname(value)}
    // onChange={() => setNickname(e.target.value)}

   />;
   const submit=()=>{
if (nickname.length>0) {
  dispatch(addUser())
}
   }
   btnName=<Button onPress={submit} title='ok'/>;
   console.log(nickname)
  }
  const subnam=()=>{
    socket.emit('nik',nickname)
    setChat('');
    

  }
  return (
    <>
           <View style={{width: '50%', height: '10%',marginTop:'9%'}}>
        <TouchableOpacity onPress={pic}>
        
        
        {getImg ? (
          <Image source={{uri:getImg}}  style={ styles.proAx}/>
        ):(
          <Image source={{uri:'https://s6.uupload.ir/files/pro_des.png'}}  style={ styles.proAx}/>
        )}
       </TouchableOpacity> 
       </View>
        <TouchableOpacity onPress={nick} style={{flexDirection:"row-reverse"}}>
           <Text style={{fontSize:18}}>{nickname}</Text>
           <MaterialCommunityIcons name="account-edit-outline" size={16} color="blueviolet" />
          
        </TouchableOpacity> 

        {inpName}
        {btnName}
        <View style={{flexDirection:"row-reverse",marginTop:'10%'}}>
        <Entypo name="circle-with-minus" size={24} color="red" />
        <FontAwesome name="circle" size={24} color="green" />
        <FontAwesome name="exclamation-circle" size={24} color="blue" />
        
        </View>
          <View style={{flexDirection:"row-reverse",marginTop:'10%'}}>
          <Ionicons name="star" size={24} color="yellow" />
            <Text style={{color:'black' ,marginRight:5}}>Overall Score </Text>
            
          </View><Text>{score}</Text>
          <View style={{flexDirection:"row-reverse",marginTop:'10%'}}>
          <MaterialIcons name="groups" size={40} color="brown" />
          <View>
            <Text>    Group</Text>
            <Text>   MafLaf</Text>
            <Text>{user}</Text>
          </View>
          
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    myInput:{
   
        borderStyle:'solid',
        borderWidth:2,
        textAlign:'left',
        borderColor: 'rgb(102, 102, 102)',
        backgroundColor: 'rgb(8, 20,8)',
        height:'4%',
        marginTop:'7%',
        
        paddingRight:"5%",
        color:"white",
        width:"70%"
      
       },
       proAx:{
         width: '100%',
          height: '100%',
          borderRadius:50,
          
          
        borderWidth:2,
        
        borderColor: 'black',
       }
     
})