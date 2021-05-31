import React, { useState } from 'react';
import classes from './Modal.module.scss';
import Input from '../../../Plugins/Input/Input';
import Button from '../../../Plugins/Button/Button';
import { emailValidation } from '../../../Other/InputsValidation';
import axios from 'axios';

function RestorePassword(props) {
    const [emailValue, setEmailValue] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(null);

    function emailChangeHandler(evt) {
        setEmailValue(evt.target.value);
        setIsEmailValid(emailValidation(evt.target.value));
    }

    async function resetPassword(evt) {
        evt.preventDefault();
        const apiKey = 'AIzaSyAwu9n1vxYzjojiWKrVsrkhLQZllm3uOAQ';
        const resetPasswordData = { requestType: 'PASSWORD_RESET', email: emailValue }
        await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`, resetPasswordData);
        props.closeModal();
    }

    return (
        <React.Fragment>
            <h2 style={{ marginBottom: '18px' }}>Восстановление пароля</h2>
            <form onSubmit={resetPassword}>
                <Input
                    type='email'
                    label='Email'
                    value={props.email}
                    onChange={emailChangeHandler}
                    autoFocus
                    isValid={isEmailValid}
                    errorMessage='Введите корректный email' />
                <span className={classes.resetPasswordText}>На ваш email будет отправлено письмо для восстановления пароля</span>
                <div className={classes.buttons}>
                    <Button cls='primary' text='Отправить' type='submit'></Button>
                </div>
            </form>
        </React.Fragment>
    )
}

export default RestorePassword;