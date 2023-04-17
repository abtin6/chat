import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import Profile from '../screens/LobiScreen/components/userInfo/Profile'
import Friends from '../screens/LobiScreen/components/userInfo/Friends'
const TopTab=createMaterialTopTabNavigator()

const UserInfoTab = () => {
    return ( 
        // <Screen>
          <TopTab.Navigator>
            <TopTab.Screen name='Profile' component={Profile}/>
            <TopTab.Screen name='Friends' component={Friends}/>
          </TopTab.Navigator>
        // </Screen>
     );
}
 
export default UserInfoTab;