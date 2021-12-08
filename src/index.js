import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { fetchAllPosts } from "./components/api";
import Posts from "./components/Posts";
import Registration from "./components/Registration"

const Main = () => {

    let [ allPosts, setAllPosts ] = useState([])
    let [ usernameString, setUsernameString ] = useState("")
    let [ passwordString, setPasswordString ] = useState("")
    let [ verifyPasswordString, setVerifyPasswordString ] = useState("")
    

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
            {/* <div id="registration" className="mainContent">
                <form id="register" onSubmit={async (event) => {
                    event.preventDefault()
                    if(passwordString == verifyPasswordString) {
                        console.log(usernameString)
                        console.log(passwordString)
                        console.log(verifyPasswordString)
                        setUsernameString("")
                        setPasswordString("")
                        setVerifyPasswordString("")
                    } else {
                        
                    }
                }}>
                    <label htmlFor="username">Create Username:</label>
                    <input 
                        id="username" 
                        type="text"
                        placeholder="create username..."
                        value={usernameString}
                        onChange={(event) => setUsernameString(event.target.value)}></input>
                    <label>Create Password: (must be a minimum of 7 characters)</label>
                    <input
                        id="password"
                        type="text"
                        placeholder="create password..."
                        value={passwordString}
                        onChange={(event) => setPasswordString(event.target.value)}></input>
                    <label>Verify Password: (must match above)</label>
                    <input
                        id="verifyPassword"
                        type="text"
                        placeholder="verify password..."
                        value={verifyPasswordString}
                        onChange={(event) => setVerifyPasswordString(event.target.value)}></input>
                    <button type="submit">Submit</button>
                </form>
            </div> */}
            <Registration usernameString={usernameString} setUsernameString={setUsernameString} passwordString={passwordString} setPasswordString={setPasswordString} verifyPasswordString={verifyPasswordString} setVerifyPasswordString={setVerifyPasswordString} />
            {/* <Posts allPosts={allPosts} /> */}
            <footer>Created by Dan Kempert</footer>
        </div>
    )
}

const app = document.getElementById("app")
ReactDOM.render(<Main />, app)