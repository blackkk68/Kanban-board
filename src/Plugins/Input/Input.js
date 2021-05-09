import React from 'react';
import classes from './Input.module.scss';

function Input(props) {
    const inputType = props.type || 'text';
    const htmlFor = Math.random().toString(36);

    function changeHandler(evt) {
        props.onChange(evt);
        evt.target.style.height = props.style ? '56px' : '35px';
        evt.target.style.height = evt.target.scrollHeight + 'px';
    }

    return (
        <div className={classes.InputContainer}>
            <label htmlFor={htmlFor} className={classes.label}>{props.placeholder}</label>
            <textarea
                rows='1'
                id={htmlFor}
                className={classes.input}
                value={props.value}
                type={inputType}
                onClick={props.onClick}
                onChange={changeHandler}
                autoFocus={props.autoFocus}
                required={props.required}
                readOnly={props.readOnly}
                style={props.style}
            />
        </div>
    )
}

export default Input;