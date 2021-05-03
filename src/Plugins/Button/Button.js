import React from 'react';
import classes from './Button.module.scss';

function Button(props) {
    const cls = [classes.Button, classes[props.cls]];
    return (
        <button className={cls.join(' ')} type={props.type} onClick={props.onClick}>{props.text}</button>
    )
}

export default Button;