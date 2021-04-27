import React from 'react'
import classes from './Client.module.scss';

function Client(props) {
    function clickHandler(clientId) {
        props.openModal();
        props.setClientId(clientId);
    }
    return props.clients.map(item => {
        return (
            <li onClick={() => clickHandler(item.id)} className={classes.Client} key={item.id}>
                <p>{item.companyTitle}</p>
                <p>{item.contact}</p>
                <p>{item.phone}</p>
                <p>{item.email}</p>
            </li>
        )
    })
}

export default Client;