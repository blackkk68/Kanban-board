import React, { useState } from 'react';
import classes from './Modal.module.scss';
import Input from '../../../Plugins/Input/Input';
import Button from '../../../Plugins/Button/Button';
import userDataStore from '../../../Store/userData';
import tokenDataStore from '../../../Store/tokenData';
import spacesStore from '../../../Store/spaces';
import { UserDataLocal } from '../../../Other/Classes';
import { emailValidation, passwordValidation } from '../../../Other/InputsValidation';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Login(props) {
    const apiKey = 'AIzaSyAwu9n1vxYzjojiWKrVsrkhLQZllm3uOAQ';
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(null);
    const [isPasswordValid, setIsPasswordValid] = useState(null);
    const [error, setError] = useState('');
    const history = useHistory();

    function emailChangeHandler(evt) {
        setEmailValue(evt.target.value);
        setIsEmailValid(emailValidation(evt.target.value));
    }

    function passwordChangeHandler(evt) {
        setPasswordValue(evt.target.value);
        setIsPasswordValid(passwordValidation(evt.target.value));
    }

    async function loginSubmitHandler(evt) {
        evt.preventDefault();
        if (isEmailValid && isPasswordValid) {
            try {
                const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
                    email: emailValue,
                    password: passwordValue,
                    returnSecureToken: true
                });

                const tokenData = {
                    token: response.data.idToken,
                    refreshToken: response.data.refreshToken,
                    expiresIn: new Date().getTime() + response.data.expiresIn * 1000
                }
                const userId = response.data.localId;

                const data = await axios.get(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/users/${userId}.json?auth=${tokenData.token}`);
                const userData = new UserDataLocal(data.data.name, data.data.surname, userId);
                const userSpaces = data.data.spaces;
                const userActiveSpace = userSpaces.find(item => item.isActive === true);

                const spaces = [];
                for (let userSpace of userSpaces) {
                    const spaceData = await axios.get(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/spaces/${userSpace.id}/spaceData.json?auth=${tokenData.token}`);
                    if (spaceData.data && spaceData.data.users.find(item => item.id === userData.id)) {
                        spaces.push(spaceData.data);
                    }
                }
                const activeSpace = spaces.find(item => item.id === userActiveSpace.id) || spaces[0];

                tokenDataStore.updateTokenData(tokenData);
                spacesStore.updateSpaces(spaces);
                spacesStore.updateActiveSpace(activeSpace);
                userDataStore.updateUserData(userData);
                props.setDataFromServer();
                history.replace(`/${activeSpace.id}/`);
            } catch (err) {
                console.error('err: ', err);
                setError('Неверный email и/или пароль');
            }
        } else {
            setError('Введите корректные данные');
        }
    }

    return (
        <React.Fragment>
            <h2>Вход</h2>
            <div className={classes.error}>{error.length ? <span>{error}</span> : ''}</div>
            <form onSubmit={loginSubmitHandler}>
                <Input
                    type='email'
                    label='Email'
                    value={emailValue}
                    onChange={emailChangeHandler}
                    autoFocus
                    isValid={isEmailValid}
                    errorMessage='Введите корректный email' />
                <Input
                    type='password'
                    label='Пароль'
                    value={passwordValue}
                    onChange={passwordChangeHandler}
                    isValid={isPasswordValid}
                    errorMessage='Минимальная длина пароля: 6 символов' />
                <span className={classes.forgotPassword} onClick={() => props.forgotPassword()}>Забыли пароль?</span>
                <div className={classes.buttons}>
                    <Button cls='primary' text='Войти' type='submit'></Button>
                </div>
            </form>
        </React.Fragment>
    )
}

export default Login;