import React, { useState, useRef } from 'react';
import classes from './Modal.module.scss';
import CloseIcon from '@material-ui/icons/Close';
import Input from '../../Plugins/Input/Input';
import Button from '../../Plugins/Button/Button';
import { Space } from '../../Other/Classes';
import spacesStore from '../../Store/spaces';

function AddNewTask(props) {
    const spaces = JSON.parse(localStorage.getItem('spaces'));
    const userData = JSON.parse(localStorage.getItem('userData'));
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
        props.toggleAddNewSpaceModal();
        resetStates();
    }

    function addSpace() {
        const newSpace = new Space(titleValue, descriptionValue, userData, userData.id);
        spaces.push(newSpace);
        spacesStore.updateSpacesServerData(spaces);
        props.toggleAddNewSpaceModal();
        resetStates();
    }

    function overlayClickHandler(evt) {
        if (evt.target.contains(overlayRef.current)) {
            props.toggleAddNewSpaceModal();
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
                <CloseIcon className={classes.cross} onClick={crossClickHandler} />
                <h2>Новое пространство</h2>
                <form onSubmit={submitHandler} onKeyDown={keyHandler}>
                    <Input
                        value={titleValue}
                        onChange={evt => setTitleValue(evt.target.value)}
                        label='Название'
                        autoFocus={true}
                        required />
                    <Input
                        style={{ height: '56px' }}
                        value={descriptionValue}
                        onChange={evt => setDescriptionValue(evt.target.value)}
                        label='Описание' />
                    <div className={classes.buttons}>
                        <Button cls='primary' type='submit' text='Добавить' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddNewTask;