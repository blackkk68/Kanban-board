import React, { useState, useRef } from 'react';
import classes from './Modal.module.scss';
import Input from '../../Plugins/Input/Input';
import Button from '../../Plugins/Button/Button';
import { Space } from '../../StaticData';

function AddNewTask(props) {
    const spaces = JSON.parse(localStorage.getItem('spaces'));
    const [titleValue, setTitleValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const overlayRef = useRef(null);

    function submitHandler(evt) {
        evt.preventDefault();
        addSpace();
    }

    function resetStates() {
        setTitleValue('');
        setDescriptionValue('');
    }

    function crossClickHandler() {
        props.closeModal();
        resetStates();
    }

    function addSpace() {
        const newSpace = new Space(false, titleValue, descriptionValue);
        spaces.push(newSpace);
        props.updateSpaces(spaces);
        resetStates();
        props.closeModal();
    }

    function overlayClickHandler(evt) {
        if (evt.target.contains(overlayRef.current)) {
            props.closeModal();
            resetStates();
        }
    }

    function keyHandler(evt) {
        if (evt.code === 'Enter') {
            addSpace();
        }
    }

    return (
        <div className={classes.Overlay} onClick={overlayClickHandler} ref={overlayRef}>
            <div className={classes.Modal} style={{ width: '500px' }}>
                <i className={`fa fa-times ${classes.cross}`} onClick={crossClickHandler}></i>
                <h2>Новое пространство</h2>
                <form onSubmit={submitHandler} onKeyDown={keyHandler}>
                    <Input
                        value={titleValue}
                        onChange={evt => setTitleValue(evt.target.value)}
                        placeholder='Название'
                        autoFocus={true}
                        required />
                    <Input
                        style={{ height: '56px' }}
                        value={descriptionValue}
                        onChange={evt => setDescriptionValue(evt.target.value)}
                        placeholder='Описание' />
                    <div className={classes.buttons}>
                        <Button cls='primary' type='submit' text='Добавить' style={{}} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddNewTask;