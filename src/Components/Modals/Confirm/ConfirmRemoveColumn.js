import React from 'react';
import classes from './Modal.module.scss';
import Button from '../../../Plugins/Button/Button';
import CloseIcon from '@material-ui/icons/Close';
import columnsStore from '../../../Store/columns';
import archiveStore from '../../../Store/archive';

function Confirm(props) {
    function removeColumn() {
        const columns = columnsStore.columns.slice();
        const column = columns.find(item => item.id === props.colId);
        const tasks = column.tasks;
        if (tasks) {
            const archive = JSON.parse(localStorage.getItem('archive'));
            const newArchive = archive.concat(tasks);
            archiveStore.updateArchiveServerData(newArchive);
        }
        columnsStore.removeColumn(props.colId);
        props.closeModal();
    }

    return (
        <div className={classes.Container}>
            <CloseIcon className={classes.cross} onClick={() => props.closeModal()} />
            <h2>Удалить этап?</h2>
            <p>Вы уверены, что хотите удалить этап? Все задачи будут помещены в архив.</p>
            <div className={classes.buttons}>
                <Button cls='delete' text={'Удалить'} onClick={removeColumn}></Button>
                <Button cls='cancel' text={'Отмена'} onClick={() => props.closeModal()}></Button>
            </div>
        </div>
    )
}

export default Confirm;