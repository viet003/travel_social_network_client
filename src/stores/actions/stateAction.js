import actionTypes from "../types/actionTypes";

export const stateAction = (payload) => async (dispatch) => {
    dispatch({
        type: actionTypes.STATE,
        data: payload
    })
}

