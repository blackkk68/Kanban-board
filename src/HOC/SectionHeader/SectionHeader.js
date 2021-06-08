import React from 'react';
import classes from './SectionHeader.module.scss';
import Search from '../../Plugins/Search/Search';
import AddNewColumn from '../../Components/Board/AddNewColumn/AddNewColumn';

function SectionHeader(props) {

    return (
        <div className={classes.SectionHeader}>
            <h1 className={classes.heading}>{props.heading}</h1>
            <div className={classes.buttons}>
                <Search setColumnsSearch={props.setSearchValue} />
                <AddNewColumn />
            </div>
        </div>
    )
}

export default SectionHeader;