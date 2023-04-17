import { StyleSheet, Text, TextInput, View } from 'react-native'
// import React from 'react'

const FormInput = (props) => {
  const {title}=props
  return (
    <>
    <Text>{title}</Text>
    <TextInput style={styles.inp} {...props} />
    </>
  )
}

export default FormInput

const styles = StyleSheet.create({
    inp:{
        borderWidth:1,
        borderColor:'#1b1b33',
        height:35,
        borderRadius:8,
        fontSize:16,
        paddingLeft:10,
        marginBottom:20,
      }
})