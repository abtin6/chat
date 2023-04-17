import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

const FormHeader = ({leftHedare,rightheader,SubHeader}) => {
  return (
    <>
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
        <Text >{leftHedare}</Text>
        <Text>{rightheader}</Text>
      </View>
      <Text style={{textAlign:'center'}}>{SubHeader}</Text>
    </>
  )
}

export default FormHeader

const styles = StyleSheet.create({})