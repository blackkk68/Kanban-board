import React, { useState, useRef } from 'react'
import classes from './Spaces.module.scss';
import SpacesBody from './SpacesBody/SpacesBody';
import AddNewSpace from '../Modals/Spaces/AddNewSpace';
import AddSpaceWithCode from '../Modals/Spaces/AddSpaceWithCode';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ConfirmLeaveSpace from '../Modals/Confirm/ConfirmLeaveSpace';
import ConfirmRemoveUser from '../Modals/Confirm/ConfirmRemoveUser';
import ConfirmRemoveSpace from '../Modals/Confirm/ConfirmRemoveSpace';
import AddNewUser from '../Modals/Spaces/AddNewUser';
import ContextMenu from './ContextMenu/ContextMenu';
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
    const plusRef = useRef(null);

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

    function toggleAddUserModal(currentSpace) {
        setIsAddUserModalOpen(!isAddUserModalOpen);
        setCurrentSpace(currentSpace);
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
                        <AddCircleOutlineIcon className={classes.plus} onClick={toggleContextMenu} ref={plusRef} />
                    </div>
                    <ContextMenu
                        isContextMenuOpen={isContextMenuOpen}
                        addNewSpace={addNewSpace}
                        addSpaceWithCode={addSpaceWithCode}
                        toggleContextMenu={toggleContextMenu}
                        plusRef={plusRef.current} />
                </div>
                <SpacesBody
                    setDataFromServer={props.setDataFromServer}
                    toggleConfirmLeaveSpaceModal={toggleConfirmLeaveSpaceModal}
                    toggleConfirmRemoveSpaceModal={toggleConfirmRemoveSpaceModal}
                    toggleConfirmRemoveUserModal={toggleConfirmRemoveUserModal}
                    toggleAddUserModal={toggleAddUserModal} />
            </section>
            <Modal isModalOpen={isAddNewSpaceModalOpen}>
                <AddNewSpace toggleAddNewSpaceModal={toggleAddNewSpaceModal} />
            </Modal>
            <Modal isModalOpen={isAddSpaceWithCodeOpen}>
                <AddSpaceWithCode toggleAddSpaceWithCodeModal={toggleAddSpaceWithCodeModal} />
            </Modal>
            <Modal isModalOpen={isConfirmLeaveSpaceModalOpen}>
                <ConfirmLeaveSpace setDataFromServer={props.setDataFromServer} clickedSpaceIndex={clickedSpaceIndex} closeModal={toggleConfirmLeaveSpaceModal} />
            </Modal>
            <Modal isModalOpen={isConfirmRemoveUserModalOpen}>
                <ConfirmRemoveUser clickedSpaceIndex={clickedSpaceIndex} removingUserId={removingUserId} closeModal={toggleConfirmRemoveUserModal} />
            </Modal>
            <Modal isModalOpen={isConfirmRemoveSpaceModalOpen}>
                <ConfirmRemoveSpace setDataFromServer={props.setDataFromServer} clickedSpaceIndex={clickedSpaceIndex} closeModal={toggleConfirmRemoveSpaceModal} />
            </Modal>
            <Modal isModalOpen={isAddUserModalOpen}>
                <AddNewUser currentSpace={currentSpace} closeModal={toggleAddUserModal} />
            </Modal>
        </React.Fragment>
    )
}

export default Spaces;