import React, { useState, useRef, useEffect } from 'react';
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
    const [nameValue, setNameValue] = useState('');
    const [surnameValue, setSurnameValue] = useState('');
    const [sexValue, setSexValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [isError, setIsError] = useState(false);
    const apiKey = 'AIzaSyAwu9n1vxYzjojiWKrVsrkhLQZllm3uOAQ';
    const history = useHistory();
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
        setSurnameValue('')
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

            const tokenData = {
                token: response.data.idToken,
                refreshToken: response.data.refreshToken,
                expiresIn: new Date().getTime() + response.data.expiresIn * 1000
            }
            const userId = response.data.localId;

            const data = await axios.get(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/users/${userId}.json?auth=${tokenData.token}`);
            const userData = new UserDataLocal(data.data.name, data.data.surname, data.data.sex, userId);
            const spaces = data.data.spaces;
            const activeSpace = spaces.find(item => item.isActive === true);

            updateStore(userData, tokenData, spaces);

            history.replace(`/${activeSpace.id}/`);
        } catch (err) {
            console.log('err: ', err);
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

            const tokenData = {
                token: response.data.idToken,
                refreshToken: response.data.refreshToken,
                expiresIn: new Date().getTime() + response.data.expiresIn * 1
            }

            const userId = response.data.localId;
            const initialSpace = [new Space('Моё пространство', '', { name: nameValue, surname: surnameValue, sex: sexValue, id: userId }, true)];
            const userDataToSend = new UserDataServer(nameValue, surnameValue, sexValue, emailValue, passwordValue, userId);
            userDataToSend.spaces = initialSpace;
            const userData = new UserDataLocal(nameValue, surnameValue, sexValue, userId);

            await axios.put(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/users/${userId}.json?auth=${tokenData.token}`, userDataToSend);

            updateStore(userData, tokenData, initialSpace);

            history.replace(`/${initialSpace[0].id}/`);
        } catch (err) {
            setIsError(true);
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
                        {isError ? <p className={classes.error}>Данная почта уже существует</p> : null}
                        <form onSubmit={regSubmitHandler}>
                            <Input type='text' label='Имя' value={nameValue} onChange={evt => setNameValue(evt.target.value)} autoFocus required />
                            <Input type='text' label='Фамилия' value={surnameValue} onChange={evt => setSurnameValue(evt.target.value)} required />
                            <div className={classes.radio}>
                                <span>Пол:</span>
                                <input id='male' type='radio' name='sex' value='male' onChange={evt => setSexValue(evt.target.value)} required />
                                <label htmlFor='male'>Мужской</label>
                                <input id='female' type='radio' name='sex' value='female' onChange={evt => setSexValue(evt.target.value)} required />
                                <label htmlFor='female'>Женский</label>
                            </div>
                            <Input type='email' label='Email' value={emailValue} onChange={evt => setEmailValue(evt.target.value)} required />
                            <Input type='password' label='Пароль' value={passwordValue} onChange={evt => setPasswordValue(evt.target.value)} required />
                            <div className={classes.buttons}>
                                <Button cls='primary' text='Зарегистрироваться' type='submit'></Button>
                            </div>
                        </form>
                    </React.Fragment>
                    : <React.Fragment>
                        <h2>Вход</h2>
                        {isError ? <p className={classes.error}>Неверный email и/или пароль</p> : null}
                        <form onSubmit={loginSubmitHandler}>
                            <Input type='email' label='Email' value={emailValue} onChange={evt => setEmailValue(evt.target.value)} autoFocus required />
                            <Input type='password' label='Пароль' value={passwordValue} onChange={evt => setPasswordValue(evt.target.value)} required />
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