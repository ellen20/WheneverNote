import { csrfFetch } from './csrf';

const SET_NOTEBOOK = 'notebook/setNotebook';
const UPDATE_NOTEBOOK = 'notebook/updateNotebook';
const REMOVE_NOTEBOOK = 'notebook/removeNotebook';

const setNotebook = (notebook) => {
    return {
        type: SET_NOTEBOOK,
        payload: notebook
    };
};

const updateNotebook = (notebook) => {
    return {
        type: UPDATE_NOTEBOOK,
        payload: notebook
    }
}
const removeNotebook = () => {
    return {
        type: REMOVE_NOTEBOOK,
    };
};

export const getNotebooks = () => async (dispatch) => {
    const response = await csrfFetch('/api/notebook');
    const data = await response.json();
    dispatch(setNotebook(data.notebooks));
    return response;

}
export const createNotebook = (notebook) => async (dispatch) => {
    const { userId, title } = notebook
    const response = await csrfFetch('/api/notebook', {
        method: 'POST',
        body: JSON.stringify({
           userId,
           title
        }),
    });
    const data = await response.json();
    dispatch(setNotebook(data.notebook));
    return response;
};

export const editNotebook = (notebook) => async (dispatch) => {
    const { userId, title } = notebook
    const response = await csrfFetch('/api/notebook', {
        method: 'PUT',
        body: JSON.stringify({
            userId,
            title
        }),
    });
    const data = await response.json();
    dispatch(setNotebook(data.notebook));
    return response;
};


const initialState = { notebook: null };

const notebookReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_NOTEBOOK:
            newState = Object.assign({}, state);
            newState.notebook = action.payload;
            return newState;
        case UPDATE_NOTEBOOK:
            newState = Object.assign({}, state);
            newState.notebook = action.payload;
            return newState;
        case REMOVE_NOTEBOOK:
            newState = Object.assign({}, state);
            newState.notebook = null;
            return newState;
        default:
            return state;
    }
};

export default notebookReducer;
