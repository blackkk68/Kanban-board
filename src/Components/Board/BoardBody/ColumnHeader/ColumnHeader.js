import React, { useState, useRef } from 'react';
import classes from './ColumnHeader.module.scss';

function ColumnHeader(props) {
    const [isHeading, setIsHeading] = useState(true);
    const [headingValue, setHeadingValue] = useState(props.heading.trim());
    const inputRef = useRef(null);
    const kebabRef = useRef(null);

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
        props.updateColumns(columns);
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
                <i className={['fa', 'fa-pencil', isHeading ? '' : classes.hidden].join(' ')} onClick={changeHeadingTag} ref={kebabRef}></i>
            </div>
        </div>
    )
}

export default ColumnHeader;