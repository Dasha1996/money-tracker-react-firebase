import { useEffect, useState } from 'react';
import { projectAuth } from "../firebase/config.js";
//using context object so we can later dispatch an action dispatch
import { useAuthContext } from './useAuthContext.js';

export const useLogin = () => {
    const [ error, setError ] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async(email, password) => {
        setError(null);
        setIsPending(true);
        const res = await projectAuth.signInWithEmailAndPassword(email, password);
    try {
        if(!isCancelled) {
            dispatch({ type: 'LOGIN', payload: res.user});
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
        return() => setIsCancelled(true);
    })
   
    return {login, error, isPending}
    
}