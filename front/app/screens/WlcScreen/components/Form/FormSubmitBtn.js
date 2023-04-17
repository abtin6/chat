import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React from 'react'

const FormSubmitBtn = ({title,onpress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onpress}>
        <Text style={{color:'white'}}>{title}</Text>
    </TouchableOpacity>
  )
}

export default FormSubmitBtn

const styles = StyleSheet.create({
    container:{
        height:45,
        backgroundColor:'rgba(27,27,51,0.4)',
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center'
    }
})