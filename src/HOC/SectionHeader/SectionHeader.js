import React from 'react';
import classes from './SectionHeader.module.scss';
import Search from '../../Plugins/Search/Search';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

function SectionHeader(props) {

    return (
        <div className={classes.SectionHeader}>
            <h1 className={classes.heading}>{props.heading}</h1>
            <div className={classes.buttons}>
                {props.setSearchValue ? <Search setColumnsSearch={props.setSearchValue} /> : null}
                {props.plusHandler ? <AddCircleOutlineIcon className={classes.plus} onClick={props.plusHandler} /> : null}
            </div>
        </div>
    )
}

export default SectionHeader;