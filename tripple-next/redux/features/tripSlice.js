'use client'

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    trip: null
};

const tripSlice = createSlice({
    name: 'trip',
    initialState,
    reducers: {
        setTrip(state, action) {
            state.trip = action.payload;
        },
        reset(state) {
            state.trip = null
        }

    }
});

export const { setTrip, reset } = tripSlice.actions;

export default tripSlice.reducer