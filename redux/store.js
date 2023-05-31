import { configureStore } from "redux";

import reducer from "./reducers/index";

export default function configureStore(initialState) {
    return configureStore(reducer, initialState)
}

