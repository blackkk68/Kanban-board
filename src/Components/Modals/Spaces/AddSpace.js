import React, { useState } from 'react';
import classes from './Modal.module.scss';
import CloseIcon from '@material-ui/icons/Close';
import Input from '../../../Plugins/Input/Input';
import Button from '../../../Plugins/Button/Button';
import { Space } from '../../../Other/Classes';
import spacesStore from '../../../Store/spaces';
import axios from 'axios';

function AddSpace(props) {
    const spaces = JSON.parse(localStorage.getItem('spaces'));
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [codeValue, setCodeValue] = useState('');
    const [titleValue, setTitleValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [isAddNewSpaceActive, setIsAddNewSpaceActive] = useState(true);
    const [isErrorMessageShown, setIsErrorMessageShown] = useState(false);

    function crossClickHandler() {
        props.closeModal();
    }

    function switchModal() {
        setIsAddNewSpaceActive(!isAddNewSpaceActive);
    }

    async function addSpaceWithCode() {
        const tokenData = JSON.parse(localStorage.getItem('tokenData'));
        const userSpacesData = await axios.get(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/users/${userData.id}/spaces.json?auth=${tokenData.token}`);
        const userSpaces = userSpacesData.data.map(item => item.id);
        if (userSpaces.find(item => item === codeValue)) {
            setIsErrorMessageShown(true);
        } else {
            const newSpaceData = await axios.get(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/spaces/${codeValue}/spaceData.json?auth=${tokenData.token}`);
            const newSpace = newSpaceData.data;
            newSpace.users.push({ name: userData.name, surname: userData.surname, id: userData.id });
            spaces.push(newSpace);
            spacesStore.updateSpacesServerData(spaces);
            props.closeModal();
        }
    }

    function addNewSpace() {
        const newSpace = new Space(titleValue, descriptionValue, userData, userData.id);
        spaces.push(newSpace);
        spacesStore.updateSpacesServerData(spaces);
        props.closeModal();
    }

    function keyHandler(evt) {
        if (evt.code === 'Enter') {
        }
    }

    return (
        <React.Fragment>
            <div className={classes.Container}>
                <CloseIcon className={classes.cross} onClick={crossClickHandler} />
                <div className={`${classes.modalContent} ${isAddNewSpaceActive ? classes.open : null}`}>
                    <h2>Новое пространство</h2>
                    <div className={classes.form} onKeyDown={keyHandler}>
                        <Input
                            value={titleValue}
                            onChange={evt => setTitleValue(evt.target.value)}
                            label='Название'
                            autoFocus={true}
                            required />
                        <Input
                            isBig={true}
                            value={descriptionValue}
                            onChange={evt => setDescriptionValue(evt.target.value)}
                            label='Описание' />
                        <div className={classes.buttons}>
                            <Button cls='primary' onClick={addNewSpace} text='Добавить' />
                            <Button cls='cancel' onClick={switchModal} text='По коду' />
                        </div>
                    </div>
                </div>
                <div className={`${classes.modalContent} ${isAddNewSpaceActive ? null : classes.open}`}>
                    <h2>Добавить по коду</h2>
                    <div className={classes.form} onKeyDown={keyHandler}>
                        <Input
                            value={codeValue}
                            onChange={evt => setCodeValue(evt.target.value)}
                            label='Код'
                            autoFocus={true}
                            required />
                        <p className={`${classes.errorMessage} ${isErrorMessageShown ? classes.show : null}`}>Вы уже имеете доступ к данному пространству</p>
                        <div className={classes.buttons}>
                            <Button cls='primary' onClick={addSpaceWithCode} text='Добавить' />
                            <Button cls='cancel' onClick={switchModal} text='Назад' />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AddSpace;