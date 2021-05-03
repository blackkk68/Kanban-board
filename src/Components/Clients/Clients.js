import React, { useState } from 'react'
import classes from './Clients.module.scss';
import ClientsBody from './ClientsBody/ClientsBody';
import Search from '../../Plugins/Search/Search';
import AddNewClient from '../Modals/AddNewClient/AddNewClient';
import UpdateClient from '../Modals/UpdateClient/UpdateClient';

function Clients() {
    const [clients, setClients] = useState(JSON.parse(localStorage.getItem('clients')) ? JSON.parse(localStorage.getItem('clients')) : []);
    const [searchValue, setSearchValue] = useState('');
    const regexp = new RegExp(`${searchValue}`, 'gi');
    const filteredClients = clients.filter(item => item.companyTitle.match(regexp));
    const [isUpdateClientModalOpen, setIsUpdateClientModalOpen] = useState(false);
    const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
    const [currentClientId, setCurrentClientId] = useState('');

    function setSearchClients(value) {
        setSearchValue(value);
    }

    function closeAddClientModal() {
        setIsAddClientModalOpen(false);
    }

    function openUpdateClientModal() {
        setIsUpdateClientModalOpen(true);
    }

    function closeUpdateClientModal() {
        setIsUpdateClientModalOpen(false);
    }

    function updateClients(newClients) {
        setClients(newClients);
    }

    function setClientId(clientId) {
        setCurrentClientId(clientId);
    }

    localStorage.setItem('clients', JSON.stringify(clients));

    return (
        <section className={classes.Clients}>
            <div className={classes.header}>
                <h1 className={classes.heading}>Клиенты</h1>
                <div className={classes.buttons}>
                    <Search setSearchClients={setSearchClients} />
                    <i onClick={() => setIsAddClientModalOpen(true)} className='fa fa-plus-circle' />
                </div>
            </div>
            <ClientsBody
                searchValue={searchValue}
                isAddClientModalOpen={isAddClientModalOpen}
                clients={filteredClients}
                openModal={openUpdateClientModal}
                setClientId={setClientId} />
            {isAddClientModalOpen
                ? <AddNewClient
                    closeModal={closeAddClientModal}
                    updateClients={updateClients} />
                : null}
            {isUpdateClientModalOpen
                ? <UpdateClient
                    closeModal={closeUpdateClientModal}
                    updateClients={updateClients}
                    clientId={currentClientId} />
                : null}
        </section>
    )
}

export default Clients;