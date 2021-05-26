import React, { useState, useRef } from 'react';
import classes from './Modal.module.scss';
import CloseIcon from '@material-ui/icons/Close';
import Input from '../../Plugins/Input/Input';
import Button from '../../Plugins/Button/Button';
import clients from '../../Store/clients';

function AddNewClient(props) {
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
        const newClient = new Client({ companyTitle, contact, phone, email, address, comment });
        // clients.push(newClient);
        // clients.sort((a, b) => a.companyTitle > b.companyTitle);
        clients.addClient(newClient);
        //props.updateClients(clients);
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
                <CloseIcon className={classes.cross} onClick={crossClickHandler} />
                <h2>Новый клиент</h2>
                <form onSubmit={submitHandler}>
                    <Input
                        label='Название организации'
                        autoFocus={true}
                        value={companyTitle}
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
                        <Button cls='primary' type='submit' text='Добавить' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddNewClient;