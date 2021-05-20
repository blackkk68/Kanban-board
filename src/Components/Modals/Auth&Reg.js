import React, { useState, useRef } from 'react';
import classes from './Modal.module.scss';
import Input from '../../Plugins/Input/Input';
import Button from '../../Plugins/Button/Button';
import { useHistory } from 'react-router-dom';
import { UserDataServer, UserDataLocal, Space } from '../../Other/Classes';
import axios from 'axios';
import userDataStore from '../../Store/userData';
import tokenDataStore from '../../Store/tokenData';
import spacesStore from '../../Store/spaces';

function AuthAndReg(props) {
    const apiKey = 'AIzaSyAwu9n1vxYzjojiWKrVsrkhLQZllm3uOAQ';
    const [nameValue, setNameValue] = useState('');
    const [surnameValue, setSurnameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();
    const overlayRef = useRef(null);
    const [isNameValid, setIsNameValid] = useState(null);
    const [isSurnameValid, setIsSurnameValid] = useState(null);
    const [isEmailValid, setIsEmailValid] = useState(null);
    const [isPasswordValid, setIsPasswordValid] = useState(null);

    function nameChangeHandler(evt) {
        setNameValue(evt.target.value);
        if (evt.target.value.trim().length) {
            setIsNameValid(true);
        } else {
            setIsNameValid(false);
        }
    }

    function surnameBlurHandler(evt) {
        setSurnameValue(evt.target.value);
        if (evt.target.value.trim().length) {
            setIsSurnameValid(true);
        } else {
            setIsSurnameValid(false);
        }
    }

    function emailChangeHandler(evt) {
        setEmailValue(evt.target.value);
        const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regExp.test(String(evt.target.value).toLowerCase())) {
            setIsEmailValid(true);
        } else {
            setIsEmailValid(false);
        }
    }

    function passwordChangeHandler(evt) {
        setPasswordValue(evt.target.value);
        if (evt.target.value.trim().length >= 6) {
            setIsPasswordValid(true);
        } else {
            setIsPasswordValid(false);
        }
    }

    function overlayClickHandler(evt) {
        if (evt.target.contains(overlayRef.current)) {
            props.closeModal();
        }
    }

    function crossClickHandler() {
        props.closeModal();
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
                const spaces = data.data.spaces;
                const activeSpace = spaces.find(item => item.isActive === true);

                updateStore(userData, tokenData, spaces);
                history.replace(`/${activeSpace.id}/`);
            } catch (err) {
                console.log('err: ', err);
                setError('Неверный email и/или пароль');
            }
        } else {
            setError('Введите корректные данные');
        }
    }

    async function regSubmitHandler(evt) {
        evt.preventDefault();
        if (isEmailValid && isPasswordValid && isNameValid && isSurnameValid) {
            try {
                const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
                    email: emailValue,
                    password: passwordValue,
                    returnSecureToken: true
                });

                const tokenData = {
                    token: response.data.idToken,
                    refreshToken: response.data.refreshToken,
                    expiresIn: new Date().getTime() + response.data.expiresIn * 1
                }

                const userId = response.data.localId;
                const initialSpace = [new Space('Моё пространство', '', { name: nameValue, surname: surnameValue, id: userId }, true)];
                const userDataToSend = new UserDataServer(nameValue, surnameValue, emailValue, passwordValue, userId);
                userDataToSend.spaces = initialSpace;
                const userData = new UserDataLocal(nameValue, surnameValue, userId);

                await axios.put(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/users/${userId}.json?auth=${tokenData.token}`, userDataToSend);

                updateStore(userData, tokenData, initialSpace);
                history.replace(`/${initialSpace[0].id}/`);
            } catch (err) {
                setError('Данный email уже зарегистрирован');
            }
        } else {
            setError('Заполните все поля');
        }
    }

    function updateStore(userData, tokenData, spaces) {
        userDataStore.updateUserData(userData);
        tokenDataStore.updateTokenData(tokenData);
        spacesStore.updateSpaces(spaces);
        props.setDataFromServer();
    }

    return (
        <div className={classes.Overlay} onClick={overlayClickHandler} ref={overlayRef}>
            <div className={classes.Modal} style={{ width: '470px' }}>
                <i className={`fa fa-times ${classes.cross}`} onClick={crossClickHandler}></i>
                {props.isRegModalCurrent
                    ? <React.Fragment>
                        <h2>Регистрация</h2>
                        <div className={classes.error}>{error.length ? <span>{error}</span> : ''}</div>
                        <form onSubmit={regSubmitHandler}>
                            <Input
                                type='text'
                                label='Имя'
                                value={nameValue}
                                onChange={nameChangeHandler}
                                autoFocus
                                isValid={isNameValid}
                                errorMessage='Заполните это поле' />
                            <Input
                                type='text'
                                label='Фамилия'
                                value={surnameValue}
                                onChange={surnameBlurHandler}
                                isValid={isSurnameValid}
                                errorMessage='Заполните это поле' />
                            <Input
                                type='email'
                                label='Email'
                                value={emailValue}
                                onChange={emailChangeHandler}
                                isValid={isEmailValid}
                                errorMessage='Введите корректный email' />
                            <Input
                                type='password'
                                label='Пароль'
                                value={passwordValue}
                                onChange={passwordChangeHandler}
                                isValid={isPasswordValid}
                                errorMessage='Минимальная длина пароля: 6 символов' />
                            <div className={classes.buttons}>
                                <Button cls='primary' text='Зарегистрироваться' type='submit'></Button>
                            </div>
                        </form>
                    </React.Fragment>
                    : <React.Fragment>
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
                            <div className={classes.buttons}>
                                <Button cls='primary' text='Войти' type='submit'></Button>
                            </div>
                        </form>
                    </React.Fragment>
                }
            </div>
        </div>
    )
}

export default AuthAndReg;