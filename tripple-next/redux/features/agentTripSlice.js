'use client'

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    agentTrip: null
};

const agentTripSlice = createSlice({
    name: 'agentTrip',
    initialState,
    reducers: {
        setAgentTrip(state, action) {
            state.agentTrip = action.payload;
        },
        reset(state) {
            state.agentTrip = null
        }

    }
});

export const { setAgentTrip, reset } = agentTripSlice.actions;

export default agentTripSlice.reducer