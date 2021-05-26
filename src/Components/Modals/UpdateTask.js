import React, { useState, useRef } from 'react';
import classes from './Modal.module.scss';
import CloseIcon from '@material-ui/icons/Close';
import SelectClient from '../../Plugins/Selects/SelectClient';
import SelectPriority from '../../Plugins/Selects/SelectPriority';
import Input from '../../Plugins/Input/Input';
import Button from '../../Plugins/Button/Button';
import columnsStore from '../../Store/columns';
import archiveStore from '../../Store/archive';

function UpdateTask(props) {
    const archive = JSON.parse(localStorage.getItem('archive')) || [];
    const columns = JSON.parse(localStorage.getItem('columns'));
    const column = columns.find(item => item.id === props.colId);
    const tasks = column.tasks;
    const task = tasks.find(item => item.id === props.taskId);
    const [taskHeading, setTaskHeading] = useState(task.heading);
    const [taskText, setTaskText] = useState(task.text);
    const [taskComment, setTaskComment] = useState(task.comment);
    const [client, setClient] = useState(task.client);
    const [priority, setPriority] = useState(task.priority);
    const overlayRef = useRef(null);

    function updateTask() {
        task.heading = taskHeading;
        task.text = taskText;
        task.comment = taskComment;
        task.client = client;
        task.priority = priority;
        columnsStore.updateColumnsServerData(columns);
        props.closeCurrentTaskModal(false);
    }

    function updateClient(client) {
        setClient(client);
    }

    function updatePriority(priority) {
        setPriority(priority);
    }

    function removeTask() {
        const taskIndex = tasks.findIndex(item => item.id === task.id);
        const archiveItem = tasks.splice(taskIndex, 1)[0];
        archiveItem.columnId = props.colId;
        archive.push(archiveItem);
        archiveStore.updateArchiveServerData(archive);
        columnsStore.updateColumnsServerData(columns);
    }

    function overlayClickHandler(evt) {
        if (evt.target.contains(overlayRef.current)) {
            updateTask();
        }
    }

    function deleteClickHandler() {
        props.closeCurrentTaskModal(false);
        removeTask();
    }

    function keyHandler(evt) {
        if (evt.code === 'Enter') {
            updateTask();
        }
    }

    return (
        <div className={classes.Overlay} onClick={overlayClickHandler} ref={overlayRef}>
            <div className={classes.Modal} style={{ width: '500px' }}>
                <CloseIcon className={classes.cross} onClick={() => updateTask()} />
                <h2>Задача</h2>
                <form onKeyDown={keyHandler}>
                    <Input
                        label='Название'
                        value={taskHeading}
                        onChange={evt => setTaskHeading(evt.target.value)}
                        autoFocus={true}
                        required />
                    <Input
                        label='Описание'
                        value={taskText}
                        onChange={evt => setTaskText(evt.target.value)} />
                    <SelectPriority currentValue={priority} updatePriority={updatePriority} />
                    <SelectClient currentValue={client} updateClient={updateClient} />
                    <Input
                        style={{ height: '56px' }}
                        label='Комментарий'
                        value={taskComment}
                        onChange={evt => setTaskComment(evt.target.value)} />
                    <div className={classes.buttons}>
                        <Button cls='primary' onClick={() => updateTask()} className={classes.accept} text='Сохранить' />
                        <Button cls='delete' onClick={deleteClickHandler} className={classes.delete} text='Удалить' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateTask;