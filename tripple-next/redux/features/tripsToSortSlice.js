'use client'

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tripsToSort: null
};

const tripsToSortSlice = createSlice({
    name: 'tripsToSort',
    initialState,
    reducers: {
        setTrips(state, action) {
            state.trip = action.payload;
        },
        reset(state) {
            state.trip = null
        }

    }
});

export const { setTrips, reset } = tripsToSortSlice.actions;

export default tripsToSortSlice.reducer