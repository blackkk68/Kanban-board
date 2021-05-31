import React, { useState, useRef } from 'react';
import classes from './Modal.module.scss';
import CloseIcon from '@material-ui/icons/Close';
import SelectClient from '../../Plugins/Selects/SelectClient';
import SelectPriority from '../../Plugins/Selects/SelectPriority';
import Input from '../../Plugins/Input/Input';
import Button from '../../Plugins/Button/Button';
import columnsStore from '../../Store/columns';
import { Task } from '../../Other/Classes';

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

    function addNewTask() {
        const newTask = new Task({ taskHeading, taskText, taskComment, client, priority });
        columnsStore.addTask(props.colId, newTask);
        resetStates();
        props.closeAddNewTaskModal(false);
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
            <div className={classes.Modal} style={{ width: '500px' }}>
                <CloseIcon className={classes.cross} onClick={crossClickHandler} />
                <h2>Новая задача</h2>
                <form onSubmit={submitHandler} onKeyDown={keyHandler}>
                    <Input
                        value={taskHeading}
                        onChange={evt => setTaskHeading(evt.target.value)}
                        label='Название'
                        autoFocus={true}
                        maxLength={50}
                        required />
                    <Input
                        value={taskText}
                        onChange={evt => setTaskText(evt.target.value)}
                        label='Описание' />
                    <SelectPriority addPriority={addPriority} />
                    <SelectClient addClient={addClient} />
                    <Input
                        style={{ height: '56px' }}
                        value={taskComment}
                        onChange={evt => setTaskComment(evt.target.value)}
                        label='Комментарий' />
                    <div className={classes.buttons}>
                        <Button cls='primary' type='submit' text='Добавить' style={{}} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddNewTask;