const Registration = (props) => {

    let usernameString = props.usernameString
    let setUsernameString = props.setUsernameString
    let passwordString = props.passwordString
    let setPasswordString = props.setPasswordString
    let verifyPasswordString = props.verifyPasswordString
    let setVerifyPasswordString = props.setVerifyPasswordString

return (
    <div id="registration" className="mainContent">
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
    </div>
)
}

export default Registration