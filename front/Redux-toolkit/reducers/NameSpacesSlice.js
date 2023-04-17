import {createSlice,nanoid} from "@reduxjs/toolkit"


const initialState2=[
    {
        // nameSpace:'public',
        id:nanoid(),
        // date:new Date().toISOString(),
        title:'post 1',
        content:'mohtavae avalin post maaa'
    },
    {
        id:nanoid(),
        // date:new Date().toISOString(),
        title:'post 2',
        content:'mohtavae dovomin post maaa'
    },
]
const namespaceSlice=createSlice({
    name:'namespace',
    initialState:[],
    reducers:{
          
                                   
           namespaceAdded:(state,action)=>{
                const {namespace,endpoint}=action.payload
                let newNS={
                    namespace,
                    endpoint,
                    rooms:[]
                }
                state.push(newNS)
               
            },
            AddRooms:(state,action)  =>{
                const {endpoint,name,title,history,userList,showPlay}=action.payload
                const existBlog=state.find(e=>e.endpoint===endpoint)
                if(existBlog){
                    const exist=existBlog.rooms.find(e=>e.name===name)
                    if(!exist){
                       let newRoom={
                        name,title,history,userList,showPlay
                        }
                       existBlog.rooms.push(newRoom)
                    }
                }
            }  
       
               
    }
})
export const {namespaceAdded,AddRooms}=namespaceSlice.actions

export default namespaceSlice.reducer