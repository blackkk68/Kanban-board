import React from 'react';
import classes from './Column.module.scss';
import { Draggable } from 'react-beautiful-dnd';
import ColumnHeader from './ColumnHeader/ColumnHeader';
import ColumnElements from './ColumnElements/ColumnElements';

function Column(props) {
    return (
        props.columns
            ? props.columns.map((item, index) => {
                return (
                    <Draggable draggableId={String(item.id)} index={index} key={item.id}>
                        {provided => {
                            return (
                                <div className={classes.Column} key={item.id} {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                                    <ColumnHeader
                                        id={item.id}
                                        heading={item.heading}
                                        updateColumns={props.updateColumns} />
                                    <ColumnElements
                                        tasks={item.tasks}
                                        columnId={item.id}
                                        updateColumns={props.updateColumns}
                                        openCurrentTaskModal={props.openCurrentTaskModal}
                                        searchValue={props.searchValue} />
                                    <i className={`fa fa-plus-square ${classes.Plus}`} onClick={() => props.openAddNewTaskModal(true, item.id)}></i>
                                </div>
                            )
                        }}
                    </Draggable>
                )
            })
            : null
    )
}

export default Column;