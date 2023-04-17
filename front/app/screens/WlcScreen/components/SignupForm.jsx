import React, { useState } from 'react';
import { StyleSheet, Text} from 'react-native'
// import {useDispatch} from 'react-redux'

import FormContainer from './Form/FormContainer';
import FormInput from './Form/FormInput';
import FormSubmitBtn from './Form/FormSubmitBtn';
import Client from '../../../api/Client';
// import { getComp } from '../../../Redux/Actions';



const SignupForm = () => {
  // const dispatch=useDispatch()
  
  const [userInfo,setUserInfo]=useState({fullname:'',email:'',password:'',confirmPassword:''})
  const {fullname,email,password,confirmPassword}=userInfo;
  const [error,setError]=useState('')
 

  const handleOnChangeText=(value,fieldName)=>{
    setUserInfo({...userInfo,[fieldName]:value})
  }

const signUp=async()=>{
  try {
     const res =await Client.post('/create-user',{...userInfo})
     console.log(res.data)
     setError(res.data.message)
    //  dispatch(getComp())
     

  } catch (error) {
    console.log('nashodeee',error.message)
  }
 
   
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
                  title='Fullname' 
                  value={fullname}  
                  onChangeText={value=>handleOnChangeText(value,'fullname')} 
              />
              <FormInput 
                  title='Password' 
                  value={password} 
                  onChangeText={value=>handleOnChangeText(value,'password')} 
                  autoCapitalize='none' 
                  secureTextEntry
              /> 
              <FormInput 
                  title='confirm Password' 
                  value={confirmPassword} 
                  onChangeText={value=>handleOnChangeText(value,'confirmPassword')} 
                  autoCapitalize='none' 
                  secureTextEntry
              /> 
              
            
              <FormSubmitBtn 
                  title='Sign Up' 
                  onpress={signUp}
              />
        
           
   </FormContainer>
   <Text>{error}</Text>
  </>
  )
  
}

export default SignupForm

const styles = StyleSheet.create({})



//
//   const userInfo={
//     fullname:'',
//     email:'',
//     password:'',
//     confirmPassword:''
//   }

 // const validationSchema=Yap.object({
  //   fullname:Yap.string().trim().min(3,'invalid name').required('name is required'),
  //   email:Yap.string().email('inavlid email').required('email is required'),
  //   password:Yap.string().trim().min(8,'8 pass').required('pass is required'),
  //   confirmPassword:Yap.string().equals([Yap.ref('password'),null],('pass mach'))
  // })


// import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';


// const SignupSchema = Yup.object().shape({
//   fullname: Yup.string()
//     .min(2, 'Too Short!')
//     .max(50, 'Too Long!')
//     .required('Required'),
 
//   email: Yup.string().email('Invalid email').required('Required'),
// });
