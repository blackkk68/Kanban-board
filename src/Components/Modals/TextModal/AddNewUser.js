import React, { useRef } from 'react';
import classes from './Modal.module.scss';

function AddNewUser(props) {
    const codeFieldRef = useRef(null);

    function copyClickHandler() {
        navigator.clipboard.writeText(codeFieldRef.current.textContent);
        props.closeModal();
    }

    return (
        <div className={classes.Container}>
            <h2>Пригласить пользователя</h2>
            <p>Отправьте данный код человеку, которого хотите пригласить</p>
            <div className={classes.codeField}>
                <div ref={codeFieldRef}>{props.currentSpace.id}</div>
                <i className='fa fa-clone' onClick={copyClickHandler} />
            </div>
        </div>
    )
}

export default AddNewUser;