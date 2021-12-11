import React, { useState } from "react"
import { isLoggedIn, logInUser } from "./api"

const LogIn = (props) => {

    let setUserToken = props.setUserToken
    let setUsernameId = props.setUsernameId

    let [ user, setUser ] = useState("")
    let [ pass, setPass ] = useState("")
    let [ messageToUser, setMessageToUser ] = useState("Please enter your username and password to log in.")

    return (
        <div id="logIn" className="mainContent">
            <h2 id="logInMessageToUser">{messageToUser}</h2>
            <form id="logInForm" onSubmit={async (event) => {
                event.preventDefault()
                console.log(user)
                console.log(pass)
                let confirmation = await logInUser(user, pass)
                console.log("confirmation", confirmation)
                if (confirmation.success) {
                    setUserToken(confirmation.data.token)
                    let data = await isLoggedIn(confirmation.data.token)
                    setUsernameId(data.data.user.username)
                    setMessageToUser(confirmation.data.message)
                } else {
                    setMessageToUser(confirmation.error.message)
                }
                setUser("")
                setPass("")
            }}>
                <label htmlFor="usernameLogIn">Enter your username:</label>
                <input
                    id="usernameLogIn"
                    type="text"
                    placeholder="enter username..."
                    value={user}
                    onChange={(event) => setUser(event.target.value)}
                    required></input>
                <label htmlFor="passwordLogIn">Enter your password:</label>
                <input
                    id="passwordLogIn"
                    type="password"
                    placeholder="enter password..."
                    value={pass}
                    onChange={(event) => setPass(event.target.value)}
                    required></input>
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}

export default LogIn