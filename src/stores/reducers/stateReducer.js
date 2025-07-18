import actionTypes from "../types/actionTypes";

const initState = {
    tabActive: actionTypes.HOME_ACTIVE
};

const stateReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.HOME_ACTIVE:
            return {
                ...state,
                tabActive: actionTypes.HOME_ACTIVE
            };
        case actionTypes.EXPLORE_ACTIVE:
            return {
                ...state,
                tabActive: actionTypes.EXPLORE_ACTIVE
            };
        case actionTypes.MYTRIPS_ACTIVE:
            return {
                ...state,
                tabActive: actionTypes.MYTRIPS_ACTIVE
            };
        case actionTypes.SAVEPLACE_ACTIVE:
            return {
                ...state,
                tabActive: actionTypes.SAVEPLACE_ACTIVE
            };
        case actionTypes.MESSAGE_ACTIVE:
            return {
                ...state,
                tabActive: actionTypes.MESSAGE_ACTIVE
            };
        case actionTypes.PROFILE_ACTIVE:
            return {
                ...state,
                tabActive: actionTypes.PROFILE_ACTIVE
            };
        default:
            return state;
    }
}

export default stateReducer