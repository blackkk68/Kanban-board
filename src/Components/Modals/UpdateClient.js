import React, { useState, useRef } from 'react';
import classes from './Modal.module.scss';
import Input from '../../Plugins/Input/Input';
import Button from '../../Plugins/Button/Button';

function UpdateClient(props) {
    const clients = JSON.parse(localStorage.getItem('clients'));
    const currentClientIndex = clients.findIndex(item => item.id === props.clientId);
    const client = clients[currentClientIndex];
    const [companyTitle, setCompanyTitle] = useState(client.companyTitle);
    const [contact, setContact] = useState(client.contact);
    const [phone, setPhone] = useState(client.phone);
    const [email, setEmail] = useState(client.email);
    const [address, setAddress] = useState(client.address);
    const [comment, setComment] = useState(client.comment);
    const overlayRef = useRef(null);

    function updateClient() {
        client.companyTitle = companyTitle;
        client.contact = contact;
        client.phone = phone;
        client.email = email;
        client.address = address;
        client.comment = comment;
        props.updateClients(clients);
    }

    function overlayClickHandler(evt) {
        if (evt.target.contains(overlayRef.current)) {
            updateClient();
            props.closeModal();
        }
    }

    function crossClickHandler() {
        updateClient();
        props.closeModal();
    }

    function deleteClient() {
        clients.splice(currentClientIndex, 1);
        props.updateClients(clients);
        props.closeModal();
    }

    function submitHandler(evt) {
        evt.preventDefault();
        props.closeModal();
        updateClient();
    }

    return (
        <div className={classes.Overlay} onClick={overlayClickHandler} ref={overlayRef}>
            <div className={classes.Modal}>
                <i className={`fa fa-times ${classes.cross}`} onClick={crossClickHandler}></i>
                <h2>Редактировать данные клиента</h2>
                <form onSubmit={submitHandler}>
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
                        style={{ height: '56px' }}
                        label='Комментарий'
                        value={comment}
                        onChange={evt => setComment(evt.target.value)} />
                    <div className={classes.buttons}>
                        <Button cls='primary' type='submit' text='Сохранить' />
                        <Button cls='delete' onClick={deleteClient} text='Удалить' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateClient;