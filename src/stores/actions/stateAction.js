export const changeState = (typeState) => async (dispatch) => {
    console.log(typeState)
    dispatch({
        type: typeState,
    })
}

