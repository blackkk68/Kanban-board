import React from 'react';
import classes from './Modal.module.scss';
import CloseIcon from '@material-ui/icons/Close';
import SelectClient from '../../../Plugins/Selects/SelectClient';
import SelectPriority from '../../../Plugins/Selects/SelectPriority';
import Input from '../../../Plugins/Input/Input';
import Button from '../../../Plugins/Button/Button';
import columnsStore from '../../../Store/columns';
import archiveStore from '../../../Store/archive';

function UpdateArchiveTask(props) {
    const archive = JSON.parse(localStorage.getItem('archive'));
    const columns = JSON.parse(localStorage.getItem('columns'));
    const task = archive.find(item => item.id === props.taskId);
    const column = columns.find(item => item.id === task.columnId) || columns[0];
    const taskHeading = task.heading;
    const taskText = task.text;
    const taskComment = task.comment;
    const client = task.client;
    const priority = task.priority;

    function removeTask() {
        const taskIndex = archive.findIndex(item => item.id === props.taskId);
        archive.splice(taskIndex, 1);
        archiveStore.updateArchiveServerData(archive);
    }

    function deleteHandler() {
        removeTask();
        props.closeModal();
    }

    function restoreTask() {
        if (!column.tasks) {
            column.tasks = [];
        }
        column.tasks.push(task);
        columnsStore.updateColumnsServerData(columns);
    }

    function restoreHandler() {
        restoreTask();
        removeTask();
        props.closeModal();
    }

    return (
        <div className={classes.Container}>
            <CloseIcon className={classes.cross} onClick={() => props.closeModal()} />
            <h2>Задача</h2>
            <div className={classes.form}>
                <Input
                    label='Название'
                    value={taskHeading}
                    readOnly />
                <Input
                    label='Описание'
                    value={taskText}
                    readOnly />
                <SelectPriority currentValue={priority} disabled={true} />
                <SelectClient currentValue={client} disabled={true} />
                <Input
                    isBig={true}
                    label='Комментарий'
                    value={taskComment}
                    readOnly />
                <div className={classes.buttons}>
                    <Button cls='primary' onClick={restoreHandler} className={classes.accept} text='Восстановить' />
                    <Button cls='delete' onClick={deleteHandler} className={classes.delete} text='Удалить' />
                </div>
            </div>
        </div>
    )
}

export default UpdateArchiveTask;