import {createSlice,nanoid} from "@reduxjs/toolkit"



const UserSlice=createSlice({
    name:'user',
    initialState:{value:''},
    reducers:{
        userAdded:(state,action)=>{
            state.value=action.payload
        }    
    }
})
export const {userAdded}=UserSlice.actions

export default UserSlice.reducer