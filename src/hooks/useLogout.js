import { useState, useEffect } from 'react';
import { projectAuth } from "../firebase/config.js";
//using context object so we can later dispatch an action dispatch
import { useAuthContext } from './useAuthContext.js';

export const useLogout = () => {
    const [ error, setError ] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();
    const [isCancelled, setIsCancelled] = useState(false)

    const logout = async() => {
        setError(null);
        setIsPending(true);
    //sign the user out
    try {
        await projectAuth.signOut();
      //update state 
      if(!isCancelled) {
        //dispatch logout action
        dispatch({ type: 'LOGOUT'});
        setIsPending(false);
        setError(null)
      }
        
    }
    catch(err) {
        if(!isCancelled) {
            console.log(err.message);
            setError(err.message);
            setIsPending(false)
        }  
    }
    }
    useEffect(() => {
        setIsCancelled(false);
        return () => setIsCancelled(true)
    }, [])
   
    return {logout, error, isPending}
    
}