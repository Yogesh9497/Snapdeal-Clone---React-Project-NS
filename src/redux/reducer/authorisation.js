import { createSlice } from '@reduxjs/toolkit';

const initialState ={
    isLoggedIn: false,
    name: null,
    email: null,
};

export const authorisedSlice = createSlice({
    name: 'snapdeal-authorisation',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.isLoggedIn = true;
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
        logout: (state) =>{
            state.isLoggedIn = false;
            state.name = null;
            state.email = null;
        }
    }
});

export const { login, logout } = authorisedSlice.actions;

export default authorisedSlice.reducer;