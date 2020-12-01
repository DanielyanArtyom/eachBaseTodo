import React from 'react'
import './AddTodo.css'
import { Link } from 'react-router-dom'
import { CirclePicker } from 'react-color';
import Loader from '../../components/Loader/Loader'
import axios from 'axios'

const AddTodo = ({ history }) => {
    const [state, setState] = React.useState({
        title: '',
        description: '',
        color: 'black',
        checked: false,
        id: Date.now()
    })

    const [isLoading, setIsLoading] = React.useState(false)
    const [isReach, setIsReach] = React.useState(true)

    //Form validation dependences
    const [titleDirt, setTitleDirty] = React.useState(false)
    const [descriptionDirty, setdescriptionDirty] = React.useState(false)
    const [titleError, setTitleError] = React.useState("Title field can not be empty");
    const [descriptError, setdescriptError] = React.useState("Description field  can not be empty");
    const [isValid, setIsValid] = React.useState(false)

    React.useEffect(() => {
        if (titleError || descriptError) {
            setIsValid(false)
        } else {
            setIsValid(true)
        }
    }, [titleError, descriptError])

    const onChangeHandler = (color) => {
        setState({
            ...state,
            color: color.hex
        })
    };

    const onInputHandler = (prop) => event => {
        let value = event.target.value;
        switch (prop) {
            case 'title': {
                if (value.length === 1 || value.length < 5) {
                    setTitleError("Title  must be longer than 5 letters")
                } else if (!value) {
                    setTitleError("Title field can not be empty")
                }
                else {
                    setTitleError("")
                }
                break;
            }

            case 'description': {
                if (value.length === 1 || value.length < 8) {
                    setdescriptError("Description  must be longer than 8 letters")
                } else if (!value) {
                    setdescriptError("Description field can not be empty")
                }
                else {
                    setdescriptError("")
                }
                break;
            }
            default:
                break;
        }
        setState({
            ...state,
            [prop]: value
        })
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        setIsLoading(true)
        axios.post('https://todo.eachbase.com/api/ArtyomDanielyan/todos', state)
            .then(response => {
                setState({
                    title: '',
                    description: '',
                    color: 'black',
                    checked: false,
                    id: Date.now()
                })
                if (!window.confirm("Do you want add more?")) {
                    history.push("/")
                }
                setIsLoading(false)
            })
            .catch(msg => {
                setIsReach(false)
            })
    }

    const blurHandler = (event) => {
        switch (event.target.name) {
            case 'title': {
                setTitleDirty(true);
                break;
            }
            case 'description': {
                setdescriptionDirty(true);
                break;
            }
            default:
                break;
        }
    }

    return (
        <section className="addToSection" style={{ border: `3px solid ${state.color}` }}>
            <div className="header">
                <div className="backBtn"><Link to="/">Back</Link> </div>
                <h2 className="addTitle">Add Todo</h2>
            </div>
            {isReach ? (isLoading ? <Loader width="120px" height="120px" /> :
                <form className="form">
                    <div className="titleError">
                        {(titleDirt && titleError) && <div className="error">{titleError}</div>}
                        <input type="text" className="addInput" name="title" placeholder="input Title" onBlur={event => blurHandler(event)} onChange={onInputHandler('title')} />
                    </div>
                    <div className="descriptError">
                        {(descriptionDirty && descriptError) && <p className="error">{descriptError}</p>}
                        <input type="text" className="addInput" name="description" placeholder="input Description" onBlur={event => blurHandler(event)} onChange={onInputHandler('description')} />
                    </div>
                    <CirclePicker onChange={onChangeHandler} />
                    <input className={isValid ? "addButton" : "addButtonDisabled"} type="submit" value="Add todo" disabled={!isValid} onClick={onSubmitHandler} />
                </form>)
                : (<div className='requestError'>Your Request is Failed, pls refresh and try again</div>)
            }
        </section>
    )
}

export default AddTodo