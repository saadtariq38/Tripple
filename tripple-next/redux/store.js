'use client'


import { configureStore } from "@reduxjs/toolkit";
import  tripReducer from './features/tripSlice.js'
import agentReducer from'./features/agentTripSlice.js';

export const store = configureStore({
    reducer: {
        trip: tripReducer,
        agentTrip: agentReducer
    },
    devTools: process.env.NODE_ENV !== "production",
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;