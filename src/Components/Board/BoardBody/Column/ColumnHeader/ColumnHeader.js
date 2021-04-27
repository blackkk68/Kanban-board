import React, { useState, useEffect, useRef } from 'react';
import classes from './ColumnHeader.module.scss';
import './ContextMenuTransition.scss';
import { Transition } from 'react-transition-group';

function ColumnHeader(props) {
    const [isMenuHidden, setIsMenuHidden] = useState(true);
    const [isHeading, setIsHeading] = useState(true);
    const [headingValue, setHeadingValue] = useState(props.heading.trim());
    const inputRef = useRef(null);
    const menuRef = useRef(null);
    const kebabRef = useRef(null);

    function toggleMenu() {
        isMenuHidden ? setIsMenuHidden(false) : setIsMenuHidden(true);
    }

    useEffect(() => {
        function closeMenu(evt) {
            if (menuRef.current && !menuRef.current.contains(evt.target) && !kebabRef.current.contains(evt.target)) {
                setIsMenuHidden(true);
            }
        }
        window.addEventListener('click', closeMenu);
        return () => {
            window.removeEventListener('click', closeMenu);
        }
    }, [isMenuHidden]);

    function changeHeadingTag() {
        setIsHeading(false);
        setIsMenuHidden(true);
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

    function removeColumn() {
        const columns = JSON.parse(localStorage.getItem('columns'));
        const colIndex = columns.findIndex(item => item.id === props.id);
        columns.splice(colIndex, 1);
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
                <i className={['fa', 'fa-ellipsis-v', isHeading ? '' : classes.hidden].join(' ')} onClick={toggleMenu} ref={kebabRef}></i>
            </div>
            <Transition in={!isMenuHidden} nodeRef={menuRef} timeout={{ enter: 10, exit: 200 }}>
                {status => (
                    <div className={`${classes.ContextMenu} ContextMenu-${status}`} ref={menuRef}>
                        <ul>
                            <li onClick={changeHeadingTag}>Переименовать</li>
                            <li onClick={removeColumn}>Удалить</li>
                        </ul>
                    </div>
                )}
            </Transition>
        </div>
    )
}

export default ColumnHeader;