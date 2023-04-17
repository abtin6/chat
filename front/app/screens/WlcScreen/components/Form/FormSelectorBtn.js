import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
import { TouchableWithoutFeedback } from 'react-native-web';

const FormSelectorBtn = ({title,backgroundColor}) => {
  return (
    <>
       <TouchableWithoutFeedback>
        <View style={{height:45,width:'50%',backgroundColor,justifyContent:'center',alignItems:'center'}}>

          <Text style={{color:'white'}}>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
    </>
  )
}

export default FormSelectorBtn

const styles = StyleSheet.create({})