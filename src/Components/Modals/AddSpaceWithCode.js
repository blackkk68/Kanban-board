import React, { useState, useRef } from 'react';
import classes from './Modal.module.scss';
import CloseIcon from '@material-ui/icons/Close';
import Input from '../../Plugins/Input/Input';
import Button from '../../Plugins/Button/Button';
import axios from 'axios';
import spacesStore from '../../Store/spaces';

function AddNewTask(props) {
    const spaces = spacesStore.spaces.slice();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [codeValue, setCodeValue] = useState('');
    const overlayRef = useRef(null);

    function submitHandler(evt) {
        evt.preventDefault();
        addSpace();
    }

    function crossClickHandler() {
        props.toggleAddSpaceWithCodeModal();
    }

    async function addSpace() {
        const tokenData = JSON.parse(localStorage.getItem('tokenData'));
        const newSpaceData = await axios.get(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/spaces/${codeValue}/spaceData.json?auth=${tokenData.token}`);
        const newSpace = newSpaceData.data;
        newSpace.users.push({ name: userData.name, surname: userData.surname, id: userData.id });
        spaces.push(newSpace);
        spacesStore.updateSpacesServerData(spaces);
        props.toggleAddSpaceWithCodeModal();
    }

    function overlayClickHandler(evt) {
        if (evt.target.contains(overlayRef.current)) {
            props.toggleAddSpaceWithCodeModal();
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
                <CloseIcon className={classes.cross} onClick={crossClickHandler} />
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