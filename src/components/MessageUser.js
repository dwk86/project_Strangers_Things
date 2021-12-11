import React, { useState } from "react"
import { sendMessageToUser } from "./api"

const MessageUser = (props) => {

    let userToken = props.userToken
    let targetPostId = props.targetPostId

    let [ messageUserContent, setMessageUserContent ] = useState("")
    let [ systemMessageToUser, setSystemMessageToUser ] = useState("Type your message to the user below.")

    return (!userToken ?
        <div id="messageUser" className="mainContent">You must be logged in first!</div>
        :
        <div id="messageUser" className="mainContent">
            <h2 id="messageUserMessageToUser">{systemMessageToUser}</h2>
            <form id="messageUserForm" onSubmit={async (event) => {
                event.preventDefault()
                console.log("postId:", targetPostId)
                console.log("userToken:", userToken)
                console.log("messageContent:", messageUserContent)
                try {
                    let data = await sendMessageToUser(targetPostId, userToken, messageUserContent)
                    console.log("message data:", data)
                    if (data.success) {
                        setSystemMessageToUser("Your message has been sent.")
                        setMessageUserContent("")
                    } else {
                        setSystemMessageToUser("Something went wrong sending your message.")
                    }
                } catch (error) {
                    console.error("Something went wrong sending a message!", error)
                }
            }}>
                <label htmlFor="messageUserContent">Message:</label>
                <input
                    id="messageUserContent"
                    type="text"
                    placeholder="enter message here..."
                    value={messageUserContent}
                    onChange={(event) => setMessageUserContent(event.target.value)}
                    required></input>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default MessageUser