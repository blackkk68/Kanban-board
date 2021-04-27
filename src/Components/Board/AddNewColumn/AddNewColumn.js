import React, { useState, useRef, useEffect } from 'react';
import classes from './AddNewColumn.module.scss';

function AddNewColumn(props) {
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const componentRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        function closeInput(evt) {
            if (isOpen && !inputValue && !componentRef.current.contains(evt.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('click', closeInput);
        return () => {
            document.removeEventListener('click', closeInput);
        }
    }, [isOpen, inputValue])

    class Column {
        constructor(heading) {
            this.id = new Date().getTime();
            this.heading = heading;
            this.tasks = [];
        }
    }

    function addColumn() {
        const newColumn = new Column(inputValue);
        const columns = JSON.parse(localStorage.getItem('columns'));
        if (columns) {
            columns.push(newColumn);
            props.updateColumns(columns);
        } else {
            props.updateColumns([newColumn]);
        }
    }

    function plusClickHandler() {
        if (inputValue) {
            addColumn();
            setIsOpen(false);
            setInputValue('');
        } else {
            isOpen ? setIsOpen(false) : setIsOpen(true);
            setTimeout(() => {
                inputRef.current.focus();
            }, 0);
        }
    }

    function keyHandler(evt) {
        if (evt.code === 'Enter') {
            plusClickHandler();
        }
    }

    return (
        <div className={`${classes.AddNewColumn} ${isOpen ? classes.open : ''}`} ref={componentRef}>
            <input
                className={`${classes.input} ${isOpen ? classes.open : ''}`}
                type='text' required onChange={evt => setInputValue(evt.target.value)}
                value={inputValue}
                placeholder='Новый этап'
                ref={inputRef}
                readOnly={!isOpen}
                onKeyDown={keyHandler} />
            <i className={`fa fa-plus-circle ${classes.plus}`} onClick={plusClickHandler}></i>
        </div>
    )
}

export default AddNewColumn;