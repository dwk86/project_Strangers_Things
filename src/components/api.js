const BASE_URL = "https://strangers-things.herokuapp.com/api/2111-ftb-et-web-ft/"

export async function fetchAllPosts() {
    try {
        const response = await fetch(`${BASE_URL}posts`)
        const data = await response.json()
        return data
    } catch (error) {
        throw error
    }
}

export async function registerUser(registerUsername, registerPassword) {
    try {
        const response = await fetch(`${BASE_URL}users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: {
                    username: registerUsername,
                    password: registerPassword
                }
            })
        })
        const data = await response.json()
        return data
    } catch (error) {
        throw error
    }
}

export async function logInUser(logInUsername, logInPassword) {
    try {
        const response = await fetch(`${BASE_URL}users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: {
                    username: logInUsername,
                    password: logInPassword
                }
            })
        })
        const data = await response.json()
        return data
    } catch (error) {
        throw error
    }
}

export async function isLoggedIn(userToken) {
    try {
        const response = await fetch(`${BASE_URL}test/me`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            }
        })
        const data = await response.json()
        return data
    } catch (error) {
        throw error
    }
}

export async function createNewPost(userToken, postTitle, postDescription, postPrice, postLocation, postWillDeliver) {
    try {
        const response = await fetch(`${BASE_URL}posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
            body: JSON.stringify({
                post: {
                    title: postTitle,
                    description: postDescription,
                    price: postPrice,
                    location: postLocation,
                    willDeliver: postWillDeliver
                }
            })
        })
        const data = await response.json()
        return data
    } catch (error) {
        throw error
    }
}

export async function fetchMyPosts(userToken) {
    try {
        const response = await fetch(`${BASE_URL}users/me`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            }
        })
        const data = await response.json()
        return data
    } catch (error) {
        throw error
    }
}

export async function deleteMyPost(postId, userToken) {
    try {
        const response = await fetch(`${BASE_URL}posts/${postId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            }
        })
        const data = await response.json()
        return data
    } catch (error) {
        throw error
    }
}