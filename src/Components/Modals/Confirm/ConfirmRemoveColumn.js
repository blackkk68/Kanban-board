import React, { useRef } from 'react';
import classes from './Modal.module.scss';
import Button from '../../../Plugins/Button/Button';
import CloseIcon from '@material-ui/icons/Close';
import columnsStore from '../../../Store/columns';
import archiveStore from '../../../Store/archive';

function Confirm(props) {
    const overlayRef = useRef(null);

    function overlayClickHandler(evt) {
        if (evt.target.contains(overlayRef.current)) {
            props.closeModal();
        }
    }

    function removeColumn() {
        const columns = JSON.parse(localStorage.getItem('columns'));
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
        <div className={classes.Overlay} onClick={overlayClickHandler} ref={overlayRef}>
            <div className={classes.Modal} style={{ width: '420px' }}>
                <CloseIcon className={classes.cross} onClick={() => props.closeModal()} />
                <h2>Удалить этап?</h2>
                <p>Вы уверены, что хотите удалить этап? Все задачи будут помещены в архив.</p>
                <div className={classes.buttons}>
                    <Button cls='delete' text={'Удалить'} onClick={removeColumn}></Button>
                    <Button cls='cancel' text={'Отмена'} onClick={() => props.closeModal()}></Button>
                </div>
            </div>
        </div>
    )
}

export default Confirm;