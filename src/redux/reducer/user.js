import { createSlice } from '@reduxjs/toolkit';

const initialState ={
    users:[
        {
            email: 'abc@xyz.com',
            password: 'qwertyuiop'
        },
        {
            email: 'xyz@abc.com',
            password:'poiuytrewq'
        }
    ]
}

export const userSlice = createSlice({
    name:'snapdeal-user',
    initialState,
    reducers:{}
})

export const {} = userSlice.actions;

export default userSlice.reducer;