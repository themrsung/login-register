import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoggedIn: false,
    userId: "",
    authKey: ""
}

const currentSessionSlice = createSlice({
    name: "currentSession",
    initialState,
    reducers: {
        setCurrentSession(state, action) {
            state = action.payload
        },
        clearCurrentSession(state) {
            state = initialState
        }
    }
})

export const { setCurrentSession, clearCurrentSession } =
    currentSessionSlice.actions
export default currentSessionSlice.reducer
