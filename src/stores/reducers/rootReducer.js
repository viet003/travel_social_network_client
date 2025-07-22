import authReducer from './authReducer';
import tabActiveReducer from "./tabReducer";
import { combineReducers } from "redux"
import storage from "redux-persist/lib/storage"
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2"
import persistReducer from "redux-persist/es/persistReducer";


const commonConfig = {
    storage,
    stateReconciler: autoMergeLevel2
}

const authConfig = {
    ...commonConfig,
    key: 'auth',
    whiteList: ['isLoggedIn', 'token']
}

const tabConfig = {
    ...commonConfig,
    key: 'tab_active',
    whiteList: ['active']
}

const rootReducer = combineReducers({
    auth: persistReducer(authConfig, authReducer),
    tab_active: persistReducer(tabConfig, tabActiveReducer)
})


export default rootReducer