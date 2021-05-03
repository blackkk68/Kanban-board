import React, { useState } from 'react';
import classes from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import AuthAndReg from '../Modals/Auth&Reg';

function Header() {
    const [isHeaderOpen, setIsHeaderOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    function toggleHeader() {
        setIsHeaderOpen(isHeaderOpen ? false : true);
    }

    function closeHeader() {
        setIsHeaderOpen(false);
    }

    function enterClickHandler() {
        setIsAuthModalOpen(true);
        toggleHeader();
    }

    function closeModal() {
        setIsAuthModalOpen(false);
    }

    return (
        <React.Fragment>
            <div
                className={`${classes.overlay} ${isHeaderOpen ? classes.open : classes.hidden}`}
                onClick={closeHeader}>
            </div>
            <header className={`${classes.Header} ${isHeaderOpen ? classes.open : ''}`}>
                <li className={`fa ${classes.cross} ${isHeaderOpen ? 'fa-times' : 'fa-bars'}`}
                    onClick={toggleHeader} />
                <div className={classes.authorization}>
                    <div className={classes.userIcon}><i className="fa fa-user-o"></i></div>
                    <div className={classes.userInform} onClick={enterClickHandler}>Войти</div>
                </div>
                <nav className={classes.navigation}>
                    <ul>
                        <li onClick={() => setIsHeaderOpen(false)}>
                            <NavLink to='/' exact activeClassName={classes.active}><i className="fa fa-tasks"></i> Доска заданий</NavLink>
                        </li>
                        <li onClick={() => setIsHeaderOpen(false)}>
                            <NavLink to='/clients' activeClassName={classes.active}><i className="fa fa-address-book-o"></i> Клиенты</NavLink>
                        </li>
                        <li onClick={() => setIsHeaderOpen(false)}>
                            <NavLink to='/archive' activeClassName={classes.active}><i className="fa fa-archive"></i>Архив</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
            {isAuthModalOpen
                ? <AuthAndReg closeModal={closeModal} />
                : null}
        </React.Fragment>
    )
}

export default Header;