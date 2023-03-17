import { useReducer, useEffect, useState } from 'react';

import { projectFirestore, timestamp } from '../firebase/config'; 

let initialState = {
    document: null,
    isPending: false,
    error: null,
    successProperty: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return {isPending: true, document: null, success: false, error:null}
        case 'ADDED_DOCUMENT':
            return {isPending: false, document: action.payload, success: true, error: null}
        case 'DELETED_DOCUMENT':
            return {isPending: false, docuemnt: null, success: true, error: null}
        case 'ERROR':
            return {isPending: false, document: null, success: false, error: action.payload}
        default:
            return state
    }
}

export function useFirestore(collection) {
    //custom state object that represents the response
    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    //not to update state when component unmounts
    const[isCancelled, setIsCancelled] = useState(false);
    //reference to the collection for adding or deleting a document later
    const ref = projectFirestore.collection(collection);
    //only dispatch if not cancelled 
    const dispatchIfNotCancelled = (action) => {
        if(!isCancelled) {
            dispatch(action)
        }
    }
    //add a document
    //doc -name and number later
    const addDocument = async (doc) => {
        dispatch({type: 'IS_PENDING'});

        try {
            //timestamp
            const createdAt = timestamp.fromDate(new Date());
            //..doc - name and amount
            const addedDocument = await ref.add({...doc, createdAt});
            //perform dispatch not when the component unmounted
            dispatchIfNotCancelled({type: 'ADDED_DOCUMENT', payload: addedDocument })
        }
        catch(err) {
           dispatchIfNotCancelled({type: 'ERROR', payload: err.message});
    
        }
    }

    //delete the document 
    const deleteDocument = async (id) => {
        dispatch({ type: 'IS_PENDING'})

        try {
            const deletedDocument = await ref.doc(id).delete();
            dispatchIfNotCancelled({type: 'DELETED_DOCUMENT' })
        } catch(err) {
            dispatchIfNotCancelled({type: 'ERROR', payload: 'could not delete'});
        }
    }
    useEffect(() => {
        setIsCancelled(false)
        return () => setIsCancelled(true)
    }, [])
     
    return { addDocument, deleteDocument, response}
  
}
