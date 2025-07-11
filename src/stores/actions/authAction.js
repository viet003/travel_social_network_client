import actionTypes from "../types/actionTypes";
// import { apiLogin } from "../../services/authService";

export const login = (payload) => async (dispatch) => {
    try {
        // Giả lập login thành công cho demo
        const mockResponse = {
            data: {
                err: 0,
                token: 'mock_token_' + Date.now(),
                msg: 'Login successful'
            }
        };
        
        if(mockResponse?.data.err === 0) {
            // Lưu token vào localStorage
            localStorage.setItem('token', mockResponse.data.token);
            
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                data: mockResponse?.data
            });
        } else {
            dispatch({
                type: actionTypes.LOGIN_FAIL,
                data: mockResponse?.data
            });
        }
        return mockResponse;
    } catch (error) {
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            data: null
        });
        return error.response;
    }
};

export const logout = () => {
    // Xóa token khỏi localStorage
    localStorage.removeItem('token');
    
    return {
        type: actionTypes.LOGOUT
    };
};

export const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    
    if (token) {
        return {
            type: actionTypes.LOGIN_SUCCESS,
            data: { token, msg: '' }
        };
    } else {
        return {
            type: actionTypes.LOGIN_FAIL,
            data: { msg: 'No token found' }
        };
    }
};

// export const login = (payload) => async (dispatch) => {
//     try {
//         const response = await apiLogin(payload)
//         // console.log(response)
//         if(response?.data.err === 0) {
//             dispatch({
//                 type:actionTypes.LOGIN_SUCCESS,
//                 data:response?.data
//             })
//         } else {
//             dispatch({
//                 type:actionTypes.LOGIN_FAIL,
//                 data:response?.data
//             })
//         }
//         return response
//     } catch (error) {
//         dispatch({
//             type: actionTypes.LOGIN_FAIL,
//             data: null
//         })

//         return error.response
//     }
// }


// export const logout = () => ({
//     type: actionTypes.LOGOUT
// })
