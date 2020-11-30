import React from 'react'
import "./TodoItem.css"
import editIcon from '../../assets/editIcon.svg'
import deleteIcon from '../../assets/deleteIcon.svg'
import EditTodo from '../EditTodo/EditTodo'
import { useDispatch } from 'react-redux'
import { sendDeleteAction, sendIsCheckedUpdate } from '../../redux/actions/actions'

const TodoItems = ({ title, description, color, id, checked }) => {

    const dispatch = useDispatch()
    const [state, setState] = React.useState(false)

    const onDeleteItemHandler = () => {
        dispatch(sendDeleteAction(id))
    }

    const onIsCheckedHandler = () => {
        dispatch(sendIsCheckedUpdate(id, checked))
    }

    const onEditHandler = (isEdit) => {
        setState(isEdit)
    }

    return (
        <div>
            <div className="listElement" style={{ border: `3px solid ${color}` }}>
                <div className="checkBox" >
                    <label htmlFor="check" className="checkmark" >
                        <input type="checkbox" id="check" className="check" defaultChecked={checked} onClick={onIsCheckedHandler} />
                    </label>
                </div>
                <div className={checked ? "listContentDone" : "listContent"}>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
                <div className="listBtns">
                    <img className="editIcon" src={editIcon} alt="edit Icon" onClick={() => setState(!state)} />
                    <img className="deleteIcon" src={deleteIcon} alt="delete Icon" onClick={onDeleteItemHandler} />
                </div>
            </div>
            {state && <EditTodo id={id} title={title} desciption={description} color={color} editing={onEditHandler} />}
        </div>
    )
}

export default TodoItems