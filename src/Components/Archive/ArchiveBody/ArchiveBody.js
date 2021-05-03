import React from 'react';
import classes from './ArchiveBody.module.scss';

function ArchiveBody(props) {
    function itemClickHandler(taskId) {
        props.openModal(taskId);
    }

    return (
        <section className={classes.ArchiveBody}>
            <ul className={classes.list}>
                {props.archive.map(item => {
                    return <li className={classes.item} key={item.id} onClick={() => itemClickHandler(item.id)}>
                        <span className={classes.taskHeading}>{item.heading}</span>
                        <span className={classes.taskText}>{item.text}</span>
                    </li>
                })}
            </ul>
        </section>
    )
}

export default ArchiveBody;