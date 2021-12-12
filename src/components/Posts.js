import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { fetchAllPosts } from "./api"

const Posts = (props) => {

    let allPosts = props.allPosts
    let setAllPosts = props.setAllPosts
    let userToken = props.userToken
    let usernameId = props.usernameId
    let setTargetPostId = props.setTargetPostId

    const [ searchTerm, setSearchTerm ] = useState("")

    useEffect(() => {
        async function getAllPosts() {
            try {
                const data = await fetchAllPosts()
                console.log("data:", data)
                setAllPosts(data.data.posts)
            }
            catch (error) {
                console.error("Something went wrong fetching all posts!", error)
            }
        }
        getAllPosts()
    }, [])

    function postMatches (post, text) {
        if (post.title.includes(text)) {
            return true
        } else {
            return false
        }
    }

    const filteredPosts = allPosts.filter(post => postMatches(post, searchTerm))
    const postsToDisplay = searchTerm.length ? filteredPosts : allPosts
    console.log("postsToDisplay:", postsToDisplay)

    return ( !allPosts ?
        <div id="allPosts" className="mainContent"></div>
        :
        <div id="allPosts" className="mainContent">
            <label htmlFor="searchPosts">Search:</label>
            <input 
                id="searchPosts" 
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}>
            </input>
            {allPosts ? postsToDisplay.map((el, index) => (
                <div key={index} className="postElement">
                    <h2 className="postTitle">{el.title}</h2>
                    <h5 className="postAuthor">By: {el.author.username} - Location: {el.location}</h5>
                    <div className="postDescription">{el.description}</div>
                    <h3 className="postPrice">{el.price} - {el.willDeliver ? "Will Deliver" : "Will NOT Deliver"}</h3>
                    {userToken && usernameId != el.author.username ? 
                        <Link to="/messageuser">
                            <button className="postMessageButton" onClick={() => setTargetPostId(el._id)}>
                            Message {el.author.username}
                            </button>
                        </Link>
                    : undefined }
                </div>
            )) : "No Data Found!"}
        </div>
    )
}

export default Posts