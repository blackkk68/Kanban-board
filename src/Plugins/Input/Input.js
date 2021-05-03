import React from 'react';
import classes from './Input.module.scss';

function Input(props) {
    const inputType = props.type || 'text';

    return (
        <input
            className={classes.Input}
            placeholder={props.placeholder}
            value={props.value}
            type={inputType}
            onClick={props.onClick}
            onChange={props.onChange}
            autoFocus={props.autoFocus}
            required={props.required}
            readOnly={props.readOnly}
        />
    )
}

export default Input;