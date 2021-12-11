import React, { useEffect } from "react"
import { fetchAllPosts } from "./api"

const Posts = (props) => {

    let allPosts = props.allPosts
    let setAllPosts = props.setAllPosts
    let userToken = props.userToken

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

    return ( !allPosts ?
        <div id="allPosts" className="mainContent"></div>
        :
        <div id="allPosts" className="mainContent">
            {allPosts ? allPosts.map((el, index) => (
                <div key={index} className="postElement">
                    <h2 className="postTitle">{el.title}</h2>
                    <h5 className="postAuthor">By: {el.author.username} - Location: {el.location}</h5>
                    <div className="postDescription">{el.description}</div>
                    <h3 className="postPrice">{el.price} - {el.willDeliver ? "Will Deliver" : "Will NOT Deliver"}</h3>
                    {userToken && userToken != el.author._id ? 
                        <button className="postMessageButton">Message {el.author.username}</button>
                    : undefined }
                </div>
            )) : "No Data Found!"}
        </div>
    )
}

export default Posts