import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Posts from "./components/Posts";
import Registration from "./components/Registration"
import LogIn from "./components/LogIn"
import CreatePost from "./components/CreatePost";
import MyPosts from "./components/MyPosts";

// Main function to control to SPA
const Main = () => {

    let [ allPosts, setAllPosts ] = useState([])
    let [ userToken, setUserToken ] = useState("")

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
                    {userToken ? <button><Link to="/myposts">View My Posts</Link></button> : undefined}
                </div>
                <Route path="/login">
                    <LogIn setUserToken={setUserToken} />
                </Route>
                <Route path="/registration">
                    <Registration setUserToken={setUserToken} />
                </Route>
                <Route path="/createpost">
                    <CreatePost allPosts={allPosts} setAllPosts={setAllPosts} userToken={userToken}/>
                </Route>
                <Route path="/myposts">
                    <MyPosts userToken={userToken}/>
                </Route>
                <Route path="/allposts">
                    <Posts setAllPosts={setAllPosts} allPosts={allPosts} />
                </Route>

                <Route exact path="/">
                    <Posts setAllPosts={setAllPosts} allPosts={allPosts} />
                </Route>
                <footer>Created by Dan Kempert</footer>
            </div>
        </BrowserRouter>
    )
}

const app = document.getElementById("app")
ReactDOM.render(<Main />, app)