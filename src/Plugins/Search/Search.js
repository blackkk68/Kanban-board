import React, { useState, useRef } from 'react';
import classes from './Search.module.scss';

function Search(props) {
    const [isSearchInputOpen, setIsSearchInputOpen] = useState(false);
    const [searchInputValue, setSearchInputValue] = useState('');
    const searchRef = useRef(null);
    const inputRef = useRef(null);

    function searchIconClickHandler() {
        if (isSearchInputOpen && !searchInputValue) {
            setIsSearchInputOpen(false)
        } else {
            setIsSearchInputOpen(true);
            inputRef.current.focus();
        }
    }

    function searchInputBlurHandler() {
        if (isSearchInputOpen && !searchInputValue) {
            setIsSearchInputOpen(false)
        }
    }

    function crossClickHandler() {
        setSearchValue('');
        inputRef.current.focus();
    }

    function inputChangeHndler(evt) {
        setSearchValue(evt.target.value);
    }

    function setSearchValue(value) {
        setSearchInputValue(value);
        if (props.setSearchClients) {
            props.setSearchClients(value);
        } else if (props.setColumnsSearch) {
            props.setColumnsSearch(value);
        }
    }

    return (
        <div className={`${classes.Search} ${isSearchInputOpen ? classes.open : ''}`} ref={searchRef} >
            <i className={`fa fa-search ${classes.searchIcon} ${isSearchInputOpen ? classes.open : ''}`} onClick={searchIconClickHandler} />
            <input
                type='text'
                className={`${classes.searchInput} ${isSearchInputOpen ? classes.open : ''}`}
                ref={inputRef}
                value={searchInputValue}
                onChange={inputChangeHndler}
                onBlur={searchInputBlurHandler}
                placeholder='Искать...' />
            {isSearchInputOpen
                ? <i className={`fa fa-times ${classes.cross} ${searchInputValue ? classes.shown : ''}`} onClick={crossClickHandler}></i>
                : null}
        </div>
    )
}

export default Search;