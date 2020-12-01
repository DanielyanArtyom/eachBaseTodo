
const initialState = {
    todoes: [],
}

const todoes = (state = initialState, action) => {
    switch (action.type) {

        case 'SET_TODOES': {
            return {
                ...state,
                todoes: action.payload
            }
        }

        case 'UPDATE_TODO': {
            const updatedTodo = state.todoes.map(todo => todo._id === action.payload._id ?
                { ...todo, title: action.payload.title, description: action.payload.description, color: action.payload.color } : todo)
            return {
                ...state,
                todoes: updatedTodo
            }
        }

        case 'DELETE_TODO': {
            const deleteTodo = state.todoes.filter(todo => todo._id !== action.payload)
            return {
                ...state,
                todoes: deleteTodo
            }
        }

        case 'ISCHECKED_UPDATE': {
            const updateIsChecked = state.todoes.map(todo => todo._id === action.payload ? { ...todo, checked: !todo.checked } : todo)
            return {
                ...state,
                todoes: updateIsChecked
            }
        }

        case 'DELETE_ALL': {
            return {
                todoes: []
            }
        }

        default:
            return state
    }
}

export default todoes