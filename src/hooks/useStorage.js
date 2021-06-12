import { useState, useEffect } from "react";
import { cloudStorage } from '../firebase/config'

const useStorage = (file, userId) => {
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(null)
    const [url, setUrl] = useState(null)

    useEffect(()=>{
        const storageRef = cloudStorage.ref(userId);
        storageRef.put(file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes ) * 100;
            setProgress(percentage)
        },(error)=> {
            setError(error)
        },async ()=>{
            const url = await  storageRef.getDownloadURL();
            setUrl(url)
        })
    },[file,userId])
    
    return { progress, url , error}
}

export default useStorage;