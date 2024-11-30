import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const dashboardState = localStorage.getItem("dashboardState");
    const recentComponents = localStorage.getItem("recentComponents");
    return {
      designElements: dashboardState ? JSON.parse(dashboardState).elements : [],
      recentComponents: recentComponents ? JSON.parse(recentComponents) : [],
      selectedElement: null,
    };
  } catch {
    return {
      designElements: [],
      recentComponents: [],
      selectedElement: null,
    };
  }
};

const saveState = (state) => {
  try {
    const dashboardState = {
      elements: state.designElements,
      lastModified: new Date().toISOString(),
    };
    localStorage.setItem("dashboardState", JSON.stringify(dashboardState));
    localStorage.setItem(
      "recentComponents",
      JSON.stringify(state.recentComponents)
    );
  } catch (err) {
    console.error("Error saving state:", err);
  }
};

const MAX_RECENT_ITEMS = 5;

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: loadState(),
  reducers: {
    addDesignElement: (state, action) => {
      state.designElements.push(action.payload);
      saveState(state);
    },
    updateDesignElement: (state, action) => {
      const index = state.designElements.findIndex(
        (el) => el.instanceId === action.payload.instanceId
      );
      if (index !== -1) {
        state.designElements[index] = action.payload;
        saveState(state);
      }
    },
    setSelectedElement: (state, action) => {
      state.selectedElement = action.payload;
    },
    addRecentComponent: (state, action) => {
      const exists = state.recentComponents.find(
        (comp) => comp.id === action.payload.id
      );
      if (!exists) {
        state.recentComponents = [
          action.payload,
          ...state.recentComponents,
        ].slice(0, MAX_RECENT_ITEMS);
      } else {
        state.recentComponents = [
          action.payload,
          ...state.recentComponents.filter(
            (comp) => comp.id !== action.payload.id
          ),
        ].slice(0, MAX_RECENT_ITEMS);
      }
      saveState(state);
    },
    removeDesignElement: (state, action) => {
      state.designElements = state.designElements.filter(
        (el) => el.instanceId !== action.payload
      );
      if (state.selectedElement?.instanceId === action.payload) {
        state.selectedElement = null;
      }
      saveState(state);
    },
  },
});

export const {
  addDesignElement,
  updateDesignElement,
  setSelectedElement,
  addRecentComponent,
  removeDesignElement,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
