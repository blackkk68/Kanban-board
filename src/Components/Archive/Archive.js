import React, { useState } from 'react';
import classes from './Archive.module.scss';
import ArchiveBody from './ArchiveBody/ArchiveBody';
import UpdateArchivedTask from '../Modals/ModalsWithForm/UpdateArchivedTask';
import Modal from '../../HOC/Modal/Modal';
import SectionHeader from '../../HOC/SectionHeader/SectionHeader';

function Archive() {
    const [searchValue, setSearchValue] = useState('');
    const [isUpdateArchivedTaskModalOpen, setIsUpdateArchivedTaskModalOpen] = useState(false);
    const [currentItemId, setCurrentItemId] = useState('');

    function openModal(taskId) {
        setIsUpdateArchivedTaskModalOpen(true);
        setCurrentItemId(taskId);
    }

    function closeModal() {
        setIsUpdateArchivedTaskModalOpen(false);
    }

    function setArchiveSearch(value) {
        setSearchValue(value);
    }

    return (
        <React.Fragment>
            <section className={classes.Archive}>
                <SectionHeader heading='Архив' setSearchValue={setArchiveSearch} />
                <ArchiveBody searchValue={searchValue} openModal={openModal} />
            </section>
            <Modal isModalOpen={isUpdateArchivedTaskModalOpen} closeModal={closeModal}>
                <UpdateArchivedTask taskId={currentItemId} closeModal={closeModal} />
            </Modal>
        </React.Fragment>
    )
}

export default Archive;