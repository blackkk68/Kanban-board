import React, { useState, useRef } from 'react';
import classes from './Modal.module.scss';
import Input from '../../Plugins/Input/Input';
import Button from '../../Plugins/Button/Button';

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

    function enterSubmitHandler(evt) {
        evt.preventDefault();
    }

    return (
        <div className={classes.Overlay} onClick={overlayClickHandler} ref={overlayRef}>
            <div className={classes.Modal} style={{ width: '450px' }}>
                <i className={`fa fa-times ${classes.cross}`} onClick={crossClickHandler}></i>
                {isRegModalCurrent
                    ? <React.Fragment>
                        <h2>Регистрация</h2>
                        <form onSubmit={enterSubmitHandler}>
                            <Input placeholder='Имя' value={nameValue} onChange={evt => setNameValue(evt.target.value)} />
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
                        <form onSubmit={enterSubmitHandler}>
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