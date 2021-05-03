import React from 'react';
import classes from './Textarea.module.scss';

function Textarea(props) {
    return (
        <textarea
            className={classes.Textarea}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            readOnly={props.readOnly}
        />
    )
}

export default Textarea;