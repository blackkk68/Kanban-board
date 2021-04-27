import React, { useState, useRef } from 'react';
import classes from './UpdateTaskModal.module.scss';
import SelectClient from '../../../Plugins/SelectClient/SelectClient';
import SelectPrioprity from '../../../Plugins/SelectPriority/SelectPriority';

function UpdateCurrentTask(props) {
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
        props.closeCurrentTaskModal(false);
        props.updateColumns(columns);
    }

    function updateClient(client) {
        setClient(client);
    }

    function updatePriority(priority) {
        setPriority(priority);
    }

    function removeTask() {
        const taskIndex = tasks.findIndex(item => item.id === task.id);
        tasks.splice(taskIndex, 1);
        props.updateColumns(columns);
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
            <div className={classes.Modal}>
                <i className={`fa fa-times ${classes.Cross}`} onClick={() => updateTask()}></i>
                <h2>Задача</h2>
                <form onKeyDown={keyHandler}>
                    <input
                        type='text'
                        id='task-heading'
                        placeholder='Название'
                        value={taskHeading}
                        onChange={evt => setTaskHeading(evt.target.value)}
                        autoFocus={true}
                        required />
                    <input
                        type='text'
                        id='task-text'
                        placeholder='Описание'
                        value={taskText}
                        onChange={evt => setTaskText(evt.target.value)} />
                    <SelectPrioprity currentValue={priority} updatePriority={updatePriority} />
                    <SelectClient currentValue={client} updateClient={updateClient} />
                    <textarea
                        type='text'
                        id='task-comment'
                        placeholder='Комментарий'
                        value={taskComment}
                        onChange={evt => setTaskComment(evt.target.value)} />
                    <div className={classes.Buttons}>
                        <button onClick={() => updateTask()} className={classes.accept}>Принять</button>
                        <button onClick={deleteClickHandler} className={classes.delete}>Удалить</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateCurrentTask;