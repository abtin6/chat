import {createSlice,nanoid} from "@reduxjs/toolkit"

const initialState=[
    {
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

const blogsSlice=createSlice({
    name:'blogs',
    initialState:initialState,
    reducers:{
        blogAdded:{                                      //(state,action)=>{state.push(action.payload)}
                reducer(state,action){state.push(action.payload)},
                prepare(title,content){return{payload:{id:nanoid(),title,content}}}
        } ,
        blogUpdate:(state,action)=>{
             const {id,title,content}=action.payload
             const existBlog=state.find(e=>e.id===id)
             if(existBlog){
                existBlog.title=title,
                existBlog.content=content
             }
        }                  
    }
})
export const {blogAdded,blogUpdate}=blogsSlice.actions

export default blogsSlice.reducer