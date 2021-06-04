import React, { useState } from 'react';
import classes from './Modal.module.scss';
import CloseIcon from '@material-ui/icons/Close';
import SelectClient from '../../../Plugins/Selects/SelectClient';
import SelectPriority from '../../../Plugins/Selects/SelectPriority';
import Input from '../../../Plugins/Input/Input';
import Button from '../../../Plugins/Button/Button';
import columnsStore from '../../../Store/columns';
import { Task } from '../../../Other/Classes';

function AddNewTask(props) {
    const [taskHeading, setTaskHeading] = useState('');
    const [taskText, setTaskText] = useState('');
    const [taskComment, setTaskComment] = useState('');
    const [client, setClient] = useState('');
    const [priority, setPriority] = useState('');

    function addClient(client) {
        setClient(client);
    }

    function addPriority(priority) {
        setPriority(priority);
    }

    function addNewTask() {
        const newTask = new Task({ taskHeading, taskText, taskComment, client, priority });
        columnsStore.addTask(props.colId, newTask);
        props.closeModal();
    }

    function crossClickHandler() {
        props.closeModal();
    }

    function keyHandler(evt) {
        if (evt.code === 'Enter') {
            addNewTask();
        }
    }

    return (
        <div className={classes.Container} style={{ width: '500px' }}>
            <CloseIcon className={classes.cross} onClick={crossClickHandler} />
            <h2>Новая задача</h2>
            <div className={classes.form} onKeyDown={keyHandler}>
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
                    <Button cls='primary' onClick={addNewTask} text='Добавить' style={{}} />
                </div>
            </div>
        </div>
    )
}

export default AddNewTask;