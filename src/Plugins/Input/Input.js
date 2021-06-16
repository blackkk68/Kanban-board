import React, { useState, useEffect, useRef } from 'react';
import classes from './Input.module.scss';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';

function Input(props) {
    const [inputType, setInputType] = useState(props.type);
    const [visibilityIcon, setVisibilityIcon] = useState(<VisibilityOutlinedIcon />);
    const htmlFor = Math.random().toString(36);
    const textAreaRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        let textareaHeight = '1.9rem';
        if (window.innerWidth < 1200) {
            textareaHeight = '2rem';
        }
        if (window.innerWidth < 992) {
            textareaHeight = '2.1rem';
        }
        if (window.innerWidth < 768) {
            textareaHeight = '2.2rem';
        }
        if (textAreaRef.current) {
            textAreaRef.current.style.height = props.isBig ? '3rem' : textareaHeight;
            if (props.value) {
                textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
            }
        }
    }, [props.value, props.isBig]);

    function textareaFocusHandler(evt) {
        evt.target.selectionStart = evt.target.value.length;
    }

    function changePasswordVisibility() {
        if (inputType === 'password') {
            setInputType('text');
            setVisibilityIcon(<VisibilityOffOutlinedIcon />);
        } else if (inputType === 'text') {
            setInputType('password');
            setVisibilityIcon(<VisibilityOutlinedIcon />);
        }
    }

    function inputFocusHandler(evt) {
        if (props.onFocus) {
            props.onFocus(evt);
        }
        if (props.autoComplete === 'off') {
            inputRef.current.removeAttribute('readonly');
        }
    }

    return (
        <div className={classes.InputContainer}>
            {props.type
                ? <React.Fragment>
                    {props.type === 'password' ? <div className={classes.passwordVisibility} onClick={changePasswordVisibility}>{visibilityIcon}</div> : null}
                    <label htmlFor={htmlFor} className={classes.label}>{props.label}</label>
                    <input
                        id={htmlFor}
                        name={props.name}
                        className={`${classes.input} ${props.isValid === false ? classes.invalid : ''}`}
                        value={props.value}
                        type={inputType}
                        onClick={props.onClick}
                        onChange={props.onChange}
                        autoFocus={props.autoFocus}
                        required={props.required}
                        readOnly={props.autoComplete === 'off' ? true : props.readOnly}
                        placeholder={props.placeholder}
                        disabled={props.disabled}
                        onBlur={props.onBlur}
                        onFocus={inputFocusHandler}
                        maxLength='30'
                        ref={inputRef} />
                    {props.isValid === false ? <span className={classes.error}>{props.errorMessage}</span> : null}
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
                        disabled={props.disabled}
                        onFocus={textareaFocusHandler}
                        onBlur={props.onBlur}
                        maxLength='500' />
                </React.Fragment>
            }
        </div>
    )
}

export default Input;