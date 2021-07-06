import React, { useState } from 'react';
import classes from './Modal.module.scss';
import Input from '../../../Plugins/Input/Input';
import Button from '../../../Plugins/Button/Button';
import columnsStore from '../../../Store/columns';
import { Column } from '../../../Other/Classes';

function AddNewColumn(props) {
    const [columnHeadingValue, setColumnHeadingValue] = useState('');
    const newColIndex = columnsStore.columns.length + 1;

    function addColumn() {
        const newColumn = new Column(columnHeadingValue, newColIndex);
        columnsStore.addColumn(newColumn);
        props.closeModal();
    }

    function keyHandler(evt) {
        if (evt.code === 'Enter') {
            addColumn();
        }
    }

    return (
        <div className={classes.Container}>
            <h2 style={{ marginBottom: '10px' }}>Добавить этап</h2>
            <div className={classes.form} onKeyDown={keyHandler}>
                <Input
                    value={columnHeadingValue}
                    onChange={evt => setColumnHeadingValue(evt.target.value)}
                    label='Название'
                    autoFocus={true}
                    required />
                <div className={classes.buttons} style={{ marginTop: '10px' }}>
                    <Button cls='primary' onClick={addColumn} text='Добавить' />
                </div>
            </div>
        </div>
    )
}

export default AddNewColumn;