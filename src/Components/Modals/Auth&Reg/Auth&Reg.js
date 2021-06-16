import React, { useState } from 'react';
import classes from './Modal.module.scss';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Login from './Login';
import RestorePassword from './RestorePassword';
import Registration from './Registration';

function AuthAndReg(props) {
    const [isPasswordForgotten, setIsPasswordForgotten] = useState(false);

    function forgotPassword() {
        setIsPasswordForgotten(true);
    }

    function recallPassword() {
        setIsPasswordForgotten(false);
    }

    return (
        <div className={classes.Container}>
            {isPasswordForgotten ? <ArrowBackIosIcon className={classes.arrow} onClick={recallPassword} /> : null}
            {props.isRegModalCurrent
                ? <Registration logIn={props.logIn} />
                : isPasswordForgotten
                    ? <RestorePassword closeModal={props.closeModal} />
                    : <Login logIn={props.logIn} forgotPassword={forgotPassword} />
            }
        </div>
    )
}

export default AuthAndReg;