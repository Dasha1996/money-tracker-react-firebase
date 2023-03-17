import { useEffect, useState, useRef} from 'react';

import { projectFirestore } from '../firebase/config';

export const useCollection = (collection, _query, _orderBy) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    //useRef to avoid infinite loop in useEffect
    //_query ais an array that react sees as different on every function call
    const query = useRef(_query).current;
    const orderBy = useRef(_orderBy).current

    useEffect(() => {
        let ref = projectFirestore.collection(collection);
        if(query) {
            ref = ref.where(...query);
        }

        if(orderBy) {
            ref = ref.orderBy(...orderBy);
        }

        const unsub = ref.onSnapshot((snapshot) => {
            let results = [];
            snapshot.docs.forEach(doc => {
                //name, amount, uid is ...doc.data
                results.push({...doc.data(), id: doc.id})
            })
            setDocuments(results);
            setError(null)
        }, (error) => {
            console.log(error);
            setError('could not fetch the data');
        }
    )
    //when components unmounts
    return () => unsub();
}, 
    [collection, query])

    return { documents, error, orderBy}
}