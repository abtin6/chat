import { StyleSheet, Text, View ,TouchableOpacity,FlatList,Image} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import React,{useState,useEffect} from 'react';

import { useSelector } from 'react-redux';


export default function User({usr}) {

   
  return (
    <>
      <View style={{backgroundColor:'blue',flex:1,flexDirection:"row"}}>

        <Image source={require('../../../../../assets/avatar.png')}style={{height:40,width:40}}/>
        <View>
          <Text style={{fontWeight:'bold',fontSize:'3'}}>12</Text>
          <Text style={{fontWeight:'bold',fontSize:'3'}}>Gp</Text>
        </View>
         {/* <Image source={{uri:'https://s2.uupload.ir/files/avatar_ts9o.png'}} style={{height:50,width:50}}/> */}
      </View>
      <View style={{backgroundColor:'green',height:20}}><Text style={{color:'white'}}>{usr}</Text></View>
      
      
    </>
  )
}

const styles = StyleSheet.create({
  
 
})