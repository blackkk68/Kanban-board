import React from 'react';
import classes from './Plus.module.scss';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

function Plus(props) {
    return (
        <AddCircleOutlineIcon style={{ width: '39px', height: '39px' }} className={classes.Plus} onClick={props.onClick} />
    )
}

export default Plus;