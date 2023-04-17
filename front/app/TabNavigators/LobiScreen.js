import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import NsRoom from '../screens/LobiScreen/components/NsRooms/NsRoom';
import UserInfoTab from './UserInfoTab';
import Menu from '../screens/LobiScreen/components/Menu.jsx';
import React,{useState,useEffect} from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Image,TouchableOpacity } from 'react-native';


const Tab = createBottomTabNavigator();

// const MaterialCommunityIcons=(name,size,color)=>{
//     return(<Image />)
// }
const LobiScreen=()=>{
    const [load,setLoad]=useState(false)
    return(
    <Tab.Navigator screenOptions={({route})=>({
                       headerShown: false,
                       tabBarActiveTintColor:  "tomato",
                       tabBarInactiveTintColor:  "gray",
                       tabBarActiveBackgroundColor: "royalblue",
                       tabBarStyle: {fontSize:14},
                       tabBarLabelStyle: {
                         fontSize: 14
                       },
                       tabBarStyle: [
                         {
                           display: "flex"
                         },
                         null
                       ],
                  
                     
                       tabBarIcon:({focused,color,size})=>{
                           let iconName;
                           let tagName;
                           
                           if(route.name === 'NsRoom'){
                            
                            iconName=focused?"meeting-room"
                                            :"meeting-room"
                           }else if(route.name === 'UserInfo'){
                                tagName='MaterialCommunityIcons'
                               iconName=focused?"account-convert"
                                               :"account-convert-outline"
                           }else if(route.name === 'Menu'){
                            tagName='MaterialCommunityIcons'
                            iconName=focused?"store-settings"
                                            :"store-settings-outline"
                           }

                           return(
                            <MaterialCommunityIcons name={iconName} size={size} color={color} />
                           ) 
                       }
                   })}
                  //  screenOptions = {({ route }) =>({
                 
                  //  })}
                  //  tabBarOptions={{
                  //     activeTintColor:'tomato',
                  //     inactiveTintColor:'gray',
                  //     activeBackgroundColor:'royalblue',
                  //     labelStyle:{
                  //       //   fontFamily
                  //       fontSize:14
                  //     }
                  //  }}
    >
       <Tab.Screen name='nsRoom'
                   component={NsRoom} 
                   options={{tabBarLabel:'اناق ها' ,
                   

                            //  tabBarIcon:()=>(
                            //     <TouchableOpacity onPress={()=>{setLoad(!load)}}>
                            //         <Image source={{uri:'https://s2.uupload.ir/files/roomicon1-removebg-preview_uzom.png' }} style={{width:20,height:20}}/>
                            //     </TouchableOpacity>
                            //  )

                }}
        />                                                       
       <Tab.Screen name='UserInfo' component={UserInfoTab} options={{tabBarLabel:'پروفایل'}}/>
       <Tab.Screen name='Menu' component={Menu} options={{tabBarLabel:'منو',tabBarBadge:3}}/>
    </Tab.Navigator>
 
  )
 }
 export default LobiScreen