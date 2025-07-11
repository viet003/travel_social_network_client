import actionTypes from "../types/actionTypes";

const initState = {
    isLoggedIn: false,
    token: null,
    msg: '',
}


const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return ({
                ...state,
                isLoggedIn: true,
                token: action?.data?.token,
                msg: '',
            })
        case actionTypes.LOGIN_FAIL:
            return ({
                ...state,
                isLoggedIn: false,
                token: null,
                msg: action?.data?.msg ? action?.data?.msg : '',
            })
        case actionTypes.LOGOUT:
            return ({
                ...state,
                isLoggedIn: false,
                token: null,
                msg: '',
            })
        case actionTypes.CHECK_AUTH_STATUS:
            return ({
                ...state,
                isLoggedIn: !!action?.data?.token,
                token: action?.data?.token || null,
                msg: action?.data?.msg || '',
            })
        default:
            return state;
    }
}

export default authReducer