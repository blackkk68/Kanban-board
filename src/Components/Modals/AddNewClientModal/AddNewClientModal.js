import React, { useState, useRef } from 'react';
import classes from './AddNewClientModal.module.scss';

function AddNewClientModal(props) {
    const [companyTitle, setCompanyTitle] = useState('');
    const [contact, setContact] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [comment, setComment] = useState('');
    const overlayRef = useRef(null);

    class Client {
        constructor(options) {
            this.companyTitle = options.companyTitle;
            this.contact = options.contact;
            this.phone = options.phone;
            this.email = options.email;
            this.address = options.address;
            this.comment = options.comment;
            this.id = new Date().getTime();
        }
    }

    function addNewClient() {
        const clients = JSON.parse(localStorage.getItem('clients'));
        const newClient = new Client({ companyTitle, contact, phone, email, address, comment });
        clients.push(newClient);
        clients.sort((a, b) => a.companyTitle > b.companyTitle);
        props.updateClients(clients);
    }

    function resetStates() {
        setCompanyTitle('');
        setContact('');
        setPhone('');
        setEmail('');
        setAddress('');
        setComment('');
    }

    function overlayClickHandler(evt) {
        if (evt.target.contains(overlayRef.current)) {
            props.closeModal();
        }
    }

    function crossClickHandler() {
        props.closeModal();
    }

    function submitHandler(evt) {
        evt.preventDefault();
        addNewClient();
        props.closeModal();
        resetStates();
    }

    return (
        <div className={classes.Overlay} onClick={overlayClickHandler} ref={overlayRef}>
            <div className={classes.Modal}>
                <i className="fa fa-times" onClick={crossClickHandler}></i>
                <h2>Новый клиент</h2>
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
                    <button type='submit'>Добавить</button>
                </form>
            </div>
        </div>
    )
}

export default AddNewClientModal;