import React, { useRef } from 'react';
import classes from './Modal.module.scss';

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

    return (
        <div className={classes.Overlay} onClick={overlayClickHandler} ref={overlayRef}>
            <div className={classes.Modal} style={{ width: '420px' }}>
                <i className={`fa fa-times ${classes.cross}`} onClick={() => props.closeModal()}></i>
                <h2>Пригласить пользователя</h2>
                <p>Отправьте данный код человеку, которого хотите пригласить</p>
                <div style={{ position: 'relative', width: '95%', alignSelf: 'center' }}>
                    <div style={codeField} ref={codeFieldRef}>{props.currentSpace.id}</div>
                    <i className='fa fa-clone'
                        style={{ position: 'absolute', top: '10px', right: '12px', cursor: 'pointer' }}
                        onClick={() => navigator.clipboard.writeText(codeFieldRef.current.textContent)}></i>
                </div>
            </div>
        </div>
    )
}

export default Confirm;