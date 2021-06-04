import React, { useState } from 'react';
import classes from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';
import PermContactCalendarOutlinedIcon from '@material-ui/icons/PermContactCalendarOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import AccountSettings from '../Modals/AccountsSettings/AccountSettings';
import userDataStore from '../../Store/userData';
import spacesStore from '../../Store/spaces';
import Modal from '../../HOC/Modal/Modal';

function Header(props) {
    const [isHeaderOpen, setIsHeaderOpen] = useState(false);
    const [isAccountSettingsModalOpen, setIsAccountSettingsModalOpen] = useState(false);

    function toggleAccountSettingsModal() {
        isAccountSettingsModalOpen ? setIsAccountSettingsModalOpen(false) : setIsAccountSettingsModalOpen(true);
    }

    function toggleHeader() {
        setIsHeaderOpen(isHeaderOpen ? false : true);
    }

    function closeHeader() {
        setIsHeaderOpen(false);
    }

    function settingsClickHandler() {
        closeHeader();
        toggleAccountSettingsModal();
    }

    return (
        <React.Fragment>
            <div className={`${classes.overlay} ${isHeaderOpen ? classes.open : classes.hidden}`} onClick={closeHeader} />
            <header className={`${classes.Header} ${isHeaderOpen ? classes.open : ''}`}>
                <MenuOutlinedIcon className={classes.burger} onClick={toggleHeader} />
                <div className={classes.account}>
                    <div className={classes.authorization}>
                        <i className="fa fa-user-o" />
                        <span className={classes.userName}>{`${userDataStore.userData.name} ${userDataStore.userData.surname}`}</span>
                    </div>
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
                <div className={classes.options}>
                    <div className={classes.settings} onClick={settingsClickHandler}>
                        <SettingsIcon />
                        <span>Настройки</span>
                    </div>
                    <div className={classes.exit} onClick={() => props.logOut()}>
                        <ExitToAppOutlinedIcon />
                        <span>Выход</span>
                    </div>
                </div>
            </header>
            <Modal isModalOpen={isAccountSettingsModalOpen} closeModal={toggleAccountSettingsModal}>
                <AccountSettings closeModal={toggleAccountSettingsModal} />
            </Modal>
        </React.Fragment >
    )
}

export default Header;