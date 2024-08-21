import { combineReducers } from "redux";
import { converterSlice } from "./Converter/converter-slice";

export const rootReducer = combineReducers({
    converterReducer: converterSlice.reducer
})

export type RootState = ReturnType<typeof rootReducer>;