import React, { useState } from 'react';
import classes from './AccountSettings.module.scss';
import Button from '../../../Plugins/Button/Button';
import Input from '../../../Plugins/Input/Input';
import { nameValidation, surnameValidation, passwordValidation, repeatPasswordValidation } from '../../../Other/InputsValidation';
import userDataStore from '../../../Store/userData';
import axios from 'axios';

function AccountSettings(props) {
    const userData = { ...userDataStore.userData };
    const [nameValue, setNameValue] = useState(userData.name);
    const [surnameValue, setSurnameValue] = useState(userData.surname);
    const [passwordValue, setPasswordValue] = useState('');
    const [repeatPasswordValue, setRepeatPasswordValue] = useState('');
    const [isNameValid, setIsNameValid] = useState(null);
    const [isSurnameValid, setIsSurnameValid] = useState(null);
    const [isPasswordValid, setIsPasswordValid] = useState(null);
    const [isRepeatPasswordValid, setRepeatIsPasswordValid] = useState(null);
    const [isRepeatPasswordTouched, setIsRepeatPasswordTouched] = useState(false);

    function nameChangeHandler(evt) {
        setNameValue(evt.target.value);
        setIsNameValid(nameValidation(evt.target.value));
    }

    function surnameBlurHandler(evt) {
        setSurnameValue(evt.target.value);
        setIsSurnameValid(surnameValidation(evt.target.value));
    }

    function passwordChangeHandler(evt) {
        setPasswordValue(evt.target.value);
        setIsPasswordValid(passwordValidation(evt.target.value));
        if (isRepeatPasswordTouched) {
            setRepeatIsPasswordValid(repeatPasswordValidation(repeatPasswordValue, evt.target.value));
        }
    }

    function repeatPasswordChangeHandler(evt) {
        setRepeatPasswordValue(evt.target.value);
        setRepeatIsPasswordValid(repeatPasswordValidation(evt.target.value, passwordValue));
        if (!isRepeatPasswordTouched) {
            setIsRepeatPasswordTouched(true);
        }
    }

    function saveData() {
        userData.name = nameValue;
        userData.surname = surnameValue;
        userDataStore.updateUserServerData(userData);
        if (passwordValue && isPasswordValid) {
            updatePassword();
        }
        props.closeModal();
    }

    async function updatePassword() {
        if (isPasswordValid && isRepeatPasswordValid) {
            try {
                const apiKey = 'AIzaSyAwu9n1vxYzjojiWKrVsrkhLQZllm3uOAQ';
                const token = JSON.parse(localStorage.getItem('tokenData')).token;
                const data = { idToken: token, password: passwordValue, returnSecureToken: false };
                await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`, data);
            } catch (error) {
                console.error('error: ', error);
            }
        }
    }

    return (
        <div className={classes.Container}>
            <h2>?????????????????? ????????????????</h2>
            <div className={classes.content}>
                <div className={classes.userData}>
                    <h3>???????????? ????????????</h3>
                    <Input
                        type='text'
                        label='??????'
                        value={nameValue}
                        onChange={nameChangeHandler}
                        isValid={isNameValid}
                        errorMessage='?????????????????? ?????? ????????' />
                    <Input
                        type='text'
                        label='??????????????'
                        value={surnameValue}
                        onChange={surnameBlurHandler}
                        isValid={isSurnameValid}
                        errorMessage='?????????????????? ?????? ????????' />
                </div>
                <div className={classes.userData}>
                    <h3>?????????????? ????????????</h3>
                    <Input
                        type='password'
                        label='?????????? ????????????'
                        value={passwordValue}
                        onChange={passwordChangeHandler}
                        isValid={isPasswordValid}
                        errorMessage='?????????????????????? ?????????? ????????????: 6 ????????????????'
                        autoComplete='off' />
                    <Input
                        type='password'
                        label='?????????????????? ????????????'
                        value={repeatPasswordValue}
                        onChange={repeatPasswordChangeHandler}
                        isValid={isRepeatPasswordValid}
                        errorMessage='???????????? ???? ??????????????????'
                        autoComplete='off' />
                </div>
            </div>
            <div className={classes.buttons}>
                <Button cls='primary' text={'??????????????????'} onClick={saveData}></Button>
            </div>
        </div>
    )
}

export default AccountSettings;