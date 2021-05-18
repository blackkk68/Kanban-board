import React, { useRef, useEffect } from 'react';
import classes from './Input.module.scss';

function Input(props) {
    const htmlFor = Math.random().toString(36);
    const textAreaRef = useRef(null);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = props.style ? '56px' : '35px';
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
        }
    }, [props.style]);

    return (
        <div className={classes.InputContainer}>
            {props.type
                ? <React.Fragment>
                    <label htmlFor={htmlFor} className={classes.label}>{props.label}</label>
                    <input
                        id={htmlFor}
                        name={props.name}
                        className={classes.input}
                        value={props.value}
                        type={props.type}
                        onClick={props.onClick}
                        onChange={props.onChange}
                        autoFocus={props.autoFocus}
                        required={props.required}
                        readOnly={props.readOnly}
                        placeholder={props.placeholder}
                        disabled={props.disabled} />
                </React.Fragment>
                : <React.Fragment>
                    <label htmlFor={htmlFor} className={classes.label}>{props.label}</label>
                    <textarea
                        ref={textAreaRef}
                        rows='1'
                        id={htmlFor}
                        className={classes.input}
                        value={props.value}
                        onClick={props.onClick}
                        onChange={props.onChange}
                        autoFocus={props.autoFocus}
                        required={props.required}
                        readOnly={props.readOnly}
                        style={props.style}
                        placeholder={props.placeholder}
                        disabled={props.disabled} />
                </React.Fragment>
            }
        </div>
    )
}

export default Input;