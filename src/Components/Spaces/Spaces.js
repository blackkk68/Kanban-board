import React, { useState } from 'react'
import classes from './Spaces.module.scss';
import SpacesBody from './SpacesBody/SpacesBody';
import AddSpace from '../Modals/Spaces/AddSpace';
import ConfirmLeaveSpace from '../Modals/Confirm/ConfirmLeaveSpace';
import ConfirmRemoveUser from '../Modals/Confirm/ConfirmRemoveUser';
import ConfirmRemoveSpace from '../Modals/Confirm/ConfirmRemoveSpace';
import AddNewUser from '../Modals/Spaces/AddNewUser';
import Modal from '../../HOC/Modal/Modal';
import SectionHeader from '../../HOC/SectionHeader/SectionHeader';

function Spaces() {
    const [isConfirmLeaveSpaceModalOpen, setIsConfirmLeaveSpaceModalOpen] = useState(false);
    const [isConfirmRemoveUserModalOpen, setIsConfirmRemoveUserModalOpen] = useState(false);
    const [isConfirmRemoveSpaceModalOpen, setIsConfirmRemoveSpaceModalOpen] = useState(false);
    const [isAddSpaceModalOpen, setIsAddSpaceModalOpen] = useState(false);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [clickedSpaceIndex, setClickedSpaceIndex] = useState(null);
    const [removingUserId, setRemovingUserId] = useState(null);
    const [currentSpace, setCurrentSpace] = useState(null);

    function toggleAddSpaceModal() {
        isAddSpaceModalOpen ? setIsAddSpaceModalOpen(false) : setIsAddSpaceModalOpen(true);
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

    return (
        <React.Fragment>
            <section className={classes.Spaces}>
                <SectionHeader heading='Пространства' plusHandler={toggleAddSpaceModal} />
                <SpacesBody
                    toggleConfirmLeaveSpaceModal={toggleConfirmLeaveSpaceModal}
                    toggleConfirmRemoveSpaceModal={toggleConfirmRemoveSpaceModal}
                    toggleConfirmRemoveUserModal={toggleConfirmRemoveUserModal}
                    toggleAddUserModal={toggleAddUserModal} />
            </section>
            <Modal isModalOpen={isAddSpaceModalOpen} closeModal={toggleAddSpaceModal}>
                <AddSpace closeModal={toggleAddSpaceModal} />
            </Modal>
            <Modal isModalOpen={isConfirmLeaveSpaceModalOpen} closeModal={toggleConfirmLeaveSpaceModal}>
                <ConfirmLeaveSpace clickedSpaceIndex={clickedSpaceIndex} closeModal={toggleConfirmLeaveSpaceModal} />
            </Modal>
            <Modal isModalOpen={isConfirmRemoveUserModalOpen} closeModal={toggleConfirmRemoveUserModal}>
                <ConfirmRemoveUser clickedSpaceIndex={clickedSpaceIndex} removingUserId={removingUserId} closeModal={toggleConfirmRemoveUserModal} />
            </Modal>
            <Modal isModalOpen={isConfirmRemoveSpaceModalOpen} closeModal={toggleConfirmRemoveSpaceModal}>
                <ConfirmRemoveSpace clickedSpaceIndex={clickedSpaceIndex} closeModal={toggleConfirmRemoveSpaceModal} />
            </Modal>
            <Modal isModalOpen={isAddUserModalOpen} closeModal={toggleAddUserModal}>
                <AddNewUser currentSpace={currentSpace} closeModal={toggleAddUserModal} />
            </Modal>
        </React.Fragment>
    )
}

export default Spaces;