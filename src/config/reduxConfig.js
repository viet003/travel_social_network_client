import rootReducer from "../stores/reducers/rootReducer";
import { persistStore } from "redux-persist";
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Sử dụng named import { thunk }

const reduxStoreConfig = () => {
    const store = createStore(rootReducer, applyMiddleware(thunk));
    const persistor = persistStore(store);

    return { store, persistor };
};

export default reduxStoreConfig;