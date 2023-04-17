import React, { useState } from 'react';
import {useDispatch} from 'react-redux'

import FormContainer from './Form/FormContainer';
import FormInput from './Form/FormInput';
import FormSubmitBtn from './Form/FormSubmitBtn';
import client from '../../../api/Client';
import { userAdded } from '../../../../Redux-toolkit/reducers/UserSlice';
import socket from '../../../api/Socket';


const LoginForm = ({navigation}) => {

  const dispatch=useDispatch()
  
  const [userInfo,setUserInfo]=useState({email:'',password:''})
  const {email,password}=userInfo;
 

  const handleOnChangeText=(value,fieldName)=>{
    setUserInfo({...userInfo,[fieldName]:value})
  }

const handleLogin=async()=>{
  
     const res =await client.post('/sign-in',{...userInfo})
     console.log(res.data)
     
     const myname=res.data.myname
     console.log(myname)
    socket.emit('nameSpaceLoad')
    dispatch(userAdded(myname))
     navigation.navigate('LOBI')
    
}
 
  return (
    <>
    <FormContainer>
              <FormInput 
                  title='Email' 
                  value={email} 
                  onChangeText={value=>handleOnChangeText(value,'email')} 
                  autoCapitalize='none'
              />
              <FormInput 
                  title='Password' 
                  value={password} 
                  onChangeText={value=>handleOnChangeText(value,'password')} 
                  autoCapitalize='none' 
                  secureTextEntry
              /> 
              <FormSubmitBtn 
                  title='Login' 
                  onpress={handleLogin}
              />
              
    </FormContainer>
  
     
    </>
  )
}

export default LoginForm

