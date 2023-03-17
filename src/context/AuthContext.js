import { createContext, useReducer, useEffect } from "react";
import { projectAuth } from "../firebase/config";

//first we create a context which will be available to the component tree
export const AuthContext = createContext();
//reducer function
//action is a js object that contain type and payload
export const  authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload }
        case 'LOGOUT':
            return {...state, user:null}
        case 'AUTH_IS_READY':
            return {...state, user: action.payload, authIsReady: true }
        case 'AUTH_IS_READY_TRUE':
            return  {...state, user: action.payload, authIsReadyTrue: true }
        case 'AUTH_IS_READY_FALSE': 
            return {...state, user: action.payload, authIsReadyTrue:false}
        default:
            return state;
    }
}

//custom auth context provider component
//children represent what we are going to wrap
export const AuthContextProvider = ({children}) => {
    //UseReducer - state for reducer, we use auth reducer function to update the state, when we want to update the state
    //second argument is initial state
    //dispatch is a function, it takes action and sends them to reducer
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false
    })


    console.log('Auth Context State', state)
    useEffect(() => {
        //whenever there is a change in auth status and when there is this function will be fired
        const unsub = projectAuth.onAuthStateChanged((user) => {
            dispatch ({type: 'AUTH_IS_READY', payload: user})
            return () => unsub();
        })

    }, [])

    return (
        //adding dispatch function so we can use it inside hooks directly to update state value
        <AuthContext.Provider value = {{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}