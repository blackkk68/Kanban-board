import React, { useState, useEffect } from 'react';
import classes from './SpacesSidebar.module.scss';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import Input from '../../../../Plugins/Input/Input';
import ClearIcon from '@material-ui/icons/Clear';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddNewUser from '../../../Modals/AddNewUser';
import spacesStore from '../../../../Store/spaces';

function SpacesSidebar(props) {
    const spaces = JSON.parse(localStorage.getItem('spaces'));
    const currentSpace = spaces[props.clickedSpaceIndex];
    const [isCurrentSpaceActive, setIsCurrentSpaceActive] = useState('');
    const [titleValue, setTitleValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [users, setUsers] = useState([]);
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);

    useEffect(() => {
        setTitleValue(currentSpace.title);
        setDescriptionValue(currentSpace.description);
        setUsers(currentSpace.users);
        setIsCurrentSpaceActive(currentSpace.isActive);
    }, [props.clickedSpaceIndex])

    function crossClickHandler() {
        props.closeSidebar();
        updateSpaces();
    }

    function updateSpaces() {
        currentSpace.title = titleValue;
        currentSpace.description = descriptionValue;
        spacesStore.updateSpaces(spaces);
    }

    function addUserClickHandler() {
        setIsAddUserOpen(true);
    }

    function closeModal() {
        setIsAddUserOpen(false);
    }

    function activateSpace() {
        spaces.forEach(item => {
            item.isActive = false;
        });
        currentSpace.isActive = true;
        updateSpaces();
        setIsCurrentSpaceActive(true);
        props.setDataFromServer();
    }

    return (
        <React.Fragment>
            <div className={`${classes.SpacesSidebar} ${props.isSidebalOpen ? classes.open : ''}`}>
                <div className={classes.buttons}>
                    <ClearIcon className={classes.cross} onClick={crossClickHandler} />
                    <button className={`${classes.activateButton} ${isCurrentSpaceActive ? classes.disabled : ''}`} onClick={activateSpace}>Активировать</button>
                </div>
                <div className={classes.inputs}>
                    <Input
                        label='Название'
                        value={titleValue}
                        onChange={evt => setTitleValue(evt.target.value)} />
                    <Input
                        label='Описание'
                        value={descriptionValue}
                        onChange={evt => setDescriptionValue(evt.target.value)}
                        style={{ height: '56px' }} />
                </div>
                <div className={classes.users}>
                    <p>Пользователи:</p>
                    <ul className={classes.usersList}>
                        {users.map(item => {
                            return (
                                <li key={item.id}>
                                    <AccountCircleIcon />
                                    <span>{`${item.name} ${item.surname}`}</span>
                                </li>
                            )
                        })}
                        <li onClick={addUserClickHandler}>
                            <PersonAddOutlinedIcon />
                            <span>Пригласить</span>
                        </li>
                    </ul>
                </div>
            </div>
            {isAddUserOpen
                ? <AddNewUser currentSpace={currentSpace} closeModal={closeModal} />
                : null}
        </React.Fragment>
    )
}

export default SpacesSidebar;