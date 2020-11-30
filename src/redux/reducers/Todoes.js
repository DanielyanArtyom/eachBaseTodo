
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
            const updatedTodo = state.todoes.map(todo => todo.id === action.payload.id ?
                { ...todo, title: action.payload.title, description: action.payload.desciption, color: action.payload.color } : todo)
            return {
                ...state,
                todoes: updatedTodo
            }
        }

        case 'DELETE_TODO': {
            const deleteTodo = state.todoes.filter(todo => todo.id !== action.payload)
            console.log(deleteTodo)
            return {
                ...state,
                todoes: deleteTodo
            }
        }

        case 'ISCHECKED_UPDATE': {
            const updateIsChecked = state.todoes.map(todo => todo.id === action.payload ? { ...todo, checked: !todo.checked } : todo)
            console.log('checked')
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