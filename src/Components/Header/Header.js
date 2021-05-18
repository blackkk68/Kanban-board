import React, { useState } from 'react';
import classes from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { Icon } from '@material-ui/core';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';
import PermContactCalendarOutlinedIcon from '@material-ui/icons/PermContactCalendarOutlined';
import man from '../../Img/man.svg';
import woman from '../../Img/woman.svg';

function Header(props) {
    const [isHeaderOpen, setIsHeaderOpen] = useState(false);

    function toggleHeader() {
        setIsHeaderOpen(isHeaderOpen ? false : true);
    }

    function closeHeader() {
        setIsHeaderOpen(false);
    }

    function logOutHandler() {
        props.updateIsLogined(false);
        setIsHeaderOpen(false);
    }

    return (
        <React.Fragment>
            <div
                className={`${classes.overlay} ${isHeaderOpen ? classes.open : classes.hidden}`}
                onClick={closeHeader}>
            </div>
            <header className={`${classes.Header} ${isHeaderOpen ? classes.open : ''}`}>
                <MenuOutlinedIcon className={classes.burger} onClick={toggleHeader} />
                <div className={classes.authorization}>
                    <Icon className={classes.userIcon}>
                        <img src={props.userData.sex === 'male' ? man : woman} alt='Иконка пользователя' />
                    </Icon>
                    <span className={classes.userName} onClick={logOutHandler}>{`${props.userData.name} ${props.userData.surname}`}</span>
                </div>
                <div className={classes.spaces}>
                    <span className={classes.currentSpace}>{props.activeSpace.title}</span>
                </div>
                <nav className={classes.navigation}>
                    <ul>
                        <li onClick={() => setIsHeaderOpen(false)}>
                            <NavLink to={`/${props.activeSpace.id}/`} exact activeClassName={classes.active}>
                                <DashboardOutlinedIcon />
                                <span>Доска заданий</span>
                            </NavLink>
                        </li>
                        <li onClick={() => setIsHeaderOpen(false)}>
                            <NavLink to={`/${props.activeSpace.id}/clients`} activeClassName={classes.active}>
                                <PermContactCalendarOutlinedIcon />
                                <span>Клиенты</span>
                            </NavLink>
                        </li>
                        <li onClick={() => setIsHeaderOpen(false)}>
                            <NavLink to={`/${props.activeSpace.id}/archive`} activeClassName={classes.active}>
                                <ArchiveOutlinedIcon />
                                <span>Архив</span>
                            </NavLink>
                        </li>
                        <li onClick={() => setIsHeaderOpen(false)}>
                            <NavLink to='/spaces' activeClassName={classes.active}>
                                <AccountTreeOutlinedIcon />
                                <span>Пространства</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </React.Fragment >
    )
}

export default Header;