import React, { useState } from 'react'
import classes from './Clients.module.scss';
import ClientsBody from './ClientsBody/ClientsBody';
import AddNewClient from '../Modals/Tasks&Clients/AddNewClient';
import UpdateClient from '../Modals/Tasks&Clients/UpdateClient';
import SectionHeader from '../../HOC/SectionHeader/SectionHeader';
import clients from '../../Store/clients';
import Modal from '../../HOC/Modal/Modal';

function Clients() {
    const [searchValue, setSearchValue] = useState('');
    const regexp = new RegExp(`${searchValue}`, 'gi');
    const filteredClients = clients.clients.filter(item => item.companyTitle.match(regexp));
    const [isUpdateClientModalOpen, setIsUpdateClientModalOpen] = useState(false);
    const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
    const [currentClientId, setCurrentClientId] = useState('');

    function setSearchClients(value) {
        setSearchValue(value);
    }

    function closeAddClientModal() {
        setIsAddClientModalOpen(false);
    }

    function openUpdateClientModal(clientId) {
        setIsUpdateClientModalOpen(true);
        setCurrentClientId(clientId);
    }

    function closeUpdateClientModal() {
        setIsUpdateClientModalOpen(false);
    }

    function openAddClientModal() {
        setIsAddClientModalOpen(true);
    }

    return (
        <section className={classes.Clients}>
            <SectionHeader heading='Клиенты' setSearchValue={setSearchClients} plusHandler={openAddClientModal} />
            <ClientsBody
                searchValue={searchValue}
                isAddClientModalOpen={isAddClientModalOpen}
                filteredClients={filteredClients}
                openUpdateClientModal={openUpdateClientModal}
                openAddClientModal={openAddClientModal}
            />
            <Modal isModalOpen={isAddClientModalOpen} closeModal={closeAddClientModal}>
                <AddNewClient closeModal={closeAddClientModal} />
            </Modal>
            <Modal isModalOpen={isUpdateClientModalOpen} closeModal={closeUpdateClientModal}>
                <UpdateClient closeModal={closeUpdateClientModal} clientId={currentClientId} />
            </Modal>
        </section>
    )
}

export default Clients;