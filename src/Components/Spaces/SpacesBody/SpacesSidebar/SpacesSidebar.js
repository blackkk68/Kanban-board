import React, { useState, useEffect, useRef } from 'react';
import classes from './SpacesSidebar.module.scss';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import Input from '../../../../Plugins/Input/Input';
import ClearIcon from '@material-ui/icons/Clear';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import spacesStore from '../../../../Store/spaces';
import { Transition } from 'react-transition-group';
import ContextMenu from '../../../../HOC/ContextMenu/ContextMenu';

function SpacesSidebar(props) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const activeSpace = { ...spacesStore.activeSpace };
    const spaces = spacesStore.spaces.slice();
    const currentSpace = spaces[props.clickedSpaceIndex];
    const isUserCreator = currentSpace ? userData.id === currentSpace.creatorId : null;
    const [isCurrentSpaceActive, setIsCurrentSpaceActive] = useState('');
    const [titleValue, setTitleValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [users, setUsers] = useState([]);
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
    const [sidebarTransitionClass, setSidebarTransitionClass] = useState(null);
    const kebabRef = (null);
    const sidebarRef = useRef(null);

    useEffect(() => {
        if (currentSpace) {
            setTitleValue(currentSpace.title);
            setDescriptionValue(currentSpace.description);
            setUsers(currentSpace.users);
            setIsCurrentSpaceActive(currentSpace.id === activeSpace.id);
        }
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
        if (isCurrentSpaceActive) {
            spacesStore.updateSpacesServerData(spaces, currentSpace);
        } else {
            spacesStore.updateSpacesServerData(spaces, newActiveSpace);
        }
    }

    function closeContextMenu() {
        if (isContextMenuOpen) {
            setIsContextMenuOpen(false);
        }
    }

    function openContextMenu() {
        if (!isContextMenuOpen) {
            setIsContextMenuOpen(true);
        }
    }

    function removeUser(userId) {
        props.toggleConfirmRemoveUserModal(userId, props.clickedSpaceIndex);
        props.closeSidebar();
    }

    function activateSpace() {
        updateSpaces(currentSpace);
        setIsCurrentSpaceActive(true);
        closeContextMenu();
    }

    function leaveSpace() {
        props.toggleConfirmLeaveSpaceModal(props.clickedSpaceIndex);
        closeContextMenu();
        props.closeSidebar();
    }

    function removeSpace() {
        props.toggleConfirmRemoveSpaceModal(props.clickedSpaceIndex);
        closeContextMenu();
        props.closeSidebar();
    }

    return (
        <Transition
            in={props.isSidebarOpen}
            timeout={{ exit: 200 }}
            mountOnEnter
            unmountOnExit
            nodeRef={sidebarRef}
            onExiting={() => setSidebarTransitionClass(classes.exiting)}
            onEntered={() => setSidebarTransitionClass(classes.entered)}
            onEntering={() => setSidebarTransitionClass(classes.entering)}>
            <div className={`${classes.SpacesSidebar} ${sidebarTransitionClass}`} ref={sidebarRef}>
                <div className={classes.buttons}>
                    <ClearIcon onClick={crossClickHandler} />
                    <MoreVertIcon
                        className={isCurrentSpaceActive && isUserCreator && !currentSpace.isDeletable ? classes.disabled : ''}
                        onClick={isCurrentSpaceActive && isUserCreator && !currentSpace.isDeletable ? null : openContextMenu}
                        ref={kebabRef} />
                </div>
                <ContextMenu isContextMenuOpen={isContextMenuOpen} closeContextMenu={closeContextMenu}>
                    <ul className={classes.contextMenu}>
                        <li className={isCurrentSpaceActive ? classes.disabled : ''} onClick={isCurrentSpaceActive ? null : activateSpace}>Активировать</li>
                        {isUserCreator
                            ? <li className={currentSpace.isDeletable ? '' : classes.disabled} onClick={currentSpace.isDeletable ? removeSpace : null}>Удалить</li>
                            : <li onClick={leaveSpace}>Покинуть</li>}
                    </ul>
                </ContextMenu>
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
                        isBig={true}
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
                        <li className={classes.addUser} onClick={() => props.toggleAddUserModal(currentSpace)}>
                            <div className={classes.user}>
                                <PersonAddOutlinedIcon />
                                <span>Пригласить</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </Transition>
    )
}

export default SpacesSidebar;