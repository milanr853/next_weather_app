import { configureStore } from "@reduxjs/toolkit";
import weatherDataReducer from "./features/weatherDataSlice"

export const store = configureStore({
    reducer: {
        weatherDataReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ReturnType<typeof store.getState>