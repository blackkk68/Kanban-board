import React, { useState } from 'react'
import classes from './Clients.module.scss';
import ClientsBody from './ClientsBody/ClientsBody';
import Search from '../../Plugins/Search/Search';
import AddNewClient from '../Modals/Clients/AddNewClient';
import UpdateClient from '../Modals/Clients/UpdateClient';
import Plus from '../../Plugins/Plus/Plus';
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
            <div className={classes.header}>
                <h1 className={classes.heading}>Клиенты</h1>
                {clients.clients.length
                    ? <div className={classes.buttons}>
                        <Search setSearchClients={setSearchClients} />
                        <Plus onClick={() => setIsAddClientModalOpen(true)} />
                    </div>
                    : null}
            </div>
            <ClientsBody
                searchValue={searchValue}
                isAddClientModalOpen={isAddClientModalOpen}
                filteredClients={filteredClients}
                openUpdateClientModal={openUpdateClientModal}
                openAddClientModal={openAddClientModal}
            />
            <Modal isModalOpen={isAddClientModalOpen}>
                <AddNewClient closeModal={closeAddClientModal} />
            </Modal>
            <Modal isModalOpen={isUpdateClientModalOpen}>
                <UpdateClient closeModal={closeUpdateClientModal} clientId={currentClientId} />
            </Modal>
        </section>
    )
}

export default Clients;