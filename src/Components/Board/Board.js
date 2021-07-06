import React, { useState } from 'react';
import classes from './Board.module.scss';
import BoardBody from './BoardBody/BoardBody';
import AddNewColumn from '../Modals/ModalsWithForm/AddNewColumn';
import AddNewTask from '../Modals/ModalsWithForm/AddNewTask';
import UpdateTask from '../Modals/ModalsWithForm/UpdateTask';
import Confirm from '../Modals/TextModal/ConfirmRemoveColumn';
import Modal from '../../HOC/Modal/Modal';
import SectionHeader from '../../HOC/SectionHeader/SectionHeader';

function Board() {
    const [isAddNewColumnsModalOpen, setIsAddNewColumnsModalOpen] = useState(false);
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

    function openAddNewColumnsModal() {
        setIsAddNewColumnsModalOpen(true);
    }

    function closeAddNewColumnsModal() {
        setIsAddNewColumnsModalOpen(false);
    }

    return (
        <section className={classes.Board}>
            <SectionHeader heading='Доска задач' setSearchValue={setColumnsSearch} plusHandler={openAddNewColumnsModal} />
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
            <Modal isModalOpen={isAddNewColumnsModalOpen} closeModal={closeAddNewColumnsModal}>
                <AddNewColumn closeModal={closeAddNewColumnsModal} />
            </Modal>
        </section>
    )
}

export default Board;