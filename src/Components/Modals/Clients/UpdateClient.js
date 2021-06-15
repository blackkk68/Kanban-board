import React, { useState } from 'react';
import classes from './Modal.module.scss';
import Input from '../../../Plugins/Input/Input';
import Button from '../../../Plugins/Button/Button';
import CloseIcon from '@material-ui/icons/Close';
import clientsStore from '../../../Store/clients';

function UpdateClient(props) {
    const clients = JSON.parse(localStorage.getItem('clients'));
    const client = clients.filter(item => item.id === props.clientId)[0];
    const [companyTitle, setCompanyTitle] = useState(client.companyTitle);
    const [contact, setContact] = useState(client.contact);
    const [phone, setPhone] = useState(client.phone);
    const [email, setEmail] = useState(client.email);
    const [address, setAddress] = useState(client.address);
    const [comment, setComment] = useState(client.comment);

    function updateClient() {
        client.companyTitle = companyTitle;
        client.contact = contact;
        client.phone = phone;
        client.email = email;
        client.address = address;
        client.comment = comment;
        clientsStore.updateClient(client);
        props.closeModal();
    }

    function crossClickHandler() {
        updateClient();
        props.closeModal();
    }

    function deleteClient() {
        clientsStore.removeClient(client);
        props.closeModal();
    }

    return (
        <div className={classes.Container}>
            <CloseIcon className={classes.cross} onClick={crossClickHandler} />
            <h2>Редактировать данные клиента</h2>
            <div className={classes.form}>
                <Input
                    label='Название организации'
                    autoFocus={true} value={companyTitle}
                    onChange={evt => setCompanyTitle(evt.target.value)}
                    required />
                <Input
                    label='Контактное лицо'
                    value={contact}
                    onChange={evt => setContact(evt.target.value)} />
                <Input
                    type='tel'
                    label='Телефон'
                    value={phone}
                    onChange={evt => setPhone(evt.target.value)} />
                <Input
                    type='email'
                    label='Email'
                    value={email}
                    onChange={evt => setEmail(evt.target.value)} />
                <Input
                    label='Адрес'
                    value={address}
                    onChange={evt => setAddress(evt.target.value)} />
                <Input
                    isBig={true}
                    label='Комментарий'
                    value={comment}
                    onChange={evt => setComment(evt.target.value)} />
                <div className={classes.buttons}>
                    <Button cls='primary' onClick={updateClient} text='Сохранить' />
                    <Button cls='delete' onClick={deleteClient} text='Удалить' />
                </div>
            </div>
        </div>
    )
}

export default UpdateClient;