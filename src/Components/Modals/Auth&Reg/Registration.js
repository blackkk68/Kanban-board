import React, { useState } from 'react';
import classes from './Modal.module.scss';
import Input from '../../../Plugins/Input/Input';
import Button from '../../../Plugins/Button/Button';
import userDataStore from '../../../Store/userData';
import tokenDataStore from '../../../Store/tokenData';
import spacesStore from '../../../Store/spaces';
import { useHistory } from 'react-router-dom';
import { UserDataServer, UserDataLocal, Space } from '../../../Other/Classes';
import { nameValidation, surnameValidation, emailValidation, passwordValidation, repeatPasswordValidation } from '../../../Other/InputsValidation';
import VerifyEmail from './VerifyEmail';
import { setDataFromServer } from '../../../Other/SetDataFromServer';
import axios from 'axios';

function Registration(props) {
    const apiKey = 'AIzaSyAwu9n1vxYzjojiWKrVsrkhLQZllm3uOAQ';
    const [nameValue, setNameValue] = useState('');
    const [surnameValue, setSurnameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [repeatPasswordValue, setRepeatPasswordValue] = useState('');
    const [isNameValid, setIsNameValid] = useState(null);
    const [isSurnameValid, setIsSurnameValid] = useState(null);
    const [isEmailValid, setIsEmailValid] = useState(null);
    const [isPasswordValid, setIsPasswordValid] = useState(null);
    const [isRepeatPasswordValid, setRepeatIsPasswordValid] = useState(null);
    const [isRepeatPasswordTouched, setIsRepeatPasswordTouched] = useState(false);
    const [isVerifyEmailModalOpen, setIsVerifyEmailModalOpen] = useState(false);
    const [userId, setUserId] = useState(null);
    const [tokenData, setTokenData] = useState(null);
    const [error, setError] = useState('');
    const history = useHistory();

    function nameChangeHandler(evt) {
        setNameValue(evt.target.value);
        setIsNameValid(nameValidation(evt.target.value));
    }

    function surnameChangeHandler(evt) {
        setSurnameValue(evt.target.value);
        setIsSurnameValid(surnameValidation(evt.target.value));
    }

    function emailChangeHandler(evt) {
        setEmailValue(evt.target.value);
        setIsEmailValid(emailValidation(evt.target.value));
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

    async function regSubmitHandler(evt) {
        evt.preventDefault();
        if (isEmailValid && isPasswordValid && isNameValid && isSurnameValid) {
            try {
                const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
                    email: emailValue,
                    password: passwordValue,
                    returnSecureToken: true
                });

                setTokenData({
                    token: response.data.idToken,
                    refreshToken: response.data.refreshToken,
                    expiresIn: new Date().getTime() + response.data.expiresIn * 1
                });
                setUserId(response.data.localId);

                const verifyData = { requestType: 'VERIFY_EMAIL', idToken: response.data.idToken };
                await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`, verifyData);

                localStorage.setItem('isUserVerified', false);
                setIsVerifyEmailModalOpen(true);
            } catch (err) {
                console.error('err: ', err);
                setError('???????????? email ?????? ??????????????????????????????');
            }
        } else {
            setError('?????????????????? ?????? ????????');
        }
    }

    async function signUp() {
        try {
            const userDataToSend = new UserDataServer(nameValue, surnameValue, emailValue, userId);
            await axios.put(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/users/${userId}.json?auth=${tokenData.token}`, userDataToSend);

            const userData = new UserDataLocal(nameValue, surnameValue, userId);
            const initialSpace = [new Space('?????? ????????????????????????', '', userData, userId, false)];

            tokenDataStore.updateTokenData(tokenData);
            userDataStore.updateUserData(userData);
            spacesStore.updateSpacesServerData(initialSpace, initialSpace[0]);
            await setDataFromServer();
            props.logIn();
            history.replace(`/${initialSpace[0].id}/`);
        } catch (err) {
            console.error('err: ', err);
        }
    }

    return isVerifyEmailModalOpen
        ? <VerifyEmail signUp={signUp} token={tokenData.token} />
        : <React.Fragment>
            <h2>??????????????????????</h2>
            <div className={classes.error}>{error.length ? <span>{error}</span> : ''}</div>
            <form onSubmit={regSubmitHandler}>
                <Input
                    type='text'
                    label='??????'
                    value={nameValue}
                    onChange={nameChangeHandler}
                    autoFocus
                    isValid={isNameValid}
                    errorMessage='?????????????????? ?????? ????????' />
                <Input
                    type='text'
                    label='??????????????'
                    value={surnameValue}
                    onChange={surnameChangeHandler}
                    isValid={isSurnameValid}
                    errorMessage='?????????????????? ?????? ????????' />
                <Input
                    type='email'
                    label='Email'
                    value={emailValue}
                    onChange={emailChangeHandler}
                    isValid={isEmailValid}
                    errorMessage='?????????????? ???????????????????? email' />
                <Input
                    type='password'
                    label='????????????'
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
                <div className={classes.buttons}>
                    <Button cls='primary' text='????????????????????????????????????' type='submit'></Button>
                </div>
            </form>
        </React.Fragment>
}

export default Registration;