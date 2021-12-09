const BASE_URL = "https://strangers-things.herokuapp.com/api/2111-ftb-et-web-ft/"

export async function fetchAllPosts() {
    try {
        const response = await fetch(`${BASE_URL}posts`)
        const data = await response.json()
        return data.data.posts
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