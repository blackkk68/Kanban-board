import React, { useState } from 'react';
import classes from './SpacesBody.module.scss';
import SpacesSidebar from './SpacesSidebar/SpacesSidebar';
import spacesStore from '../../../Store/spaces';
import CheckIcon from '@material-ui/icons/Check';

function SpacesBody(props) {
    const [clickedSpaceIndex, setClickedSpaceIndex] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    function spaceClickHandler(index) {
        if (!isSidebarOpen) {
            setIsSidebarOpen(true);
        }
        setClickedSpaceIndex(index);
    }

    function closeSidebar() {
        setIsSidebarOpen(false);
    }

    return (
        <div className={classes.SpacesBody}>
            <ul className={classes.list}>
                {spacesStore.spaces.map((item, index) => {
                    return (
                        <li className={classes.item} key={item.id} onClick={() => spaceClickHandler(index)}>
                            <div>
                                <span className={classes.title}>{item.title}</span>
                                {item.description.length
                                    ? <span className={classes.description}>{item.description}</span>
                                    : null}
                            </div>
                            {item.id === spacesStore.activeSpace.id
                                ? <CheckIcon />
                                : null}
                        </li>
                    )
                })}
            </ul>
            {isSidebarOpen
                ? <SpacesSidebar
                    clickedSpaceIndex={clickedSpaceIndex}
                    closeSidebar={closeSidebar}
                    isSidebarOpen={isSidebarOpen}
                    setDataFromServer={props.setDataFromServer} />
                : null}
        </div>
    )
}

export default SpacesBody;