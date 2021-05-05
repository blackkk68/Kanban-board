import React, { useState, useRef, useEffect } from 'react';
import classes from './Modal.module.scss';
import Input from '../../Plugins/Input/Input';
import Button from '../../Plugins/Button/Button';
import axios from 'axios';

function AuthAndReg(props) {
    const [isRegModalCurrent, setIsRegModalCurrent] = useState(false);
    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const overlayRef = useRef(null);

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
    }, [isRegModalCurrent])

    async function loginSubmitHandler(evt) {
        evt.preventDefault();
        try {
            const apiKey = 'AIzaSyAwu9n1vxYzjojiWKrVsrkhLQZllm3uOAQ';
            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
                email: emailValue,
                password: passwordValue,
                returnSecureToken: true
            });
            const userId = response.data.localId;
            const token = response.data.idToken;
            const refreshToken = response.data.refreshToken;
            const data = await axios.get(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/${userId}/userData.json?auth=${token}`);
            const userName = data.data.name;
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('userName', userName);
            localStorage.setItem('userId', userId);
            localStorage.setItem('token', token);
            props.closeModal();
            props.updateIsLogined(true);
            props.updateUserName(userName);
        } catch (err) {
            console.error(err);
        }
    }

    async function regSubmitHandler(evt) {
        evt.preventDefault();
        try {
            const apiKey = 'AIzaSyAwu9n1vxYzjojiWKrVsrkhLQZllm3uOAQ';
            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
                email: emailValue,
                password: passwordValue,
                returnSecureToken: true
            });
            const token = response.data.idToken;
            const userId = response.data.localId;
            const refreshToken = response.data.refreshToken;
            const userData = {
                name: nameValue,
                email: emailValue,
                password: passwordValue,
                userId
            }
            axios.put(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/${userId}/userData.json?auth=${token}`, userData);
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            localStorage.setItem('userName', nameValue);
            localStorage.setItem('refreshToken', refreshToken);
            props.closeModal();
            props.updateIsLogined(true);
            props.updateUserName(nameValue);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className={classes.Overlay} onClick={overlayClickHandler} ref={overlayRef}>
            <div className={classes.Modal} style={{ width: '450px' }}>
                <i className={`fa fa-times ${classes.cross}`} onClick={crossClickHandler}></i>
                {isRegModalCurrent
                    ? <React.Fragment>
                        <h2>Регистрация</h2>
                        <form onSubmit={regSubmitHandler}>
                            <Input type='text' placeholder='Имя' value={nameValue} onChange={evt => setNameValue(evt.target.value)} />
                            <Input type='email' placeholder='Email' value={emailValue} onChange={evt => setEmailValue(evt.target.value)} autoFocus />
                            <Input type='password' placeholder='Пароль' value={passwordValue} onChange={evt => setPasswordValue(evt.target.value)} />
                            <div className={classes.buttons}>
                                <Button cls='primary' text='Зарегистрироваться' type='submit'></Button>
                                <Button cls='cancel' text='Вход' onClick={() => setIsRegModalCurrent(false)}></Button>
                            </div>
                        </form>
                    </React.Fragment>
                    : <React.Fragment>
                        <h2>Вход</h2>
                        <form onSubmit={loginSubmitHandler}>
                            <Input type='email' placeholder='Email' value={emailValue} onChange={evt => setEmailValue(evt.target.value)} autoFocus />
                            <Input type='password' placeholder='Пароль' value={passwordValue} onChange={evt => setPasswordValue(evt.target.value)} />
                            <div className={classes.buttons}>
                                <Button cls='primary' text='Войти' type='submit'></Button>
                                <Button cls='cancel' text='Регистрация' onClick={() => setIsRegModalCurrent(true)}></Button>
                            </div>
                        </form>
                    </React.Fragment>
                }
            </div>
        </div>
    )
}

export default AuthAndReg;