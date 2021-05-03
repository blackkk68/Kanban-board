import React, { useState, useRef } from 'react';
import classes from './AddNewTask.module.scss';
import SelectClient from '../../../Plugins/SelectClient/SelectClient';
import SelectPrioprity from '../../../Plugins/SelectPriority/SelectPriority';
import Input from '../../../Plugins/Input/Input';
import Textarea from '../../../Plugins/Textarea/Textarea';
import Button from '../../../Plugins/Button/Button';

function AddNewTask(props) {
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

    return (
        <div className={classes.Overlay} onClick={overlayClickHandler} ref={overlayRef}>
            <div className={classes.Modal}>
                <i className={`fa fa-times ${classes.Cross}`} onClick={crossClickHandler}></i>
                <h2>Новая задача</h2>
                <form onSubmit={submitHandler} onKeyDown={keyHandler}>
                    <Input
                        value={taskHeading}
                        onChange={evt => setTaskHeading(evt.target.value)}
                        placeholder='Название'
                        autoFocus={true}
                        required />
                    <Input
                        value={taskText}
                        onChange={evt => setTaskText(evt.target.value)}
                        placeholder='Описание' />
                    <SelectPrioprity addPriority={addPriority} />
                    <SelectClient addClient={addClient} />
                    <Textarea
                        value={taskComment}
                        onChange={evt => setTaskComment(evt.target.value)}
                        placeholder='Комментарий' />
                    <Button cls='primary' type='submit' text='Добавить' />
                </form>
            </div>
        </div>
    )
}

export default AddNewTask;