import React, { useState } from 'react'
import classes from './ClientsBody.module.scss';
import Client from './Client/Client';
import AddNewClientModal from '../../Modals/AddNewClientModal/AddNewClientModal';
import UpdateClientModal from '../../Modals/UpdateClientModal/UpdateClientModal';

function ClientsBody(props) {
    const [clients, setClients] = useState(JSON.parse(localStorage.getItem('clients')) ? JSON.parse(localStorage.getItem('clients')) : []);
    const regexp = new RegExp(`${props.searchValue}`, 'gi');
    const filteredClientsList = clients.filter(item => item.companyTitle.match(regexp));
    const [isUpdateClientModalOpen, setIsUpdateClientModalOpen] = useState(false);
    const [currentClientId, setCurrentClientId] = useState('');

    function closeAddClientModal() {
        props.updateAddClientModalState(false);
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
        <React.Fragment>
            <section className={classes.ClientsBody}>
                {clients.length
                    ? <React.Fragment>
                        <div className={classes.ClientsListHeader}>
                            <p>Компания</p>
                            <p>Контактное лицо</p>
                            <p>Телефон</p>
                            <p>Email</p>
                        </div>
                        <ul className={classes.ClientsList}>
                            <Client openModal={openUpdateClientModal} setClientId={setClientId} clients={filteredClientsList} />
                        </ul>
                    </React.Fragment>
                    : null}
            </section>
            {props.isAddClientModalOpen
                ? <AddNewClientModal
                    closeModal={closeAddClientModal}
                    updateClients={updateClients} />
                : null}
            {isUpdateClientModalOpen
                ? <UpdateClientModal
                    closeModal={closeUpdateClientModal}
                    updateClients={updateClients}
                    clientId={currentClientId} />
                : null}
        </React.Fragment>
    )
}

export default ClientsBody;