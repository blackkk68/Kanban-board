import React, { useState, useEffect, useRef } from 'react';
import classes from './SelectClient.module.scss';
import Input from '../Input/Input';

function Select(props) {
    const clients = JSON.parse(localStorage.getItem('clients'));
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [inputValue, setInputValue] = useState(props.currentValue ? props.currentValue.companyTitle : '');
    const regexp = new RegExp(`${inputValue}`, 'gi');
    const filteredClientsList = clients.filter(item => item.companyTitle.match(regexp));
    const ref = useRef(null);

    function inputClickHandler() {
        if (!props.disabled) {
            setIsSelectOpen(isSelectOpen ? false : true);
        }
    }

    function inputChangeHandler(evt) {
        setIsSelectOpen(true);
        setInputValue(evt.target.value);
        if (evt.target.value === '') {
            addOrUpdateClient();
        }
    }

    function clientClickHandler(client) {
        addOrUpdateClient(client);
        setInputValue(client.companyTitle);
        setIsSelectOpen(false);
    }

    function resetSelect() {
        setInputValue('');
        addOrUpdateClient();
    }

    function addOrUpdateClient(client = '') {
        if (props.addClient) {
            props.addClient(client);
        } else {
            props.updateClient(client);
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
            <div>
                <Input
                    placeholder='Назначить клиента'
                    value={inputValue}
                    onChange={inputChangeHandler}
                    onClick={inputClickHandler}
                    readOnly={props.disabled} />
                {inputValue && !props.disabled ? <i className={`fa fa-times ${classes.cross}`} onClick={resetSelect} id='cross'></i> : null}
            </div>
            <div className={`${classes.selectOptions} ${(isSelectOpen && filteredClientsList.length) ? '' : classes.hidden}`}>
                <ul className={`${classes.optionsList} ${filteredClientsList.length > 3 ? classes.scrollable : ''}`}>
                    {filteredClientsList.map(item => {
                        return <li onClick={() => clientClickHandler(item)} key={item.id}>{item.companyTitle}</li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Select;