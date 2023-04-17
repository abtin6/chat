import { StyleSheet, Text, View ,TouchableOpacity,FlatList,Image} from 'react-native'
import { AntDesign } from '@expo/vector-icons';

import React,{useState} from 'react';

export default function Menu() {
    const [x,setX]=useState([
        {key:'1',ply:'new play'},
        
   ])
  return (
    <>
       
       <View style={[styles.MidBoxs,styles.contentMID]}>

                  
                               <TouchableOpacity >
                                  <View style={styles.myusBox2}><Text style={{color:'white'}}>menu</Text></View>
                               </TouchableOpacity>
                               <View>
                                <Image source={{uri:'https://s2.uupload.ir/files/roomicon1-removebg-preview_uzom.png' }} style={{width:80,height:80}}/>
                               </View>
                               <View>
                                <Image source={{uri:'https://s2.uupload.ir/files/roomicon-removebg-preview_3ajy.png' }} style={{width:80,height:80}}/>
                               </View>
                     
                   
                   
                    

        </View>
            
    </>
  )
}

const styles = StyleSheet.create({
  
  

  myusBox2:{
    
    paddingLeft:'5%',
    paddingRight:"5%",
    paddingTop:'10%',
    paddingBottom:'10%',
justifyContent:'center',
alignItems:'center',
    
    backgroundColor: 'rgb(59, 0, 3)',
    margin: '20%',
    
  }
})