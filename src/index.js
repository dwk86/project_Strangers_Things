import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { fetchAllPosts } from "./components/api";
import Posts from "./components/Posts";
import Registration from "./components/Registration"
import LogIn from "./components/LogIn"
import CreatePost from "./components/CreatePost";

// Main function to control to SPA
const Main = () => {

    let [ allPosts, setAllPosts ] = useState([])
    let [ userToken, setUserToken ] = useState("")
    
    console.log("userToken:", userToken)

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

    return (
        <BrowserRouter>
            <div id="container">
                <header>
                    <h1>Stranger's Things</h1>
                    <div>
                        {userToken ? <button onClick={() => {setUserToken("")}}>Log Out</button> : <button><Link to="/login">Log In</Link></button>}
                        <button><Link to="/registration">Register</Link></button>
                    </div>
                </header>
                <div id="sideMenu">
                    <h3>Side Menu</h3>
                    <button><Link to="/allposts">View All Posts</Link></button>
                    {userToken ? <button><Link to="/createpost">Create New Post</Link></button> : undefined }
                </div>
                <Route path="/login">
                    <LogIn setUserToken={setUserToken} />
                </Route>
                <Route path="/registration">
                    <Registration setUserToken={setUserToken} />
                </Route>
                <Route path="/createpost">
                    <CreatePost userToken={userToken}/>
                </Route>
                <Route path="/allposts">
                    <Posts allPosts={allPosts} />
                </Route>

                <Route exact path="/">
                    <Posts allPosts={allPosts} />
                </Route>
                <footer>Created by Dan Kempert</footer>
            </div>
        </BrowserRouter>
    )
}

const app = document.getElementById("app")
ReactDOM.render(<Main />, app)