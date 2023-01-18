import axios from "axios"
import {
    CURRENT_PASSWORD_HASH_VERSION,
    SERVER_URL,
    USERS,
    USERS_SUBURL,
    USE_SERVER,
    USE_SESSION_STORAGE
} from "./apiSettings"
import { v4 as uuidv4 } from "uuid"
import { store } from "../redux/store"
import {
    clearCurrentSession,
    setCurrentSession
} from "../redux/stores/currentSession"

export const addUser = async (user) => {
    if (!USE_SERVER) {
        console.log("Cannot add user if USE_SERVER is false")
        return false
    }

    const res = await axios.post(SERVER_URL + USERS_SUBURL, user)
    if (!res) return
    return true
}

// Updates user
export const updateUser = async (id, newUser) => {
    if (!USE_SERVER) {
        console.log("Cannot update user if USE_SERVER is false")
        return "Cannot update user if USE_SERVER is false"
    }

    const res = await axios.put(SERVER_URL + USERS_SUBURL + "/" + id, newUser)
    if (!res) return
    return res.data
}

// Deletes user
export const deleteUser = async (id) => {
    if (!USE_SERVER) {
        console.log("Cannot delete user is USE_SERVER is false")
        return "Cannot delete user is USE_SERVER is false"
    }

    const res = await axios.delete(SERVER_URL + USERS_SUBURL + "/" + id)
    if (!res) return
    return res.data
}

// Returns true if password matches id, false if otherwise
export const validatePassword = async (id, password) => {
    const user = await getUser(id)
    if (!user) return false

    const hashedPassword = HashPassword.hashPassword(
        user.passwordHashVersion,
        password
    )
    const doesPasswordMatch = hashedPassword === user.password

    return doesPasswordMatch
}

// Logs user in
export const login = async (id, password) => {
    const doCredentialsMatch = await validatePassword(id, password)
    if (!doCredentialsMatch) return false

    // Login success

    const authKey = uuidv4()

    if (USE_SESSION_STORAGE) {
        window.sessionStorage.setItem("userLoggedIn", "true")
        window.sessionStorage.setItem("userId", id)
        window.sessionStorage.setItem("userAuthKey", authKey)
    }

    store.dispatch(
        setCurrentSession({
            isLoggedIn: true,
            userId: id,
            authKey: authKey
        })
    )

    return true
}

// Logs user out
export const logout = () => {
    if (USE_SESSION_STORAGE) {
        window.sessionStorage.removeItem("userLoggedIn")
        window.sessionStorage.removeItem("userId")
        window.sessionStorage.removeItem("userAuthKey")
    }

    store.dispatch(clearCurrentSession())
}

// Checks if current session is valid.
export const isCurrentSessionValid = async () => {
    if (!USE_SESSION_STORAGE) {
        return store.getState().currentSession.isLoggedIn
    }

    const localAuthKey = window.sessionStorage.getItem("userAuthKey")
    const serverAuthKey = store.getState().currentSession.authKey
    const doAuthKeysMatch = localAuthKey === serverAuthKey

    return doAuthKeysMatch
}

// Returns all users
export const getUsers = async () => {
    if (USE_SERVER) {
        const res = await axios.get(SERVER_URL + USERS_SUBURL)
        if (!res) return []

        return res
    }

    return USERS
}

// Returns specific user
export const getUser = async (id) => {
    const users = await getUsers()
    if (!users) return {}

    const matchingUsers = users.filter((u) => u.id === id)
    if (matchingUsers.length < 1) return {}

    return matchingUsers[0]
}

class HashPassword {
    static v1(password) {
        let hash = 0
        for (let i = 0; i < password.length; i++) {
            let chr = password.charCodeAt(i)
            hash = (hash << 5) - hash + chr
            hash |= 0
        }

        return hash
    }

    static hashPassword(version, password) {
        switch (version) {
            case "v1":
                return HashPassword.v1(password)
            default:
                return HashPassword.hashPassword(
                    CURRENT_PASSWORD_HASH_VERSION,
                    password
                )
        }
    }
}
