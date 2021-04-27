import React, { useState } from 'react';
import classes from './Board.module.scss';
import BoardBody from './BoardBody/BoardBody';
import AddNewColumn from './AddNewColumn/AddNewColumn';
import Search from '../../Plugins/Search/Search';

function Board() {
    const [columns, setColumns] = useState(JSON.parse(localStorage.getItem('columns')));
    const [searchValue, setSearchValue] = useState('');

    function updateColumns(cols) {
        setColumns(cols);
    }

    function setColumnsSearch(value) {
        setSearchValue(value);
    }

    localStorage.setItem('columns', JSON.stringify(columns));

    return (
        <section className={classes.Board}>
            <div className={classes.header}>
                <h1 className={classes.heading}>Доска задач</h1>
                <div className={classes.buttons}>
                    <Search setColumnsSearch={setColumnsSearch} />
                    <AddNewColumn updateColumns={updateColumns} />
                </div>
            </div>
            <BoardBody searchValue={searchValue} columns={columns} updateColumns={updateColumns} />
        </section>
    )
}

export default Board;