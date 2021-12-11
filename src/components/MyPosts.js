import React, { useState, useEffect } from "react"
import { fetchMyPosts, deleteMyPost } from "./api"

const MyPosts = (props) => {

    let userToken = props.userToken

    let [ myPosts, setMyPosts ] = useState([])
    let [ myMessages, setMyMessages ] = useState([])
    let [ viewComments, setViewComments ] = useState(false)
    let [ viewPostCommentsId, setViewPostCommentsId ] = useState("")

    useEffect(() => {
        async function getMyPosts(userToken) {
            try {
                const data = await fetchMyPosts(userToken)
                console.log("myPosts data:", data.data.posts)
                setMyPosts(data.data.posts)
                setMyMessages(data.data.messages)
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
            <div id="postArea">
                <h2>All Posts:</h2>
                {myPosts ? myPosts.map((el, index) => (
                    el.active ?
                        <div key={index} className="myPostElement">
                            <h2 className="myPostTitle">{el.title}</h2>
                            <div className="myPostDescription">{el.description}</div>
                            <h3 className="myPostPrice">{el.price} - {el.willDeliver ? "Will Deliver" : "Will NOT Deliver"}</h3>
                            <div className="myPostsOptions">
                                {/* <button id="myPostsEdit">Edit Post</button> */}
                                <button className="myPostsViewComments" onClick={() => {
                                    if (viewComments) {
                                        setViewComments(false)
                                    } else {
                                        setViewComments(true)
                                    }
                                    setViewPostCommentsId(el._id)
                                }}>View Messages</button>
                                <button className="myPostsDeletePost" onClick={() => {
                                    async function runDelete(postId, userToken) {
                                        try {
                                            const result = await deleteMyPost(postId, userToken)
                                        } catch (error) {
                                            console.error("Something went wrong deleting my post!", error)
                                        }
                                    }
                                    runDelete(el._id, userToken)
                                }}>Delete Post</button>
                            </div>
                            {viewPostCommentsId == el._id ?
                                viewComments ? el.messages.map((elem, i) => (
                                    <div key={i+"a"}>
                                        <div key={i+"b"}>{elem.fromUser.username}</div>
                                        <div key={i+"c"}>{elem.content}</div>
                                    </div>
                                )) : undefined
                            : undefined }
                        </div>
                        : undefined
                )) : "No Data Found!"}
            </div>
            <div id="allMessagesArea">
                <h2>All Messages:</h2>
                {myMessages ? myMessages.map((element, index) => (
                    <div key={index} className="myMessageElement">
                        <h3 className="myMessageFromUser">Message from: {element.fromUser.username}</h3>
                        <div className="myMessagePostTitle">message posted on: {element.post.title}</div>
                        <div className="myMessageContent">{element.content}</div>
                    </div>
                )) : "No Messages Found!" }
            </div>
        </div>
    )
}

export default MyPosts