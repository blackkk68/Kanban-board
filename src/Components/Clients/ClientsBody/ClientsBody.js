import React from 'react'
import classes from './ClientsBody.module.scss';

function ClientsBody(props) {
    function clickHandler(clientId) {
        props.openModal(clientId);
    }

    return (
        <section className={classes.ClientsBody}>
            {props.clients.length
                ? <React.Fragment>
                    <div className={classes.clientsListHeader}>
                        <p>Компания</p>
                        <p>Контактное лицо</p>
                        <p>Телефон</p>
                        <p>Email</p>
                    </div>
                    <ul className={classes.clientsList}>
                        {props.clients.map(item => {
                            return (
                                <li onClick={() => clickHandler(item.id)} className={classes.client} key={item.id}>
                                    <p>{item.companyTitle}</p>
                                    <p>{item.contact}</p>
                                    <p>{item.phone}</p>
                                    <p>{item.email}</p>
                                </li>
                            )
                        })}
                    </ul>
                </React.Fragment>
                : null}
        </section>
    )
}

export default ClientsBody;