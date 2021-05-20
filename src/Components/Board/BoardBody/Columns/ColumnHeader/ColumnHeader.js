import React, { useState, useRef } from 'react';
import classes from './ColumnHeader.module.scss';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import columnsStore from '../../../../../Store/columns';

function ColumnHeader(props) {
    const [isHeading, setIsHeading] = useState(true);
    const [headingValue, setHeadingValue] = useState(props.heading.trim());
    const inputRef = useRef(null);

    function changeHeadingTag() {
        setIsHeading(false);
        inputRef.current.focus();
    }

    function blurHeadingHandler() {
        setIsHeading(true);
    }

    function inputChangeHandler(evt) {
        setHeadingValue(evt.target.value);
        const columns = JSON.parse(localStorage.getItem('columns'));
        const colIndex = columns.findIndex(item => item.id === props.id);
        columns[colIndex].heading = evt.target.value;
        columnsStore.updateColumns(columns);
    }

    return (
        <div className={classes.ColumnHeader}>
            <div className={classes.headerContainer}>
                <input
                    className={`${classes.heading} ${isHeading ? classes.text : classes.input}`}
                    type='text'
                    ref={inputRef}
                    value={headingValue}
                    onChange={inputChangeHandler}
                    readOnly={isHeading}
                    onBlur={blurHeadingHandler} />
                <CreateOutlinedIcon className={`${classes.pencil} ${isHeading ? null : classes.hidden}`} onClick={changeHeadingTag} />
            </div>
        </div>
    )
}

export default ColumnHeader;