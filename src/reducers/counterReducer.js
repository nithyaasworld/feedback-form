import {BEGIN_UPDATE} from "../actions/counterActions";

let initialState = {
    isUpdating: false,
    username: "",
    feedbacks: [],
};


export default function counterReducer(state = initialState, action) {
    switch (action.type) {
       
       
        case BEGIN_UPDATE:
            return {...state, isUpdating: true};
        default:
            return state;
    }
}