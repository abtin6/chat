import { StyleSheet, Text, View ,Dimensions} from 'react-native'
// import React from 'react'

const FormContainer = ({children}) => {
  return (
    <View style={{
    paddingHorizontal:20,
    width:Dimensions.get('window').width,
    // backgroundColor:'yellow'
  }}
    
>
{children}
</View>
  )
}

export default FormContainer

const styles = StyleSheet.create({})