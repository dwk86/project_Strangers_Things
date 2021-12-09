import React, { useState } from "react"

const CreatePost = (props) => {
    
    let userToken = props.userToken

    let [ newPostTitle, setNewPostTitle ] = useState("")
    let [ newPostDescription, setNewPostDescription ] = useState("")
    let [ newPostPrice, setNewPostPrice ] = useState("")
    let [ newPostLocation, setNewPostLocation ] = useState("")
    let [ newPostDeliver, setNewPostDeliver ] = useState(false)

    return (!userToken ?
        <div id="createPost" className="mainContent">You must log in first!</div>
        :
        <div id="createPost" className="mainContent">
            <form id="createPostForm" onSubmit={async (event) => {
                event.preventDefault()
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
                <label htmlFor="newPostDeliver">I will deliver:</label>
                <input
                    id="newPostDeliver"
                    type="checkbox"
                    onClick={() => newPostDeliver ? setNewPostDeliver(false) : setNewPostDeliver(true)}></input>
            </form>
        </div>
    )
}

export default CreatePost