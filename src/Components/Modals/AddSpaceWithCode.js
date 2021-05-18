import React, { useState, useRef } from 'react';
import classes from './Modal.module.scss';
import Input from '../../Plugins/Input/Input';
import Button from '../../Plugins/Button/Button';
import axios from 'axios';

function AddNewTask(props) {
    const spaces = JSON.parse(localStorage.getItem('spaces'));
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [codeValue, setCodeValue] = useState('');
    const overlayRef = useRef(null);

    function submitHandler(evt) {
        evt.preventDefault();
        addSpace();
    }

    function resetStates() {
        setCodeValue('');
    }

    function crossClickHandler() {
        props.toggleAddSpaceWithCodeModal();
        resetStates();
    }

    async function addSpace() {
        const token = localStorage.getItem('token');
        const data = await axios.get(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/spaces/${codeValue}.json?auth=${token}`);
        const newSpace = data.data.spaceData;
        newSpace.users.push(userData);
        spaces.push(newSpace);
        props.updateSpaces(spaces);
        resetStates();
        props.toggleAddSpaceWithCodeModal();
    }

    function overlayClickHandler(evt) {
        if (evt.target.contains(overlayRef.current)) {
            props.toggleAddSpaceWithCodeModal();
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
                <h2>Добавить по коду</h2>
                <form onSubmit={submitHandler} onKeyDown={keyHandler}>
                    <Input
                        value={codeValue}
                        onChange={evt => setCodeValue(evt.target.value)}
                        label='Код'
                        autoFocus={true}
                        required />
                    <div className={classes.buttons}>
                        <Button cls='primary' type='submit' text='Добавить' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddNewTask;