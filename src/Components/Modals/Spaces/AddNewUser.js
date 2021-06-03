import React, { useRef } from 'react';
import classes from './Modal.module.scss';
import CloseIcon from '@material-ui/icons/Close';

function Confirm(props) {
    const overlayRef = useRef(null);
    const codeFieldRef = useRef(null);
    const codeField = {
        background: '#c5d6db',
        padding: '10px',
        borderRadius: '5px'
    }

    function overlayClickHandler(evt) {
        if (evt.target.contains(overlayRef.current)) {
            props.closeModal();
        }
    }

    function copyClickHandler() {
        navigator.clipboard.writeText(codeFieldRef.current.textContent);
        props.closeModal();
    }

    return (
        <div className={classes.Container} style={{ width: '420px' }}>
            <CloseIcon className={classes.cross} onClick={() => props.closeModal()} />
            <h2>Пригласить пользователя</h2>
            <p>Отправьте данный код человеку, которого хотите пригласить</p>
            <div style={{ position: 'relative', width: '95%', alignSelf: 'center' }}>
                <div style={codeField} ref={codeFieldRef}>{props.currentSpace.id}</div>
                <i className='fa fa-clone'
                    style={{ position: 'absolute', top: '10px', right: '12px', cursor: 'pointer' }}
                    onClick={copyClickHandler}></i>
            </div>
        </div>
    )
}

export default Confirm;