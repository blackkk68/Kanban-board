import React, { useState } from 'react';
import classes from './Archive.module.scss';
import Search from '../../Plugins/Search/Search';
import ArchiveBody from './ArchiveBody/ArchiveBody';
import UpdateArchivedTask from '../Modals/UpdateArchivedTask/UpdateArchivedTask';

function Archive() {
    const [archive, setArchive] = useState(localStorage.getItem('archive') ? JSON.parse(localStorage.getItem('archive')) : []);
    const [searchValue, setSearchValue] = useState('');
    const regexp = new RegExp(`${searchValue}`, 'gi');
    const filteredArchive = archive.filter(item => item.heading.match(regexp));
    const [isUpdateArchivedTaskModalOpen, setIsUpdateArchivedTaskModalOpen] = useState(false);
    const [currentItemId, setCurrentItemId] = useState('');

    function openModal(taskId) {
        setIsUpdateArchivedTaskModalOpen(true);
        setCurrentItemId(taskId);
    }

    function closeModal() {
        setIsUpdateArchivedTaskModalOpen(false);
    }

    function updateArchive(newArchive) {
        setArchive(newArchive);
    }

    function setArchiveSearch(value) {
        setSearchValue(value);
    }

    localStorage.setItem('archive', JSON.stringify(archive));
    return (
        <React.Fragment>
            <section className={classes.Archive}>
                <div className={classes.header}>
                    <h1 className={classes.heading}>Архив</h1>
                    <Search setArchiveSearch={setArchiveSearch} />
                </div>
                <ArchiveBody archive={filteredArchive} openModal={openModal} />
            </section>
            {isUpdateArchivedTaskModalOpen
                ? <UpdateArchivedTask taskId={currentItemId} closeModal={closeModal} updateArchive={updateArchive} />
                : null}
        </React.Fragment>
    )
}

export default Archive;