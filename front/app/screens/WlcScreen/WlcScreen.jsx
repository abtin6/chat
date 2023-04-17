import { ScrollView, StyleSheet, View,Image} from 'react-native';

import FormHeader from './components/Form/FormHeader';
import FormSelectorBtn from './components/Form/FormSelectorBtn';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

export default function WlcScreen({ navigation }) {
 
  return (
    
  <View style={styles.container}>
    <View style={{height:100,}}>
    
        
      <FormHeader SubHeader='youtube task maneger' 
                  leftHedare='wellcom '
                  rightheader='back'
      />
                
    </View>
    <View style={{flexDirection:'row',paddingHorizontal:20,marginBottom:20}}>
       <FormSelectorBtn title='Login' backgroundColor='#1b1b33'/>
       <FormSelectorBtn title='Sign Up' backgroundColor='rgba(27,27,51,0.4)'/>
    </View>

    <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>

      {/* {mycomp ? <SignupForm/>:<LoginForm navigation={navigation}/>} */}

        <LoginForm navigation={navigation}/>
        <SignupForm/>
      
    </ScrollView>
    
    
    
  </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:120,

  },


});

