import React from "react"

const Posts = (props) => {

    let allPosts = props.allPosts

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
                </div>
            )) : "No Data Found!"}
        </div>
    )
}

export default Posts