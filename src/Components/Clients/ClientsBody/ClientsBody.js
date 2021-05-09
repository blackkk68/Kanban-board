import React from 'react'
import classes from './ClientsBody.module.scss';
import Icon from '@material-ui/core/Icon';
import plus from '../../../Img/no-clients-plus.svg';

function ClientsBody(props) {
    function clientClickHandler(clientId) {
        props.openUpdateClientModal(clientId);
    }

    function plusClickHandler() {
        props.openAddClientModal();
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
                        {props.filteredClients.map(item => {
                            return (
                                <li onClick={() => clientClickHandler(item.id)} className={classes.client} key={item.id}>
                                    <p>{item.companyTitle}</p>
                                    <p>{item.contact}</p>
                                    <p>{item.phone}</p>
                                    <p>{item.email}</p>
                                </li>
                            )
                        })}
                    </ul>
                </React.Fragment>
                : <div className={classes.noClientsPlaceholder}>
                    <Icon>
                        <img src={plus} onClick={plusClickHandler} alt='Кнопка добавить' />
                    </Icon>
                    <p>У вас пока нет клиентов.<br /> Нажмите на кнопку и добавьте их!</p>
                </div>}
        </section>
    )
}

export default ClientsBody;