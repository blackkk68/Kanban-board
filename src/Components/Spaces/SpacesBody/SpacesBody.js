import React from 'react';
import classes from './SpacesBody.module.scss';

function SpacesBody(props) {
    const spaces = JSON.parse(localStorage.getItem('spaces'));

    function spaceClickHandler(idx) {
        spaces.forEach((item, index) => {
            if (index !== idx) {
                item.isActive = false;
            } else {
                item.isActive = true;
                props.updateActiveSpace(item);
            }
        });
        props.updateSpaces(spaces);
    }

    return (
        <div className={classes.SpacesBody}>
            <ul className={classes.list}>
                {spaces.map((item, index) => {
                    return (
                        <li className={classes.item} key={item.id} onClick={() => spaceClickHandler(index)}>
                            <span className={classes.taskText}>{item.title}</span>
                            {item.isActive
                                ? <i className="fa fa-check" aria-hidden="true"></i>
                                : null}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default SpacesBody;