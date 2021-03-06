import React, { useState } from "react"
import { registerUser } from "./api"

const Registration = (props) => {

    let setUserToken = props.setUserToken

    let [ messageToUser, setMessageToUser ] = useState("Welcome! Please register your username and password below.")
    let [ usernameString, setUsernameString ] = useState("")
    let [ passwordString, setPasswordString ] = useState("")
    let [ verifyPasswordString, setVerifyPasswordString ] = useState("")

return (
    <div id="registration" className="mainContent">
        <h2 id="registrationMessageToUser">{messageToUser}</h2>
        <form id="registrationForm" onSubmit={async (event) => {
            event.preventDefault()
            if(passwordString == verifyPasswordString && passwordString.length >= 7) {
                console.log(usernameString)
                console.log(passwordString)
                console.log(verifyPasswordString)
                let confirmation = await registerUser(usernameString, passwordString)
                console.log("confirmation:", confirmation)
                if (confirmation.success) {
                    setUserToken(confirmation.data.token)
                    setMessageToUser(confirmation.data.message)
                } else {
                    setMessageToUser(confirmation.data.message)
                }
                setUsernameString("")
                setPasswordString("")
                setVerifyPasswordString("")
            } else if (passwordString == verifyPasswordString && passwordString.length < 7) {
                setMessageToUser("Your password must be at least 7 characters.")
            } else if (passwordString != verifyPasswordString) {
                setMessageToUser("Your password and verification must match.")
            }
            }}>
            <label htmlFor="usernameRegister">Create Username:</label>
            <input 
                id="usernameRegister" 
                type="text"
                placeholder="create username..."
                value={usernameString}
                onChange={(event) => setUsernameString(event.target.value)}
                required></input>
            <label htmlFor="passwordRegister">Create Password: (must be a minimum of 7 characters)</label>
            <input
                id="passwordRegister"
                type="password"
                placeholder="create password..."
                value={passwordString}
                onChange={(event) => setPasswordString(event.target.value)}
                required></input>
            <label htmlFor="verifyPassword">Verify Password: (must match above)</label>
            <input
                id="verifyPassword"
                type="password"
                placeholder="verify password..."
                value={verifyPasswordString}
                onChange={(event) => setVerifyPasswordString(event.target.value)}
                required></input>
            <button type="submit">Submit</button>
        </form>
    </div>
)
}

export default Registration