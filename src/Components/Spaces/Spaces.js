import React, { useState } from 'react'
import classes from './Spaces.module.scss';
import SpacesBody from './SpacesBody/SpacesBody';
import AddNewSpace from '../Modals/Spaces/AddNewSpace';
import AddSpaceWithCode from '../Modals/Spaces/AddSpaceWithCode';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ConfirmLeaveSpace from '../Modals/Confirm/ConfirmLeaveSpace';
import ConfirmRemoveUser from '../Modals/Confirm/ConfirmRemoveUser';
import ConfirmRemoveSpace from '../Modals/Confirm/ConfirmRemoveSpace';
import AddNewUser from '../Modals/Spaces/AddNewUser';
import ContextMenu from '../../HOC/ContextMenu/ContextMenu';
import Modal from '../../HOC/Modal/Modal';

function Spaces(props) {
    const [isConfirmLeaveSpaceModalOpen, setIsConfirmLeaveSpaceModalOpen] = useState(false);
    const [isConfirmRemoveUserModalOpen, setIsConfirmRemoveUserModalOpen] = useState(false);
    const [isConfirmRemoveSpaceModalOpen, setIsConfirmRemoveSpaceModalOpen] = useState(false);
    const [isAddNewSpaceModalOpen, setIsAddNewSpaceModalOpen] = useState(false);
    const [isAddSpaceWithCodeOpen, setIsAddSpaceWithCodeOpen] = useState(false);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
    const [clickedSpaceIndex, setClickedSpaceIndex] = useState(null);
    const [removingUserId, setRemovingUserId] = useState(null);
    const [currentSpace, setCurrentSpace] = useState(null);

    function closeContextMenu() {
        if (isContextMenuOpen) {
            setIsContextMenuOpen(false);
        }
    }

    function openContextMenu() {
        if (!isContextMenuOpen) {
            setIsContextMenuOpen(true);
        }
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

    function toggleAddUserModal(currentSpace) {
        setIsAddUserModalOpen(!isAddUserModalOpen);
        if (currentSpace) {
            setCurrentSpace(currentSpace);
        }
    }

    function addNewSpace() {
        toggleAddNewSpaceModal();
        closeContextMenu();
    }

    function addSpaceWithCode() {
        toggleAddSpaceWithCodeModal();
        closeContextMenu();
    }

    return (
        <React.Fragment>
            <section className={classes.Spaces}>
                <div className={classes.header}>
                    <h1 className={classes.heading}>Пространства</h1>
                    <div className={classes.buttons}>
                        <AddCircleOutlineIcon className={classes.plus} onClick={openContextMenu} />
                    </div>
                    <ContextMenu isContextMenuOpen={isContextMenuOpen} closeContextMenu={closeContextMenu}>
                        <ul className={classes.contextMenu}>
                            <li onClick={addNewSpace}>Добавить новое</li>
                            <li onClick={addSpaceWithCode}>Добавить по коду</li>
                        </ul>
                    </ContextMenu>
                </div>
                <SpacesBody
                    setDataFromServer={props.setDataFromServer}
                    toggleConfirmLeaveSpaceModal={toggleConfirmLeaveSpaceModal}
                    toggleConfirmRemoveSpaceModal={toggleConfirmRemoveSpaceModal}
                    toggleConfirmRemoveUserModal={toggleConfirmRemoveUserModal}
                    toggleAddUserModal={toggleAddUserModal} />
            </section>
            <Modal isModalOpen={isAddNewSpaceModalOpen} closeModal={toggleAddNewSpaceModal}>
                <AddNewSpace closeModal={toggleAddNewSpaceModal} />
            </Modal>
            <Modal isModalOpen={isAddSpaceWithCodeOpen} closeModal={toggleAddSpaceWithCodeModal}>
                <AddSpaceWithCode closeModal={toggleAddSpaceWithCodeModal} />
            </Modal>
            <Modal isModalOpen={isConfirmLeaveSpaceModalOpen} closeModal={toggleConfirmLeaveSpaceModal}>
                <ConfirmLeaveSpace setDataFromServer={props.setDataFromServer} clickedSpaceIndex={clickedSpaceIndex} closeModal={toggleConfirmLeaveSpaceModal} />
            </Modal>
            <Modal isModalOpen={isConfirmRemoveUserModalOpen} closeModal={toggleConfirmRemoveUserModal}>
                <ConfirmRemoveUser clickedSpaceIndex={clickedSpaceIndex} removingUserId={removingUserId} closeModal={toggleConfirmRemoveUserModal} />
            </Modal>
            <Modal isModalOpen={isConfirmRemoveSpaceModalOpen} closeModal={toggleConfirmRemoveSpaceModal}>
                <ConfirmRemoveSpace setDataFromServer={props.setDataFromServer} clickedSpaceIndex={clickedSpaceIndex} closeModal={toggleConfirmRemoveSpaceModal} />
            </Modal>
            <Modal isModalOpen={isAddUserModalOpen} closeModal={toggleAddUserModal}>
                <AddNewUser currentSpace={currentSpace} closeModal={toggleAddUserModal} />
            </Modal>
        </React.Fragment>
    )
}

export default Spaces;