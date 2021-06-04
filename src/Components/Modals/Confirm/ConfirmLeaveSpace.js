import React from 'react';
import classes from './Modal.module.scss';
import Button from '../../../Plugins/Button/Button';
import CloseIcon from '@material-ui/icons/Close';
import spacesStore from '../../../Store/spaces';

function ConfirmLeaveSpace(props) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const spaces = spacesStore.spaces.slice();
    const activeSpace = { ...spacesStore.activeSpace };

    function leaveSpace() {
        const currentSpace = spaces[props.clickedSpaceIndex];
        let users = currentSpace.users.slice();
        users = users.filter(item => item.id !== userData.id);
        currentSpace.users = users;
        if (activeSpace.id === currentSpace.id) {
            spacesStore.updateSpacesServerData(spaces, spaces[0]);
            props.setDataFromServer();
        } else {
            spacesStore.updateSpacesServerData(spaces);
        }
        props.closeModal();
    }

    return (
        <div className={classes.Container} style={{ width: '420px' }}>
            <CloseIcon className={classes.cross} onClick={() => props.closeModal()} />
            <h2>Покинуть это пространство?</h2>
            <p>Вы уверены, что хотите покинуть пространство? Вернуться в него может быть затруднительно.</p>
            <div className={classes.buttons}>
                <Button cls='delete' text={'Покинуть'} onClick={leaveSpace}></Button>
                <Button cls='cancel' text={'Отмена'} onClick={() => props.closeModal()}></Button>
            </div>
        </div>
    )
}

export default ConfirmLeaveSpace;