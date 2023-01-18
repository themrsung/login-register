// Set true to use server storage, false to use local database
export const USE_SERVER = false

// Local database
export const USERS = [
    {
        id: "admin",
        password: 1216985755,
        passwordHashVersion: "v1"
    }
]

// Server URL, will not apply if USE_SERVER is false
export const SERVER_URL = "http://localhost:5000"

// SubURL of users
export const USERS_SUBURL = "/users"

// Current password hash version. New users' passwords will be hashed in this version.
export const CURRENT_PASSWORD_HASH_VERSION = "v1"

// Toggles usage of session storage to store user session
export const USE_SESSION_STORAGE = true
