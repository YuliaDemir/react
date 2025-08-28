import { createSlice } from "@reduxjs/toolkit"

const initialState: {selectedColomns: string[]} = {
    selectedColomns: []
}

const selectedColomnsSlice = createSlice({
    name: 'selectedColomns',
    initialState,
    reducers: {
        saveSelectedColomns: (state, action) => {
            action.payload.forEach((col:string) => {
  if (!state.selectedColomns.includes(col)) {
    state.selectedColomns.push(col);
  }
});
            console.log(state.selectedColomns);
        },

        removeSelectedColomn: (state, action) => {
            state.selectedColomns.push(action.payload)
        }
    }
});

export const { saveSelectedColomns } = selectedColomnsSlice.actions;
export default selectedColomnsSlice.reducer;