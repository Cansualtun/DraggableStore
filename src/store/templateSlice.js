import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  templates: [],
  index: null,
};

export const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    addTemplate: (state, action) => {
      state.templates.push(action.payload);
    },
    updateTemplate: (state, action) => {
      let filtered = state.templates.filter(
        (item) => item.instanceId !== action.payload.instanceId
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
      state.templates = [];
    },
    deleteElement: (state, action) => {
      state.templates = state.templates.filter(
        (item) => item.instanceId !== action.payload
      );
    },
    deleteTemplate: (state) => {
      state.templates = [];
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
  deleteElement,
  deleteTemplate,
} = templateSlice.actions;

export default templateSlice.reducer;
