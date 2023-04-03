import { createSlice } from '@reduxjs/toolkit';

interface ILanguageState {
    data: any;
}

const initialState: ILanguageState = {
    data: '',
};

const languageSlice = createSlice({
    name: 'languageKey',
    initialState,
    reducers: {
        updateLanguageKey: (state, { payload }) => {
            state.data = payload;
        },
    },
});

export const { updateLanguageKey } = languageSlice.actions;
export default languageSlice.reducer;
