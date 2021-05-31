import React, { useEffect } from 'react';
import classes from './Modal.module.scss';
import Button from '../../../Plugins/Button/Button';
import axios from 'axios';

function VerifyEmail(props) {
    const apiKey = 'AIzaSyAwu9n1vxYzjojiWKrVsrkhLQZllm3uOAQ';

    async function verify() {
        const data = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, { idToken: props.token });
        localStorage.setItem('isUserVerified', true);
        if (data.data.users[0].emailVerified) {
            props.signUp();
        }
    }

    useEffect(() => {
        return () => {
            if (!localStorage.getItem('isUserVerified')) {
                localStorage.removeItem('isUserVerified');
                axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${apiKey}`, { idToken: props.token });
            }
        }
    }, []);

    return (
        <React.Fragment>
            <h2 style={{ marginBottom: '18px' }}>Подтвердите email</h2>
            <p>На ваш электронный адрес было отправлено письмо с подтверждением. Подтвердите свой email и нажмите "Продолжить"</p>
            <div className={classes.buttons}>
                <Button cls='primary' text='Продолжить' onClick={verify} ></Button>
            </div>
        </React.Fragment>
    )
}

export default VerifyEmail;