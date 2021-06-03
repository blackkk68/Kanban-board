import React, { useState } from 'react';
import classes from './Board.module.scss';
import BoardBody from './BoardBody/BoardBody';
import AddNewColumn from './AddNewColumn/AddNewColumn';
import Search from '../../Plugins/Search/Search';
import AddNewTask from '../Modals/Tasks/AddNewTask';
import UpdateTask from '../Modals/Tasks/UpdateTask';
import Confirm from '../Modals/Confirm/ConfirmRemoveColumn';
import Modal from '../../HOC/Modal/Modal';

function Board() {
    const [isAddNewTaskModalOpen, setIsAddNewTaskModalOpen] = useState(false);
    const [isUpdateTaskModalOpen, setIsUpdateTaskModalOpen] = useState(false);
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

    function closeAddNewTaskModal() {
        setIsAddNewTaskModalOpen(false);
    }

    function openUpdateTaskModal(colId, taskId) {
        setIsUpdateTaskModalOpen(true);
        setCurrentColumnId(colId);
        setCurrentTaskId(taskId);
    }

    function closeUpdateTaskModal() {
        setIsUpdateTaskModalOpen(false);
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
                    <AddNewColumn />
                </div>
            </div>
            <BoardBody
                searchValue={searchValue}
                openAddNewTaskModal={openAddNewTaskModal}
                openUpdateTaskModal={openUpdateTaskModal}
                openConfirmModal={openConfirmModal} />
            <Modal isModalOpen={isConfirmModalOpen} closeModal={closeConfirmModal}>
                <Confirm closeModal={closeConfirmModal} colId={currentColumnId} />
            </Modal>
            <Modal isModalOpen={isAddNewTaskModalOpen} closeModal={closeAddNewTaskModal}>
                <AddNewTask closeModal={closeAddNewTaskModal} colId={currentColumnId} />
            </Modal>
            <Modal isModalOpen={isUpdateTaskModalOpen} closeModal={closeUpdateTaskModal}>
                <UpdateTask closeModal={closeUpdateTaskModal} colId={currentColumnId} taskId={currentTaskId} />
            </Modal>
        </section>
    )
}

export default Board;