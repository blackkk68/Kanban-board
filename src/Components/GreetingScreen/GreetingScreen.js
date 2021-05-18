import React, { useState } from 'react';
import classes from './GreetingScreen.module.scss';
import Button from '../../Plugins/Button/Button';
import AuthAndReg from '../Modals/Auth&Reg';
import greetScreenImg from '../../Img/greet-img.png';

function GreetingScreen(props) {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isRegModalCurrent, setIsRegModalCurrent] = useState(false);

    function closeModal() {
        setIsAuthModalOpen(false);
    }

    function regClickHandler() {
        setIsAuthModalOpen(true);
        setIsRegModalCurrent(true);
    }

    function enterClickHandler() {
        setIsAuthModalOpen(true);
        setIsRegModalCurrent(false);
    }

    return (
        <React.Fragment>
            <div className={classes.GreetingScreen}>
                <div className={classes.textContainer}>
                    <h1>Добро пожаловать!</h1>
                    <p>Канбан доска - ваш удобный помощник в планировании и решении рабочих дел! Заходи и пользуйся временем с умом!</p>
                    <div className={classes.buttons}>
                        <Button cls='auth' text='Регистрация' onClick={regClickHandler} />
                        <Button cls='auth' text='Вход' onClick={enterClickHandler} />
                    </div>
                </div>
                <div>
                    <img src={greetScreenImg} alt='Логотип' />
                </div>
            </div>
            {isAuthModalOpen
                ? <AuthAndReg
                    closeModal={closeModal}
                    isRegModalCurrent={isRegModalCurrent}
                    updateIsLogined={props.updateIsLogined}
                    updateUserData={props.updateUserData}
                    updateSpaces={props.updateSpaces}
                    updateActiveSpace={props.updateActiveSpace}
                    updateTokenData={props.updateTokenData} />
                : null}
        </React.Fragment>
    )
}

export default GreetingScreen;