import { csrfFetch } from './csrf';

const LOAD_NOTES = 'note/loadnotes';
const SET_NOTE = 'note/setNote';
const UPDATE_NOTE = 'note/updateNote';
const REMOVE_NOTE = 'note/removeNote';

const loadNotes = (notes) => {
    return {
        type: LOAD_NOTES,
        notes
    };
};

export const getNotes = () => async (dispatch) => {
    const response = await csrfFetch('/api/note');
    const data = await response.json();
    dispatch(loadNotes(data.notes));
    return response;
};

const setNote = (note) => {
    return {
        type: SET_NOTE,
        note
    };
};

export const createNote = (note) => async (dispatch) => {
    const { userId, notebookId, title, content } = note
    const response = await csrfFetch('/api/note', {
        method: 'POST',
        body: JSON.stringify({
            userId,
            notebookId,
            title,
            content
        }),
    });
    const data = await response.json();
    // console.log(">>>>>>>>", data)
    dispatch(setNote(data.note));
    return response;
};

const removeNote = (id) => {
    return {
        type: REMOVE_NOTE,
        id
    };
};

export const deleteNote = (id) => async (dispatch) => {
    const response = await csrfFetch('/api/note', {
        method: 'DELETE',
        body: JSON.stringify({
            id
        }),
    });
    const data = await response.json();
    // console.log("<<<<<<<<<<<", data)
    dispatch(removeNote(id));
    return response;
};

const updateNote = (note) => {
    return {
        type: UPDATE_NOTE,
        note
    }
}

export const editNote = (id ,note) => async (dispatch) => {
    const { userId, notebookId, title, content } = note
    const response = await csrfFetch(`/api/note/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            userId,
            notebookId,
            title,
            content
        }),
    });
    const data = await response.json();
    console.log("??????",data)
    dispatch(updateNote(data.updatedNote));
    return response;
};

const initialState = {};

const noteReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_NOTES:
            newState = { ...state };
            action.notes.forEach(note => {
                newState[note.id] = note
            })
            return newState;
        case SET_NOTE:
            newState = { ...state };
            newState[action.note.id] = action.note;
            return newState;
        case REMOVE_NOTE:
            newState = { ...state };
            delete newState[action.id];
            return newState;
        case UPDATE_NOTE:
            newState = { ...state };
            newState[action.note.id] = action.note;
            return newState;
        default:
            return state;
    }
};

export default noteReducer;
