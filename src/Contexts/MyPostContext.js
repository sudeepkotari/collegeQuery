import { useState, useContext, createContext } from 'react'

const MyPostContext = createContext();
export const useMyPostContext = () => useContext(MyPostContext)

function MyPostContextProvider(props){
    
    const [myPosts, setMyPosts] = useState()

    function removePost(id){
        const newPosts = myPosts.filter(post => {
            return post.id !== id
        })
        setMyPosts(newPosts)
    }



    const value = { myPosts, removePost, setMyPosts }
    return(
        <MyPostContext.Provider value={value}>
            {props.children}
        </MyPostContext.Provider>
    )
}
export default MyPostContextProvider