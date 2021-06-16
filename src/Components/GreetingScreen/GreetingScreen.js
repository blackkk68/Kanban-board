import React, { useState } from 'react';
import classes from './GreetingScreen.module.scss';
import Button from '../../Plugins/Button/Button';
import AuthAndReg from '../Modals/Auth&Reg/Auth&Reg';
import greetScreenImg from '../../Img/greet-img.png';
import Modal from '../../HOC/Modal/Modal';

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
                    <p>Канбан доска - твой удобный помощник в планировании и решении рабочих дел. Заходи и пользуйся временем с умом!</p>
                    <div className={classes.buttons}>
                        <div className={classes.button}>
                            <Button cls='auth' text='Регистрация' onClick={regClickHandler} />
                        </div>
                        <div className={classes.button}>
                            <Button cls='auth' text='Вход' onClick={enterClickHandler} />
                        </div>
                    </div>
                </div>
                <div className={classes.img}>
                    <img src={greetScreenImg} alt='Логотип' />
                </div>
            </div>
            <Modal isModalOpen={isAuthModalOpen} closeModal={closeModal}>
                <AuthAndReg closeModal={closeModal} isRegModalCurrent={isRegModalCurrent} logIn={props.logIn} />
            </Modal>
        </React.Fragment>
    )
}

export default GreetingScreen;