import { createSlice } from "@reduxjs/toolkit";

export const setLoggedState = (obj) => dispatch => {
    try {
        return dispatch(setLoggedStateAction(obj))
    } catch (err) {
        console.error(err)
    }
}

const userDuck = createSlice({
    name: 'userDuck',
    initialState: {
        isLoggedIn: true,
    },
    reducers: {
        setLoggedStateAction: (state, action) => {
            state.isLoggedIn = action.payload.bool
        },
    }
});

export default userDuck.reducer

const {
    setLoggedStateAction
} = userDuck.actions