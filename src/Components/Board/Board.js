import React, { useState } from 'react';
import classes from './Board.module.scss';
import BoardBody from './BoardBody/BoardBody';
import AddNewColumn from './AddNewColumn/AddNewColumn';
import Search from '../../Plugins/Search/Search';
import AddNewTask from '../Modals/AddNewTask';
import UpdateTask from '../Modals/UpdateTask';
import Confirm from '../Modals/Confirm';

function Board(props) {
    const [isAddNewTaskModalOpen, setIsAddNewTaskModalOpen] = useState(false);
    const [isCurrentTaskModalOpen, setIsCurrentTaskModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [currentColumnId, setCurrentColumnId] = useState('');
    const [currentTaskId, setCurrentTaskId] = useState('');
    const [searchValue, setSearchValue] = useState('');

    function setColumnsSearch(value) {
        setSearchValue(value);
    }

    function openAddNewTaskModal(colId) {
        setIsAddNewTaskModalOpen(true);
        setCurrentColumnId(colId);
    }

    function closeAddNewTaskModal(bool) {
        setIsAddNewTaskModalOpen(bool);
    }

    function openCurrentTaskModal(colId, taskId) {
        setIsCurrentTaskModalOpen(true);
        setCurrentColumnId(colId);
        setCurrentTaskId(taskId)
    }

    function closeCurrentTaskModal() {
        setIsCurrentTaskModalOpen(false);
    }

    function openConfirmModal(colId) {
        setCurrentColumnId(colId);
        setIsConfirmModalOpen(true);
    }

    function closeConfirmModal() {
        setIsConfirmModalOpen(false);
    }

    return (
        <section className={classes.Board}>
            <div className={classes.header}>
                <h1 className={classes.heading}>Доска задач</h1>
                <div className={classes.buttons}>
                    <Search setColumnsSearch={setColumnsSearch} />
                    <AddNewColumn updateColumns={props.updateColumns} />
                </div>
            </div>
            <BoardBody
                searchValue={searchValue}
                columns={props.columns}
                updateColumns={props.updateColumns}
                openAddNewTaskModal={openAddNewTaskModal}
                openCurrentTaskModal={openCurrentTaskModal}
                openConfirmModal={openConfirmModal} />
            {isAddNewTaskModalOpen
                ? <AddNewTask
                    colId={currentColumnId}
                    closeAddNewTaskModal={closeAddNewTaskModal}
                    updateColumns={props.updateColumns} />
                : null}
            {isCurrentTaskModalOpen
                ? <UpdateTask
                    updateColumns={props.updateColumns}
                    closeCurrentTaskModal={closeCurrentTaskModal}
                    colId={currentColumnId}
                    taskId={currentTaskId}
                    updateArchive={props.updateArchive} />
                : null}
            {isConfirmModalOpen
                ? <Confirm
                    closeModal={closeConfirmModal}
                    colId={currentColumnId}
                    updateColumns={props.updateColumns} />
                : null}
        </section>
    )
}

export default Board;