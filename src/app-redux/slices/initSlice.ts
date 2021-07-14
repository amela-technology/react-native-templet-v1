import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
    data: any[];
}

const initialState: State = {
    data: [],
};

const initSlice = createSlice({
    name: 'init',
    initialState,
    reducers: {
        addData: (state, action: PayloadAction<any>) => {
            state.data.push(action.payload);
        },
        clearData: (state) => {
            state.data = [];
        },
    },
});

export const { addData, clearData } = initSlice.actions;
export default initSlice.reducer;
