import React from 'react';
import classes from './ArchiveBody.module.scss';
import Icon from '@material-ui/core/Icon';
import plus from '../../../Img/empty-box.svg';

function ArchiveBody(props) {
    function itemClickHandler(taskId) {
        props.openModal(taskId);
    }

    return (
        <div className={classes.ArchiveBody}>
            {props.archive.length
                ? <ul className={classes.list}>
                    {props.archive.map(item => {
                        return (
                            <li className={classes.item} key={item.id} onClick={() => itemClickHandler(item.id)}>
                                <span className={classes.taskHeading}>{item.heading}</span>
                                <span className={classes.taskText}>{item.text}</span>
                            </li>
                        )
                    })}
                </ul>
                : <div className={classes.noArchivePlaceholder}>
                    <Icon>
                        <img src={plus} alt='Пустая коробка' />
                    </Icon>
                    <p>Здесь будут храниться удаленные задания</p>
                </div>
            }
        </div>
    )
}

export default ArchiveBody;