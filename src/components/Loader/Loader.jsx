import React from 'react';
import './Loader.css'
import eclipse from '../../assets/loaderSpinner.svg'
const Loader = ({ width, height }) => {
    return (
        <div className="loader" >
            <img src={eclipse} alt="loading Spinner" style={{ width, height }} />
        </div>
    )
}

export default Loader