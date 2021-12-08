import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { fetchAllPosts } from "./components/api";
import Posts from "./components/Posts";

const Main = () => {

    let [ allPosts, setAllPosts ] = useState([])

    useEffect(() => {
        async function getAllPosts() {
            try {
                const data = await fetchAllPosts()
                console.log("data:", data)
                setAllPosts(data)
            }
            catch (error) {
                console.error("Something went wrong fetching all posts!", error)
            }
        }
        getAllPosts()
    }, [])

    console.log("allPosts:", allPosts)

    return (
        <div id="container">
            <header>
                <h1>Stranger's Things</h1>
                <div>
                    <button>Log In</button>
                    <button>Register</button>
                </div>
            </header>
            <div id="sideMenu">
                <h3>Side Menu</h3>
                <button>All Posts</button>
            </div>
            <Posts allPosts={allPosts} />
            <footer>Created by Dan Kempert</footer>
        </div>
    )
}

const app = document.getElementById("app")
ReactDOM.render(<Main />, app)