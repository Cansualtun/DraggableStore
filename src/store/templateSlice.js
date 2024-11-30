import { createSlice } from "@reduxjs/toolkit";

const initialState = { templates: [], index: null };

const templateSlice = createSlice({
  name: "template",
  initialState: initialState,
  reducers: {
    addTemplate: (state, action) => {
      state.templates = [...state.templates, action.payload];
    },
    updateTemplate: (state, action) => {
      let filtered = state.templates.filter(
        (item) => item.id !== action.payload.id
      );
      state.templates = [...filtered, action.payload];
    },
    addFullTemplate: (state, action) => {
      state.templates = action.payload;
    },
    currentTemplateIndex: (state, action) => {
      state.index = action.payload;
    },
    clearCurrentTemplateIndex: (state) => {
      state.index = null;
    },
  },
});

export const {
  addTemplate,
  updateTemplate,
  addFullTemplate,
  currentTemplateIndex,
  clearCurrentTemplateIndex,
} = templateSlice.actions;

export default templateSlice.reducer;
