import React, { useState } from "react"
import { createNewPost } from "./api"

const CreatePost = (props) => {
    
    let userToken = props.userToken
    let allPosts = props.allPosts
    let setAllPosts = props.setAllPosts

    let [ newPostTitle, setNewPostTitle ] = useState("")
    let [ newPostDescription, setNewPostDescription ] = useState("")
    let [ newPostPrice, setNewPostPrice ] = useState("")
    let [ newPostLocation, setNewPostLocation ] = useState("[On Request]")
    let [ newPostDeliver, setNewPostDeliver ] = useState(false)
    let [ messageToUser, setMessageToUser ] = useState("Please enter the information below to create a new post.")

    return (!userToken ?
        <div id="createPost" className="mainContent">You must log in first!</div>
        :
        <div id="createPost" className="mainContent">
            <h2 id="createPostMessageToUser">{messageToUser}</h2>
            <form id="createPostForm" onSubmit={async (event) => {
                event.preventDefault()
                console.log(newPostTitle)
                console.log(newPostDescription)
                console.log(newPostPrice)
                console.log(newPostLocation)
                console.log(newPostDeliver)
                let confirmation = await createNewPost(userToken, newPostTitle, newPostDescription, newPostPrice, newPostLocation, newPostDeliver)
                console.log("confirmation:", confirmation)
                if (confirmation.success) {
                    setMessageToUser("Your post has been created.")
                    setAllPosts([...allPosts, confirmation.data.post])
                } else {
                    setMessageToUser(confirmation.error.message)
                }
                setNewPostTitle("")
                setNewPostDescription("")
                setNewPostPrice("")
                setNewPostLocation("[On Request]")
                setNewPostDeliver(false)
            }}>
                <label htmlFor="newPostTitle">Title of new post:</label>
                <input
                    id="newPostTitle"
                    type="text"
                    placeholder="enter new post title..."
                    value={newPostTitle}
                    onChange={(event) => setNewPostTitle(event.target.value)}
                    required></input>
                <label htmlFor="newPostDescription">Description:</label>
                <input
                    id="newPostDescription"
                    type="text"
                    placeholder="enter a description for the new post..."
                    value={newPostDescription}
                    onChange={(event) => setNewPostDescription(event.target.value)}
                    required></input>
                <label htmlFor="newPostPrice">Price:</label>
                <input
                    id="newPostPrice"
                    type="text"
                    placeholder="enter a price..."
                    value={newPostPrice}
                    onChange={(event) => setNewPostPrice(event.target.value)}
                    required></input>
                <label htmlFor="newPostLocation">Location:</label>
                <input
                    id="newPostLocation"
                    type="text"
                    placeholder="(optional)"
                    value={newPostLocation}
                    onChange={(event) => setNewPostLocation(event.target.value)}></input>
                <div>
                    <label htmlFor="newPostDeliver">I will deliver:</label>
                    <input
                        id="newPostDeliver"
                        type="checkbox"
                        onChange={() => newPostDeliver ? setNewPostDeliver(false) : setNewPostDeliver(true)}
                        checked={newPostDeliver}></input>
                </div>
                <button type="submit">Submit Post</button>
            </form>
        </div>
    )
}

export default CreatePost