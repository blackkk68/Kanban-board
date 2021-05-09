import React, { useState, useRef, useEffect } from 'react';
import classes from './Modal.module.scss';
import Input from '../../Plugins/Input/Input';
import Button from '../../Plugins/Button/Button';
import { useHistory } from 'react-router-dom';
import { Space } from '../../StaticData';
import axios from 'axios';

function AuthAndReg(props) {
    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [isError, setIsError] = useState(false);
    const apiKey = 'AIzaSyAwu9n1vxYzjojiWKrVsrkhLQZllm3uOAQ';
    const history = useHistory();
    const overlayRef = useRef(null);

    class UserData {
        constructor(nameValue, emailValue, passwordValue, userId) {
            this.name = nameValue;
            this.email = emailValue;
            this.password = passwordValue;
            this.userId = userId;
            this.spaces = [new Space(true, 'Моё пространство')];
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

    useEffect(() => {
        setNameValue('');
        setEmailValue('');
        setPasswordValue('');
        setIsError(false);
    }, []);

    async function loginSubmitHandler(evt) {
        evt.preventDefault();
        try {
            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
                email: emailValue,
                password: passwordValue,
                returnSecureToken: true
            });

            const token = response.data.idToken;
            const userId = response.data.localId;
            const refreshToken = response.data.refreshToken;

            const data = await axios.get(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/users/${userId}.json?auth=${token}`);
            const userName = data.data.name;
            const spaces = data.data.spaces;
            const activeSpace = spaces.filter(item => item.isActive === true);

            props.updateToken(token);
            props.updateSpaces(spaces);
            props.updateActiveSpace(activeSpace[0]);
            props.updateIsLogined(true);
            props.updateUserName(userName);
            props.closeModal();

            updateLocalStorage(token, userId, userName, refreshToken, spaces, activeSpace[0]);
            history.replace(`/${activeSpace[0].id}/`);
        } catch (err) {
            setIsError(true);
        }
    }

    async function regSubmitHandler(evt) {
        evt.preventDefault();
        try {
            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
                email: emailValue,
                password: passwordValue,
                returnSecureToken: true
            });

            const token = response.data.idToken;
            const userId = response.data.localId;
            const refreshToken = response.data.refreshToken;
            const userData = new UserData(nameValue, emailValue, passwordValue, userId);

            await axios.put(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/users/${userId}.json?auth=${token}`, userData);

            props.updateToken(token);
            props.updateSpaces(userData.spaces);
            props.updateActiveSpace(userData.spaces[0]);
            props.closeModal();
            props.updateIsLogined(true);
            props.updateUserName(nameValue);
            updateLocalStorage(token, userId, nameValue, refreshToken, userData.spaces, userData.spaces[0]);
            history.replace(`/${userData.spaces[0].id}/`);
        } catch (err) {
            setIsError(true);
        }
    }

    function updateLocalStorage(token, userId, nameValue, refreshToken, spaces, activeSpace) {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('userName', nameValue);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('spaces', JSON.stringify(spaces));
        localStorage.setItem('activeSpace', JSON.stringify(activeSpace));
    }

    return (
        <div className={classes.Overlay} onClick={overlayClickHandler} ref={overlayRef}>
            <div className={classes.Modal} style={{ width: '450px' }}>
                <i className={`fa fa-times ${classes.cross}`} onClick={crossClickHandler}></i>
                {props.isRegModalCurrent
                    ? <React.Fragment>
                        <h2>Регистрация</h2>
                        {isError ? <p className={classes.error}>Данная почта уже существует</p> : null}
                        <form onSubmit={regSubmitHandler}>
                            <Input type='text' placeholder='Имя' value={nameValue} onChange={evt => setNameValue(evt.target.value)} autoFocus />
                            <Input type='email' placeholder='Email' value={emailValue} onChange={evt => setEmailValue(evt.target.value)} />
                            <Input type='password' placeholder='Пароль' value={passwordValue} onChange={evt => setPasswordValue(evt.target.value)} />
                            <div className={classes.buttons}>
                                <Button cls='primary' text='Зарегистрироваться' type='submit'></Button>
                            </div>
                        </form>
                    </React.Fragment>
                    : <React.Fragment>
                        <h2>Вход</h2>
                        {isError ? <p className={classes.error}>Неверный email и/или пароль</p> : null}
                        <form onSubmit={loginSubmitHandler}>
                            <Input type='email' placeholder='Email' value={emailValue} onChange={evt => setEmailValue(evt.target.value)} autoFocus />
                            <Input type='password' placeholder='Пароль' value={passwordValue} onChange={evt => setPasswordValue(evt.target.value)} />
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