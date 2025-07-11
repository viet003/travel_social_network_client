import actionTypes from "../types/actionTypes";
import { apiLoginService } from "../../services/authService";

export const login = (payload) => async (dispatch) => {
    try {
        const response = await apiLoginService(payload)
        

        if(response?.status === 200) {    
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                data: response?.data
            });
        } else {
            dispatch({
                type: actionTypes.LOGIN_FAIL,
                data: response?.data
            });
        }
        return response;
    } catch (error) {
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            data: null
        });
        return error.response;
    }
};

export const logout = () => {
    return {
        type: actionTypes.LOGOUT
    };
};

export const checkAuthStatus = () => (dispatch, getState) => {
    const { token } = getState().auth;
    if (token) {
        dispatch({
            type: actionTypes.LOGIN_SUCCESS,
            data: { token, msg: '' }
        });
    } else {
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            data: { msg: 'No token found' }
        });
    }
};


