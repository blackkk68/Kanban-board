import React, { useState } from 'react';
import classes from './Modal.module.scss';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Login from './Login';
import RestorePassword from './RestorePassword';
import Registration from './Registration';

function AuthAndReg(props) {
    const [isPasswordForgotten, setIsPasswordForgotten] = useState(false);

    function crossClickHandler() {
        props.closeModal();
    }

    function forgotPassword() {
        setIsPasswordForgotten(true);
    }

    function recallPassword() {
        setIsPasswordForgotten(false);
    }

    return (
        <div className={classes.Container}>
            {isPasswordForgotten ? <ArrowBackIosIcon className={classes.arrow} onClick={recallPassword} /> : null}
            <CloseIcon className={classes.cross} onClick={crossClickHandler} />
            {props.isRegModalCurrent
                ? <Registration setDataFromServer={props.setDataFromServer} />
                : isPasswordForgotten
                    ? <RestorePassword closeModal={props.closeModal} />
                    : <Login setDataFromServer={props.setDataFromServer} forgotPassword={forgotPassword} />
            }
        </div>
    )
}

export default AuthAndReg;