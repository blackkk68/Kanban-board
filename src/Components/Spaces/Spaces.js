import React, { useState, useEffect } from 'react'
import classes from './Spaces.module.scss';
import SpacesBody from './SpacesBody/SpacesBody';
import AddNewSpace from '../Modals/AddNewSpace';
import AddSpaceWithCode from '../Modals/AddSpaceWithCode';
import Plus from '../../Plugins/Plus/Plus';
import ConfirmLeaveSpace from '../Modals/Confirm/ConfirmLeaveSpace';
import ConfirmRemoveUser from '../Modals/Confirm/ConfirmRemoveUser';
import ConfirmRemoveSpace from '../Modals/Confirm/ConfirmRemoveSpace';

function Spaces(props) {
    const [isConfirmLeaveSpaceModalOpen, setIsConfirmLeaveSpaceModalOpen] = useState(false);
    const [isConfirmRemoveUserModalOpen, setIsConfirmRemoveUserModalOpen] = useState(false);
    const [isConfirmRemoveSpaceModalOpen, setIsConfirmRemoveSpaceModalOpen] = useState(false);
    const [isAddNewSpaceModalOpen, setIsAddNewSpaceModalOpen] = useState(false);
    const [isAddSpaceWithCodeOpen, setIsAddSpaceWithCodeOpen] = useState(false);
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
    const [clickedSpaceIndex, setClickedSpaceIndex] = useState(null);
    const [removingUserId, setRemovingUserId] = useState(null);

    useEffect(() => {
        function closeContextMenu() {
            setIsContextMenuOpen(false)
        }
        if (isContextMenuOpen) {
            document.addEventListener('click', closeContextMenu);
        }
        return () => {
            document.removeEventListener('click', closeContextMenu);
        }
    }, [isContextMenuOpen]);

    function toggleContextMenu() {
        isContextMenuOpen ? setIsContextMenuOpen(false) : setIsContextMenuOpen(true);
    }

    function toggleAddNewSpaceModal() {
        isAddNewSpaceModalOpen ? setIsAddNewSpaceModalOpen(false) : setIsAddNewSpaceModalOpen(true);
    }

    function toggleAddSpaceWithCodeModal() {
        isAddSpaceWithCodeOpen ? setIsAddSpaceWithCodeOpen(false) : setIsAddSpaceWithCodeOpen(true);
    }

    function toggleConfirmLeaveSpaceModal(spaceIndex) {
        isConfirmLeaveSpaceModalOpen ? setIsConfirmLeaveSpaceModalOpen(false) : setIsConfirmLeaveSpaceModalOpen(true);
        setClickedSpaceIndex(spaceIndex);
    }

    function toggleConfirmRemoveSpaceModal(spaceIndex) {
        isConfirmRemoveSpaceModalOpen ? setIsConfirmRemoveSpaceModalOpen(false) : setIsConfirmRemoveSpaceModalOpen(true);
        setClickedSpaceIndex(spaceIndex);
    }

    function toggleConfirmRemoveUserModal(userId, spaceIndex) {
        setRemovingUserId(userId);
        setClickedSpaceIndex(spaceIndex);
        isConfirmRemoveUserModalOpen ? setIsConfirmRemoveUserModalOpen(false) : setIsConfirmRemoveUserModalOpen(true);
    }

    function addNewSpace() {
        toggleAddNewSpaceModal();
        toggleContextMenu();
    }

    function addSpaceWithCode() {
        toggleAddSpaceWithCodeModal();
        toggleContextMenu();
    }

    return (
        <React.Fragment>
            <section className={classes.Spaces}>
                <div className={classes.header}>
                    <h1 className={classes.heading}>Пространства</h1>
                    <div className={classes.buttons}>
                        <Plus onClick={toggleContextMenu} />
                    </div>
                    {isContextMenuOpen
                        ? <div className={classes.contextMenu}>
                            <ul>
                                <li onClick={addNewSpace}>Добавить новое</li>
                                <li onClick={addSpaceWithCode}>Добавить по коду</li>
                            </ul>
                        </div>
                        : null}
                </div>
                <SpacesBody
                    setDataFromServer={props.setDataFromServer}
                    toggleConfirmLeaveSpaceModal={toggleConfirmLeaveSpaceModal}
                    toggleConfirmRemoveSpaceModal={toggleConfirmRemoveSpaceModal}
                    toggleConfirmRemoveUserModal={toggleConfirmRemoveUserModal} />
            </section>
            {isAddNewSpaceModalOpen
                ? <AddNewSpace toggleAddNewSpaceModal={toggleAddNewSpaceModal} />
                : null}
            {isAddSpaceWithCodeOpen
                ? <AddSpaceWithCode toggleAddSpaceWithCodeModal={toggleAddSpaceWithCodeModal} />
                : null}
            {isConfirmLeaveSpaceModalOpen
                ? <ConfirmLeaveSpace setDataFromServer={props.setDataFromServer} clickedSpaceIndex={clickedSpaceIndex} closeModal={toggleConfirmLeaveSpaceModal} />
                : null}
            {isConfirmRemoveUserModalOpen
                ? <ConfirmRemoveUser clickedSpaceIndex={clickedSpaceIndex} removingUserId={removingUserId} closeModal={toggleConfirmRemoveUserModal} />
                : null}
            {isConfirmRemoveSpaceModalOpen
                ? <ConfirmRemoveSpace setDataFromServer={props.setDataFromServer} clickedSpaceIndex={clickedSpaceIndex} closeModal={toggleConfirmRemoveSpaceModal} />
                : null}
        </React.Fragment>
    )
}

export default Spaces;