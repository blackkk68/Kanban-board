import React from 'react';
import classes from './ArchiveBody.module.scss';
import Icon from '@material-ui/core/Icon';
import plus from '../../../Img/empty-box.svg';
import archiveStore from '../../../Store/archive';

function ArchiveBody(props) {
    const regexp = new RegExp(`${props.searchValue}`, 'gi');
    const filteredArchive = archiveStore.archive.filter(item => item.heading.match(regexp));

    function itemClickHandler(taskId) {
        props.openModal(taskId);
    }

    return (
        <div className={classes.ArchiveBody}>
            {archiveStore.archive.length
                ? <ul className={classes.list}>
                    {filteredArchive.map(item => {
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