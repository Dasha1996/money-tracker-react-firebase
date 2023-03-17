import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    //takes one argument, the context which it should look in the tree for, and returns the value that it finds for that context.
    //context is an object that contains object value (state and dispatch from AuthContext)
    const context = useContext(AuthContext);
    if(!context) {
        throw Error('useAuthContext must be inside an Authcontext provider')
    }

    return context
}