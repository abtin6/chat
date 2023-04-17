import {configureStore} from "@reduxjs/toolkit"
import blogsReducer from '../reducers/BlogSlice'
import userReducer from '../reducers/UserSlice'
import namespaceReducer from '../reducers/NameSpacesSlice'
export const store=configureStore({
    reducer:{
        blogs:blogsReducer,
        user:userReducer,
        namespace:namespaceReducer
    }
})
