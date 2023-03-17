import { useState, useEffect } from 'react';
import { projectAuth } from "../firebase/config.js"
import { useAuthContext } from './useAuthContext.js';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(null);
    const [isCancelled, setIsCancelled] = useState(false)
    const { dispatch } = useAuthContext();

    const signup = async (email, password, displayName) => {
        //when we submit again after rectifying the error we want to reset the error
        setError(null);
        setIsPending(true); 
        try {
            //signup, reaches up to firebase and signs user up with email and password and sends response
            const res = await projectAuth.createUserWithEmailAndPassword(email,password);
            if (!res) {
               throw new Error('Could not complete signup')
            }
            //create a user first of all and then add displayName to the profile
             await res.user.updateProfile({ displayName: displayName});
             dispatch ({type : 'LOGIN', payload: res.user})

             //dispatch login function, update user property to be action payload
             if(!isCancelled) {
                setIsPending(false);
                setError(null);
             }
        }
        catch(err) {
            if(!isCancelled) {
                console.log(err.message);
                setError(err.message);
                setIsPending(false);
            }
        }
    }
    useEffect(() => {
        setIsCancelled(false);
        return () => {
            setIsCancelled(true);
        }
    }, [])
    return {error, isPending, signup}
} 