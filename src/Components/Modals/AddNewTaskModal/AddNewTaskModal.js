import React, { useState, useRef } from 'react';
import classes from './AddNewTaskModal.module.scss';
import SelectClient from '../../../Plugins/SelectClient/SelectClient';
import SelectPrioprity from '../../../Plugins/SelectPriority/SelectPriority';

function AddNewTaskModal(props) {
    const [taskHeading, setTaskHeading] = useState('');
    const [taskText, setTaskText] = useState('');
    const [taskComment, setTaskComment] = useState('');
    const [client, setClient] = useState('');
    const [priority, setPriority] = useState('');
    const overlayRef = useRef(null);

    function submitHandler(evt) {
        evt.preventDefault();
        addNewTask();
    }

    function resetStates() {
        setTaskHeading('');
        setTaskText('');
        setTaskComment('');
        setClient('');
        setPriority('');
    }

    function addClient(client) {
        setClient(client);
    }

    function addPriority(priority) {
        setPriority(priority);
    }

    class Task {
        constructor(options) {
            this.heading = options.taskHeading;
            this.text = options.taskText;
            this.comment = options.taskComment;
            this.id = new Date().getTime();
            this.client = options.client;
            this.priority = options.priority;
        }
    }

    function addNewTask() {
        if (taskHeading) {
            const columns = JSON.parse(localStorage.getItem('columns'));
            const colIndex = columns.findIndex(item => item.id === props.colId);
            const tasks = columns[colIndex].tasks;
            const newTask = new Task({ taskHeading, taskText, taskComment, client, priority });
            tasks.push(newTask);
            props.updateColumns(columns);
            props.closeAddNewTaskModal(false);
            resetStates();
        }
    }

    function crossClickHandler() {
        props.closeAddNewTaskModal(false);
        resetStates();
    }

    function overlayClickHandler(evt) {
        if (evt.target.contains(overlayRef.current)) {
            props.closeAddNewTaskModal(false);
            resetStates();
        }
    }

    function keyHandler(evt) {
        if (evt.code === 'Enter') {
            addNewTask();
        }
    }

    const modal = <div className={classes.Overlay} onClick={overlayClickHandler} ref={overlayRef}>
        <div className={classes.Modal}>
            <i className={`fa fa-times ${classes.Cross}`} onClick={crossClickHandler}></i>
            <h2>Новая задача</h2>
            <form onSubmit={submitHandler} onKeyDown={keyHandler}>
                <input
                    type='text'
                    value={taskHeading}
                    onChange={evt => setTaskHeading(evt.target.value)}
                    placeholder='Название'
                    autoFocus={true}
                    required />
                <input
                    type='text'
                    value={taskText}
                    onChange={evt => setTaskText(evt.target.value)}
                    placeholder='Описание' />
                <SelectPrioprity addPriority={addPriority} />
                <SelectClient addClient={addClient} />
                <textarea
                    type='text'
                    value={taskComment}
                    onChange={evt => setTaskComment(evt.target.value)}
                    placeholder='Комментарий' />
                <button type='submit'>Добавить</button>
            </form>
        </div>
    </div>;

    return props.isOpen ? modal : null;
}

export default AddNewTaskModal;