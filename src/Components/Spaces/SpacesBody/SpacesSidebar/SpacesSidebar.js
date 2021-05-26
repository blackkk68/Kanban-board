import React, { useState, useEffect } from 'react';
import classes from './SpacesSidebar.module.scss';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import Input from '../../../../Plugins/Input/Input';
import ClearIcon from '@material-ui/icons/Clear';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddNewUser from '../../../Modals/AddNewUser';
import spacesStore from '../../../../Store/spaces';

function SpacesSidebar(props) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const activeSpace = { ...spacesStore.activeSpace };
    const spaces = spacesStore.spaces.slice();
    const currentSpace = spaces[props.clickedSpaceIndex];
    const isUserCreator = userData.id === currentSpace.creatorId;
    const [isCurrentSpaceActive, setIsCurrentSpaceActive] = useState('');
    const [titleValue, setTitleValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [users, setUsers] = useState([]);
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

    useEffect(() => {
        if (isContextMenuOpen) {
            document.addEventListener('click', toggleContextMenu);
        }
        return () => {
            document.removeEventListener('click', toggleContextMenu);
        }
    }, [isContextMenuOpen]);

    useEffect(() => {
        setTitleValue(currentSpace.title);
        setDescriptionValue(currentSpace.description);
        setUsers(currentSpace.users);
        setIsCurrentSpaceActive(currentSpace.id === activeSpace.id);
    }, [props.clickedSpaceIndex]);

    function crossClickHandler() {
        props.closeSidebar();
        updateSpaces();
    }

    function blurHandler() {
        updateSpaces();
    }

    function updateSpaces(newActiveSpace = activeSpace) {
        currentSpace.title = titleValue;
        currentSpace.description = descriptionValue;
        spacesStore.updateSpacesServerData(spaces, newActiveSpace);
    }

    function activateSpace() {
        updateSpaces(currentSpace);
        setIsCurrentSpaceActive(true);
        props.setDataFromServer();
    }

    function toggleAddUserModal() {
        isAddUserOpen ? setIsAddUserOpen(false) : setIsAddUserOpen(true);
    }

    function toggleContextMenu() {
        isContextMenuOpen ? setIsContextMenuOpen(false) : setIsContextMenuOpen(true);
    }

    function leaveSpace() {
        props.toggleConfirmLeaveSpaceModal(props.clickedSpaceIndex);
        props.closeSidebar();
    }

    function removeSpace() {
        props.toggleConfirmRemoveSpaceModal(props.clickedSpaceIndex);
        props.closeSidebar();
    }

    function removeUser(userId) {
        props.toggleConfirmRemoveUserModal(userId, props.clickedSpaceIndex);
        props.closeSidebar();
    }

    return (
        <React.Fragment>
            <div className={`${classes.SpacesSidebar} ${props.isSidebalOpen ? classes.open : ''}`}>
                <div className={classes.buttons}>
                    <ClearIcon onClick={crossClickHandler} />
                    <MoreVertIcon className={isCurrentSpaceActive && isUserCreator && !currentSpace.isDeletable ? classes.disabled : ''} onClick={toggleContextMenu} />
                </div>
                {isContextMenuOpen
                    ? <div className={classes.contextMenu}>
                        <ul>
                            {isCurrentSpaceActive
                                ? null
                                : <li onClick={activateSpace}>Активировать</li>}
                            {isUserCreator
                                ? currentSpace.isDeletable ? <li onClick={removeSpace}>Удалить</li> : null
                                : <li onClick={leaveSpace}>Покинуть</li>}
                        </ul>
                    </div>
                    : null}
                <div className={classes.inputs}>
                    <Input
                        label='Название'
                        value={titleValue}
                        onChange={evt => setTitleValue(evt.target.value)}
                        onBlur={blurHandler} />
                    <Input
                        label='Описание'
                        value={descriptionValue}
                        onChange={evt => setDescriptionValue(evt.target.value)}
                        style={{ height: '56px' }}
                        onBlur={blurHandler} />
                </div>
                <div className={classes.users}>
                    <p>Пользователи</p>
                    <ul className={classes.usersList}>
                        {users.map(item => {
                            return (
                                <li key={item.id}>
                                    <div className={classes.user}>
                                        <AccountCircleIcon />
                                        <span>{item.name}</span>
                                        <span>{item.surname}</span>
                                    </div>
                                    {userData.id === item.id || item.id === currentSpace.creatorId
                                        ? null
                                        : <DeleteOutlineOutlinedIcon className={classes.trash} onClick={() => removeUser(item.id)} />}
                                </li>
                            )
                        })}
                        <li className={classes.addUser} onClick={toggleAddUserModal}>
                            <div className={classes.user}>
                                <PersonAddOutlinedIcon />
                                <span>Пригласить</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            {isAddUserOpen
                ? <AddNewUser currentSpace={currentSpace} closeModal={toggleAddUserModal} />
                : null}
        </React.Fragment>
    )
}

export default SpacesSidebar;