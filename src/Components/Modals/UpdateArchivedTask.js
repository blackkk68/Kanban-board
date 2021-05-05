import React, { useRef } from 'react';
import classes from './Modal.module.scss';
import SelectClient from '../../Plugins/SelectClient/SelectClient';
import SelectPrioprity from '../../Plugins/SelectPriority/SelectPriority';
import Input from '../../Plugins/Input/Input';
import Textarea from '../../Plugins/Textarea/Textarea';
import Button from '../../Plugins/Button/Button';

function UpdateArchiveTask(props) {
    const archive = JSON.parse(localStorage.getItem('archive'));
    const columns = JSON.parse(localStorage.getItem('columns'));
    const task = archive.find(item => item.id === props.taskId);
    const column = columns.find(item => item.id === task.columnId);
    const taskHeading = task.heading;
    const taskText = task.text;
    const taskComment = task.comment;
    const client = task.client;
    const priority = task.priority;
    const overlayRef = useRef(null);

    function removeTask() {
        const taskIndex = archive.findIndex(item => item.id === props.taskId);
        archive.splice(taskIndex, 1);
        props.updateArchive(archive);
        localStorage.setItem('archive', JSON.stringify(archive));
    }

    function overlayClickHandler(evt) {
        if (evt.target.contains(overlayRef.current)) {
            props.closeModal();
        }
    }

    function deleteHandler() {
        removeTask();
        props.closeModal();
    }

    function submitHandler(evt) {
        evt.preventDefault();
    }

    function restoreHandler() {
        if (!column.tasks) {
            column.tasks = [];
        }
        column.tasks.push(task);
        props.updateColumns(columns);
        deleteHandler();
    }

    return (
        <div className={classes.Overlay} onClick={overlayClickHandler} ref={overlayRef}>
            <div className={classes.Modal}>
                <i className={`fa fa-times ${classes.cross}`} onClick={() => props.closeModal()}></i>
                <h2>Задача</h2>
                <form onSubmit={submitHandler}>
                    <Input
                        placeholder='Название'
                        value={taskHeading}
                        readOnly />
                    <Input
                        placeholder='Описание'
                        value={taskText}
                        readOnly />
                    <SelectPrioprity currentValue={priority} disabled={true} />
                    <SelectClient currentValue={client} disabled={true} />
                    <Textarea
                        placeholder='Комментарий'
                        value={taskComment}
                        readOnly />
                    <div className={classes.buttons}>
                        <Button cls='primary' onClick={restoreHandler} className={classes.accept} text='Восстановить' />
                        <Button cls='delete' onClick={deleteHandler} className={classes.delete} text='Удалить' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateArchiveTask;