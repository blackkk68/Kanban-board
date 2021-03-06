import React from 'react';
import classes from './Modal.module.scss';
import Button from '../../../Plugins/Button/Button';
import spacesStore from '../../../Store/spaces';

function ConfirmRemoveSpace(props) {
    const spaces = spacesStore.spaces.slice();
    const activeSpace = { ...spacesStore.activeSpace };

    function removeSpace() {
        const currentSpace = spaces.splice(props.clickedSpaceIndex, 1);
        if (activeSpace.id === currentSpace.id) {
            spacesStore.updateSpacesServerData(spaces, spaces[0]);
            props.setDataFromServer();
        } else {
            spacesStore.updateSpacesServerData(spaces);
        }
        spacesStore.deleteSpace(currentSpace.id);
        props.closeModal();
    }

    return (
        <div className={classes.Container}>
            <h2>Удалить это пространство?</h2>
            <p>Вы уверены, что хотите удалить пространство? Все данные, содержащиеся в нем, будут потеряны.</p>
            <div className={classes.buttons}>
                <Button cls='delete' text='Удалить' onClick={removeSpace}></Button>
                <Button cls='cancel' text='Отмена' onClick={() => props.closeModal()}></Button>
            </div>
        </div>
    )
}

export default ConfirmRemoveSpace;