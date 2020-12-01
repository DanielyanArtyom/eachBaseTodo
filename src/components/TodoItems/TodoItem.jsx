import React from 'react'
import "./TodoItem.css"
import editIcon from '../../assets/editIcon.svg'
import deleteIcon from '../../assets/deleteIcon.svg'
import EditTodo from '../EditTodo/EditTodo'
import { useDispatch } from 'react-redux'
import { sendDeleteAction, sendIsCheckedUpdate } from '../../redux/actions/actions'

const TodoItems = ({ title, description, color, _id, checked }) => {

    const dispatch = useDispatch()
    const [state, setState] = React.useState(false)

    const onDeleteItemHandler = () => {
        dispatch(sendDeleteAction(_id))
    }

    const onIsCheckedHandler = () => {
        dispatch(sendIsCheckedUpdate(_id, checked))
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
            {state && <EditTodo _id={_id} title={title} description={description} color={color} editing={onEditHandler} />}
        </div>
    )
}

export default TodoItems