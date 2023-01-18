import { configureStore } from "@reduxjs/toolkit"
import currentSessionReducer from "./stores/currentSession"

export const store = configureStore({
    reducer: {
        currentSession: currentSessionReducer
    }
})
