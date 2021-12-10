import React, { useState, useEffect } from "react"
import { fetchMyPosts } from "./api"

const MyPosts = (props) => {

    let userToken = props.userToken

    let [ myPosts, setMyPosts ] = useState([])
    let [ viewComments, setViewComments ] = useState(false)

    useEffect(() => {
        async function getMyPosts(userToken) {
            try {
                const data = await fetchMyPosts(userToken)
                console.log("myPosts data:", data.data.posts)
                setMyPosts(data.data.posts)
            } catch (error) {
                console.error("Something went wrong fetching my posts!", error)
            }
        }
        getMyPosts(userToken)
    }, [])

    return (!userToken || !myPosts ?
        <div id="myPosts" className="mainContent">You must be logged in or no data has been found!</div>
        :
        <div id="myPosts" className="mainContent">
            {myPosts ? myPosts.map((el, index) => (
                <div key={index} className="myPostElement">
                    <h2 className="myPostTitle">{el.title}</h2>
                    <div className="myPostDescription">{el.description}</div>
                    <h3 className="myPostPrice">{el.price} - {el.willDeliver ? "Will Deliver" : "Will NOT Deliver"}</h3>
                    <div id="myPostsOptions">
                        {/* <button id="myPostsEdit">Edit Post</button> */}
                        <button id="myPostsViewComments" onClick={() => viewComments ? setViewComments(false) : setViewComments(true)}>View Comments</button>
                        <button id="myPostsDeletePost">Delete Post</button>
                    </div>
                    {viewComments ? el.messages.map((elem, i) => (
                        <div key={index+"a"}>
                            <div key={index+"b"}>{elem.fromUser.username}</div>
                            <div key={index+"c"}>{elem.content}</div>
                        </div>
                    )) : undefined}
                </div>
            )) : "No Data Found!"}
        </div>
    )
}

export default MyPosts