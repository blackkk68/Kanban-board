import React, { useState, useRef } from 'react';
import classes from './UpdateClientModal.module.scss';

function UpdateClientModal(props) {
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
    }

    function submitHandler(evt) {
        evt.preventDefault();
        deleteClient();
        props.closeModal();
    }

    return (
        <div className={classes.Overlay} onClick={overlayClickHandler} ref={overlayRef}>
            <div className={classes.Modal}>
                <i className="fa fa-times" onClick={crossClickHandler}></i>
                <h2>Редактировать данные клиента</h2>
                <form onSubmit={submitHandler}>
                    <input
                        type='text'
                        placeholder='Название организации'
                        autoFocus={true} value={companyTitle}
                        onChange={evt => setCompanyTitle(evt.target.value)}
                        required />
                    <input
                        type='text'
                        placeholder='Контактное лицо'
                        value={contact}
                        onChange={evt => setContact(evt.target.value)} />
                    <input
                        type='tel'
                        placeholder='Телефон'
                        value={phone}
                        onChange={evt => setPhone(evt.target.value)} />
                    <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={evt => setEmail(evt.target.value)} />
                    <input
                        ype='text' placeholder='Адрес'
                        value={address}
                        onChange={evt => setAddress(evt.target.value)} />
                    <textarea
                        type='text'
                        placeholder='Комментарий'
                        value={comment}
                        onChange={evt => setComment(evt.target.value)} />
                    <button type='submit'>Удалить</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateClientModal;