import { StyleSheet, Text, View,Image } from 'react-native';
import React,{useEffect,useState} from 'react';
import NsRoom from './components/NsRooms/NsRoom';
import UserInfo from './components/UserInfo';
import Menu from './components/Menu';

// import socket from './../../api/Socket'

export default function LobiScreen({ navigation }) {


  return (
  <View style={styles.container}>
      
        
     <View style={ styles.header}>
      <View>
            <Text>sing</Text>
            <Text>out</Text>
            
         </View>
         <View>
            <Text style={{fontWeight:'bold'}}>MafLine</Text>
         </View>

         <View>
            <Text>online:</Text>
            <Text>250</Text>
         </View>

       </View>

     <View style={styles.content}>

         <View style={styles.UserInfo}><UserInfo/></View>
        
         <View style={styles.Menu}><Menu/></View>

         {/* {setNsRoom
                ?<View style={styles.Rooms }><Rooms  setNsRoom={setNsRoom} rooms1={setRooms} ns={setNs}/></View>
                :<Room navigation={navigation} nsRoom={setNsRoom}/>
         } */}
         <View style={styles.Rooms}><NsRoom navigation={navigation}/></View>
     </View>

  </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
     
    backgroundColor: 'black',
    
  },
 
  header:{
    flex: 1,
    flexDirection:'row',
    margin:'1%',
    // height: '10%',
    justifyContent:'space-between',
    alignItems:'center',
    
    backgroundColor: 'rgb(215,182,163)',
    borderRadius: 15,
    
  },
  content:{
    // height: '90%',
      flex:9,
    flexDirection: 'row',
  },
  contentBoxs:{
    
    
    margin: '1%',
    flexDirection: 'column',
   
    textAlign: 'left',
    color: 'aliceblue',
    borderRadius: 15,

  },
  UserInfo:{
   
    backgroundColor:"rgb(215,182,163)",
    flex:1,
    marginHorizontal:'1%'
    
  },
  Menu:{
   
    flex:1,
    backgroundColor:"rgb(215,182,163)"
  },
  Rooms:{
    flex:1,
    marginHorizontal:'1%',
    backgroundColor: 'rgb(215,182,163)',
    padding:15,
    
  },
 
  

});





