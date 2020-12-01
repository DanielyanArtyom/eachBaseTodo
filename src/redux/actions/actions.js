import axios from 'axios'

export const setTodoes = (todoes) => ({
    type: 'SET_TODOES',
    payload: todoes
})

export const updateTodo = (todoes) => ({
    type: 'UPDATE_TODO',
    payload: todoes
})

export const deleteTodo = (id) => ({
    type: 'DELETE_TODO',
    payload: id
})

export const isCheckedUpdated = (id) => ({
    type: 'ISCHECKED_UPDATE',
    payload: id
})

export const deleteAll = () => ({
    type: 'DELETE_ALL'
})

export const fetchTodoes = (dispatch) => {
    axios.get('https://todo.eachbase.com/api/ArtyomDanielyan/todos')
        .then(({ data }) => {
            dispatch(setTodoes(data))
            console.log("get")
        })
        .catch(msg => {
            console.error(msg)
        })
}

export const sendUpdateAction = (todo) => (dispatch) => {
    axios.patch('https://todo.eachbase.com/api/ArtyomDanielyan/todos/' + todo._id, { title: todo.title, description: todo.description, color: todo.color })
        .then(
            dispatch(updateTodo(todo)),
        )
        .catch(msg => {
            console.error(msg)
        })
}

export const sendDeleteAction = (_id) => (dispatch) => {
    axios.delete('https://todo.eachbase.com/api/ArtyomDanielyan/todos/' + _id)
        .then(
            dispatch(deleteTodo(_id))
        )
        .catch(msg => {
            console.error(msg)
        })
}

export const sendIsCheckedUpdate = (_id, checked) => (dispatch) => {
    axios.patch('https://todo.eachbase.com/api/ArtyomDanielyan/todos/' + _id, { checked: !checked })
        .then(
            dispatch(isCheckedUpdated(_id))
        )
        .catch(msg => {
            console.error(msg)
        })
}






