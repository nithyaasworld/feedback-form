export const ADD_NEW_USER = 'ADD_NEW_USER';
export const BEGIN_UPDATE = 'BEGIN_UPDATE';
export const UPDATE_ERROR = 'UPDATE_ERROR';

export const addNewUserSuccess = () => {
    return {
        type: ADD_NEW_USER
    }
};
const updateBegin = () => {
    return {
        type: BEGIN_UPDATE
    }
};
export const updateError = (error) => {
    return {
        type: UPDATE_ERROR,
        payload: error,
    }
}
// export const addNewUser = (newUser) => {
//     return async (dispatch) => {
//         dispatch(updateBegin());
//         await addUserToDB(newUser)
//         .then(() => console.log("user added successfully"))
//         .catch((e) => dispatch(updateError(e.message)));
//     }
// }