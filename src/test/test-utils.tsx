import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import reviewsReducer from "@/app/redux/slices/reviewsSlice";
import myListReducer from "@/app/redux/slices/myListSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  reviews: reviewsReducer,
  myList: myListReducer,
});

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Record<string, unknown>;
  store?: ReturnType<typeof configureStore>;
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: rootReducer,
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
