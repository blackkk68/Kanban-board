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
import userDataStore from '../../Store/userData';
import spacesStore from '../../Store/spaces';

function Header(props) {
    const [isHeaderOpen, setIsHeaderOpen] = useState(false);

    function toggleHeader() {
        setIsHeaderOpen(isHeaderOpen ? false : true);
    }

    function closeHeader() {
        setIsHeaderOpen(false);
    }

    function logOutHandler() {
        props.logOut();
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
                        <img src={userDataStore.userData.sex === 'male' ? man : woman} alt='Иконка пользователя' />
                    </Icon>
                    <span className={classes.userName} onClick={logOutHandler}>{`${userDataStore.userData.name} ${userDataStore.userData.surname}`}</span>
                </div>
                <div className={classes.spaces}>
                    <span className={classes.currentSpace}>{spacesStore.activeSpace.title}</span>
                </div>
                <nav className={classes.navigation}>
                    <ul>
                        <li onClick={() => setIsHeaderOpen(false)}>
                            <NavLink to={`/${spacesStore.activeSpace.id}/`} exact activeClassName={classes.active}>
                                <DashboardOutlinedIcon />
                                <span>Доска заданий</span>
                            </NavLink>
                        </li>
                        <li onClick={() => setIsHeaderOpen(false)}>
                            <NavLink to={`/${spacesStore.activeSpace.id}/clients`} activeClassName={classes.active}>
                                <PermContactCalendarOutlinedIcon />
                                <span>Клиенты</span>
                            </NavLink>
                        </li>
                        <li onClick={() => setIsHeaderOpen(false)}>
                            <NavLink to={`/${spacesStore.activeSpace.id}/archive`} activeClassName={classes.active}>
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