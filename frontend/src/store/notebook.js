import { csrfFetch } from './csrf';

const SET_NOTEBOOK = 'notebook/setNotebook';
const UPDATE_NOTEBOOK = 'notebook/updateNotebook';
const REMOVE_NOTEBOOK = 'notebook/removeNotebook';
const LOAD_NOTEBOOKS = 'notebook/loadnotebooks';

const loadNotebooks = (notebooks) => {
    return {
        type: LOAD_NOTEBOOKS,
        notebooks
    };
};

const setNotebook = (notebook) => {
    return {
        type: SET_NOTEBOOK,
        notebook
    };
};

const updateNotebook = (notebook) => {
    return {
        type: UPDATE_NOTEBOOK,
        notebook
    }
}
const removeNotebook = (id) => {
    return {
        type: REMOVE_NOTEBOOK,
        id
    };
};

export const getNotebooks = () => async (dispatch) => {
    const response = await csrfFetch('/api/notebook');
    const data = await response.json();
    dispatch(loadNotebooks(data.notebooks));
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

export const deleteNotebook = (id) => async (dispatch) => {
    const response = await csrfFetch('/api/notebook', {
        method: 'DELETE',
        body: JSON.stringify({
            id
        }),
    });
    const data = await response.json();
    console.log("<<<<<<<<<<<",data)
    dispatch(removeNotebook(id));
    return response;//
};

const initialState = {};

const notebookReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_NOTEBOOKS:
            newState = { ...state };
            action.notebooks.forEach(notebook => {
                newState[notebook.id] = notebook
            })
            return newState;
        case SET_NOTEBOOK:
            newState = { ...state };
            newState[action.notebook.id] = action.notebook;
            return newState;
        // case UPDATE_NOTEBOOK:
        //     return newState;
        case REMOVE_NOTEBOOK:
            console.log("!!!!!!!!!!",action)
            newState = {...state};
            // let {id} = action.id;
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
};

export default notebookReducer;
