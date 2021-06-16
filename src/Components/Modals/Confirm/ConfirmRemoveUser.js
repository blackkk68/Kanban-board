import React from 'react';
import classes from './Modal.module.scss';
import Button from '../../../Plugins/Button/Button';
import spacesStore from '../../../Store/spaces';

function ConfirmRemoveUser(props) {
    function removeUser() {
        const spaces = spacesStore.spaces.slice();
        const currentSpace = spaces[props.clickedSpaceIndex];
        let users = currentSpace.users.slice();
        users = users.filter(item => item.id !== props.removingUserId);
        currentSpace.users = users;
        spacesStore.updateSpacesServerData(spaces);
        props.closeModal();
    }

    return (
        <div className={classes.Container}>
            <h2>Удалить пользоваетля?</h2>
            <p>Вы уверены, что хотите удалить пользователя? Он потеряет доступ к этому пространству.</p>
            <div className={classes.buttons}>
                <Button cls='delete' text={'Удалить'} onClick={removeUser}></Button>
                <Button cls='cancel' text={'Отмена'} onClick={() => props.closeModal()}></Button>
            </div>
        </div>
    )
}

export default ConfirmRemoveUser;