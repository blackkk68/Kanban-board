import React, { useState, useRef } from 'react';
import classes from './Modal.module.scss';
import CloseIcon from '@material-ui/icons/Close';
import SelectClient from '../../../Plugins/Selects/SelectClient';
import SelectPriority from '../../../Plugins/Selects/SelectPriority';
import Input from '../../../Plugins/Input/Input';
import Button from '../../../Plugins/Button/Button';
import columnsStore from '../../../Store/columns';
import archiveStore from '../../../Store/archive';

function UpdateTask(props) {
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
        props.closeModal();
    }

    function updateClient(client) {
        setClient(client);
    }

    function updatePriority(priority) {
        setPriority(priority);
    }

    function removeTask() {
        archiveStore.addItem(task);
        columnsStore.removeTask(props.colId, props.taskId);
        props.closeModal();
    }

    function overlayClickHandler(evt) {
        if (evt.target.contains(overlayRef.current)) {
            updateTask();
        }
    }

    function keyHandler(evt) {
        if (evt.code === 'Enter') {
            updateTask();
        }
    }

    return (
        <div className={classes.Container}>
            <CloseIcon className={classes.cross} onClick={() => updateTask()} />
            <h2>Задача</h2>
            <div className={classes.form} onKeyDown={keyHandler}>
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
                    <Button cls='primary' onClick={updateTask} className={classes.accept} text='Сохранить' />
                    <Button cls='delete' onClick={removeTask} className={classes.delete} text='Удалить' />
                </div>
            </div>
        </div>
    )
}

export default UpdateTask;