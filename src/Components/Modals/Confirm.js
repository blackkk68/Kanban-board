import React, { useRef } from 'react';
import classes from './Modal.module.scss';
import Button from '../../Plugins/Button/Button';

function Confirm(props) {
    const overlayRef = useRef(null);

    function overlayClickHandler(evt) {
        if (evt.target.contains(overlayRef.current)) {
            props.closeModal();
        }
    }

    function removeColumn() {
        const columns = JSON.parse(localStorage.getItem('columns'));
        const colIndex = columns.findIndex(item => item.id === props.colId);
        columns.splice(colIndex, 1);
        props.updateColumns(columns);
        props.closeModal();
    }

    return (
        <div className={classes.Overlay} onClick={overlayClickHandler} ref={overlayRef}>
            <div className={classes.Modal} style={{ width: '420px' }}>
                <i className={`fa fa-times ${classes.cross}`} onClick={() => props.closeModal()}></i>
                <h2>Удалить этап?</h2>
                <p>Вы уверены, что хотите удалить этап? Все задачи будут также удалены.</p>
                <div className={classes.buttons}>
                    <Button cls='delete' text={'Удалить'} onClick={removeColumn}></Button>
                    <Button cls='cancel' text={'Отмена'} onClick={() => props.closeModal()}></Button>
                </div>
            </div>
        </div>
    )
}

export default Confirm;