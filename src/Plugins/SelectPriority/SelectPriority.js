import React, { useState, useEffect, useRef } from 'react';
import classes from './SelectPriority.module.scss';

function Select(props) {
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [inputValue, setInputValue] = useState(props.currentValue ? props.currentValue : '');
    const ref = useRef(null);

    function inputClickHandler() {
        setIsSelectOpen(isSelectOpen ? false : true);
    }

    function priorityClickHandler(value) {
        setInputValue(value);
        setIsSelectOpen(false);
        addOrUpdatePriority(value);
    }

    function resetSelect() {
        setInputValue('');
        addOrUpdatePriority();
    }

    function addOrUpdatePriority(value = '') {
        if (props.addPriority) {
            props.addPriority(value);
        } else {
            props.updatePriority(value);
        }
    }

    useEffect(() => {
        function handleClickOutside(evt) {
            if (ref.current && !ref.current.contains(evt.target)) {
                setIsSelectOpen(false);
            }
        }
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [isSelectOpen])

    return (
        <div className={classes.Select} ref={ref}>
            <div className={classes.SelectInput}>
                <input className={classes.Input} onClick={inputClickHandler} value={inputValue} placeholder='Приоритет' readOnly />
                {inputValue ? <i className={`fa fa-times ${classes.Img}`} onClick={resetSelect} id='cross'></i> : null}
            </div>
            <div className={`${classes.SelectOptions} ${isSelectOpen ? '' : classes.hidden}`}>
                <ul className={classes.OptionsList}>
                    <li onClick={() => priorityClickHandler('Низкий')}>Низкий</li>
                    <li onClick={() => priorityClickHandler('Средний')}>Средний</li>
                    <li onClick={() => priorityClickHandler('Высокий')}>Высокий</li>
                </ul>
            </div>
        </div>
    )
}

export default Select;