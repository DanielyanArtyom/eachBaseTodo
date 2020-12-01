import React from 'react'
import './TodoesList.css'
import deleteIcon from '../../assets/deleteIcon.svg'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import TodoItem from '../../components/TodoItems/TodoItem'
import { fetchTodoes, deleteAll } from '../../redux/actions/actions'

const TodoesList = () => {
    const dispatch = useDispatch()
    const { todoes } = useSelector(({ todoes }) => todoes)

    React.useEffect(() => {
        dispatch(fetchTodoes);
    }, [dispatch])



    const removeList = () => {
        let arrayIds = todoes.map(todo => todo._id)
        arrayIds.forEach(todo => {
            axios.delete('https://todo.eachbase.com/api/ArtyomDanielyan/todos/' + todo)
                .catch(error => {
                    console.log(error)
                })
        })
        dispatch(deleteAll())
    }

    return (
        <>
            <section className="listSection" >
                <div className="listHeader">
                    <h2 className="todoTitle">List</h2>
                    <img className="deleteList" src={deleteIcon} alt="edit Icon" onClick={removeList} />
                </div>
                <div className="list">
                    {todoes.length !== 0 ? todoes.map(todo => {
                        return <TodoItem key={todo._id} title={todo.title} description={todo.description} color={todo.color}  {...todo} />
                    }) : <p className="emptyList" >Your List is Empty</p>}

                </div>
                <div className="addArea">
                    <Link to="/addtodo">
                        <div className="addBtn">+</div>
                    </Link>
                </div>
            </section>
        </>
    )
}

export default TodoesList