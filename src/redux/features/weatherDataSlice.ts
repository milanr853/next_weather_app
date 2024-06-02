import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export const weatherData: any = createSlice({
    name: "weatherData",
    initialState: null,
    reducers: {
        getData: (state, { payload }) => {
            return payload
        }
    }
})

export const { getData } = weatherData.actions

export default weatherData.reducer