import React, { useState } from 'react';
import classes from './GreetingScreen.module.scss';
import Button from '../../Plugins/Button/Button';
import AuthAndReg from '../Modals/Auth&Reg';

function GreetingScreen(props) {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    return (
        <React.Fragment>
            <div className={classes.GreetingScreen}>
                <div className={classes.container}>
                    <h1>Добро пожаловать!</h1>
                    <p>Канбан доска - ваш удобный помощник в планировании и решении рабочих дел! Заходи и пользуйся временем с умом!</p>
                    <div className={classes.buttons}>
                        <Button cls='auth' text='Регистрация' onClick={() => setIsAuthModalOpen(true)} />
                        <Button cls='auth' text='Вход' onClick={() => setIsAuthModalOpen(true)} />
                    </div>
                </div>
            </div>
            {isAuthModalOpen
                ? <AuthAndReg />
                : null}
        </React.Fragment>
    )
}

export default GreetingScreen;