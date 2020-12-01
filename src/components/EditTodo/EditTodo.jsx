import React from 'react'
import './EditTodo.css'

import { CirclePicker } from 'react-color';
import { useDispatch } from 'react-redux'
import { sendUpdateAction } from '../../redux/actions/actions'

const EditTodo = ({ _id, title, description, color, editing }) => {
    const dispatch = useDispatch()

    const [state, setState] = React.useState({
        title,
        description,
        color,
        _id
    })
    console.log(_id)
    const onChangeHandler = (color) => {
        setState({
            ...state,
            color: color.hex
        })
    };

    const onInputChanger = (prop) => event => {
        const value = event.target.value
        setState({
            ...state,
            [prop]: value
        })
    }

    const onSaveHandler = event => {
        event.preventDefault();
        dispatch(sendUpdateAction(state))
        editing(false);
    }

    return (
        <>
            <form className="editForm" style={{ border: `3px solid ${state.color}` }} >
                <div className="editInputs" >
                    <input className="editInput" type="text" placeholder="Title" defaultValue={title} onChange={onInputChanger('title')} />
                    <input className="editInput" type="text" placeholder="Description" defaultValue={description} onChange={onInputChanger('description')} />
                </div>
                <CirclePicker width={150} circleSpacing={10} circleSize={18} onChange={onChangeHandler} />
                <div className="editBtns">
                    <input className="editButton" type="submit" value="Save" onClick={onSaveHandler} />
                    <input className="editButton" type="submit" value="Cancel" onClick={() => editing(false)} />
                </div>
            </form>
        </>
    )

}

export default EditTodo