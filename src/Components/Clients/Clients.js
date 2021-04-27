import React, { useState } from 'react'
import classes from './Clients.module.scss';
import ClientsBody from './ClientsBody/ClientsBody';
import Search from '../../Plugins/Search/Search';

function Clients() {
    const [searchValue, setSearchValue] = useState('')
    const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);

    function updateAddClientModalState(bool) {
        setIsAddClientModalOpen(bool);
    }

    function setSearchClients(value) {
        setSearchValue(value);
    }

    return (
        <section className={classes.Clients}>
            <div className={classes.header}>
                <h1 className={classes.heading}>Клиенты</h1>
                <div className={classes.buttons}>
                    <Search setSearchClients={setSearchClients} />
                    <i onClick={() => setIsAddClientModalOpen(true)} className='fa fa-plus-circle' />
                </div>
            </div>
            <ClientsBody searchValue={searchValue} isAddClientModalOpen={isAddClientModalOpen} updateAddClientModalState={updateAddClientModalState} />
        </section>
    )
}

export default Clients;