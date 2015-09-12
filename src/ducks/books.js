const LOAD = 'booktrackr/books/LOAD';
const LOAD_SUCCESS = 'booktrackr/books/LOAD_SUCCESS';
const LOAD_FAIL = 'booktrackr/books/LOAD_FAIL';
const SAVE = 'booktrackr/books/SAVE';
const SAVE_SUCCESS = 'booktrackr/books/SAVE_SUCCESS';
const SAVE_FAIL = 'booktrackr/books/SAVE_FAIL';
const ADD = 'booktrackr/books/ADD';
const ADD_SUCCESS = 'booktrackr/books/ADD_SUCCESS';
const ADD_FAIL = 'booktrackr/books/ADD_FAIL';

const initialState = {
  loaded: false,
  editing: {},
  saveError: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    case SAVE:
      return state;
    case SAVE_SUCCESS:
      const save_data = [...state.data];
      save_data[action.result.id - 1] = action.result;
      return {
        ...state,
        data: save_data,
        editing: {
          ...state.editing,
          [action.id]: false
        },
        saveError: {
          ...state.saveError,
          [action.id]: null
        }
      };
    case SAVE_FAIL:
      return {
        ...state,
        saveError: {
          ...state.saveError,
          [action.id]: action.error
        }
      };
    case ADD:
      return state; 
    case ADD_SUCCESS:
      const add_data = [...state.data];
      add_data[action.result.id - 1] = action.result;
      return {
        ...state,
        data: add_data,
        editing: {
          ...state.editing,
          [action.id]: false
        },
        saveError: {
          ...state.saveError,
          [action.id]: null
        }
      };
    case ADD_FAIL:
      return {
        ...state,
        saveError: {
          ...state.saveError,
          [action.id]: action.error
        }
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.books && globalState.books.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/books', { wp: true })
  };
}

export function save(book) {
  const data = {
    title: book.title,
    status: 'publish',
    content: JSON.stringify(book)
  }

  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: book.id,
    promise: (client) => client.put('/books' + book.id, { data: data, wp: true })
  };
}

export function getOne(bookSlug) {
  return {

  };
}

export function add(book) {
  const data = {
    title: book.title,
    status: 'publish',
    content: JSON.stringify(book)
  }

  return {
    types: [ADD, ADD_SUCCESS, ADD_FAIL],
    promise: (client) => client.post('books', { data: data, wp: true })
  };
}