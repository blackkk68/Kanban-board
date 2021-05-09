import React from 'react';
import classes from './BoardBody.module.scss';
import ColumnHeader from './ColumnHeader/ColumnHeader';
import ColumnElements from './ColumnElements/ColumnElements';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function BoardBody(props) {
    function onDragEnd(result) {
        const { destination, source, type } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const columns = JSON.parse(localStorage.getItem('columns'));
        if (type === 'task') {
            const column = columns.find(item => Number(item.id) === Number(source.droppableId));
            const tasks = column.tasks;
            const newTasks = tasks.slice();
            const task = newTasks.splice(source.index, 1)[0];
            if (destination.droppableId === source.droppableId && destination.index !== source.index) {
                newTasks.splice(destination.index, 0, task);
            } else if (destination.droppableId !== source.droppableId) {
                const destinationColumn = columns.find(item => Number(item.id) === Number(destination.droppableId));
                const destinationTasks = destinationColumn.tasks;
                const newDestinationTasks = destinationTasks.slice();
                newDestinationTasks.splice(destination.index, 0, task);
                destinationColumn.tasks = newDestinationTasks.slice();
            }
            column.tasks = newTasks.slice();
        } else if (type === 'column') {
            const column = columns.splice(source.index, 1)[0];
            columns.splice(destination.index, 0, column);
        }
        props.updateColumns(columns);
    }

    const cls = [classes.first, classes.second, classes.third, classes.fourth, classes.fifth, classes.sixth, classes.seventh];
    const columns = props.columns.length
        ? props.columns.map((item, index) => {
            return (
                <Draggable draggableId={String(item.id)} index={index} key={item.id}>
                    {provided => {
                        return (
                            <div className={`${classes.column} ${cls[item.index - 1]}`}
                                key={item.id}
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                                {...provided.dragHandleProps}>
                                <ColumnHeader
                                    id={item.id}
                                    heading={item.heading}
                                    updateColumns={props.updateColumns} />
                                <ColumnElements
                                    tasks={item.tasks ? item.tasks : []}
                                    columnId={item.id}
                                    updateColumns={props.updateColumns}
                                    openCurrentTaskModal={props.openCurrentTaskModal}
                                    searchValue={props.searchValue} />
                                <div className={classes.actions}>
                                    {item.deletable
                                        ? <DeleteOutlineOutlinedIcon className={classes.trash} onClick={() => props.openConfirmModal(item.id)} />
                                        : <span />}
                                    <AddBoxOutlinedIcon className={classes.plus} onClick={() => props.openAddNewTaskModal(item.id)} />
                                </div>
                            </div>
                        )
                    }}
                </Draggable>
            )
        })
        : null;

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='columns' direction='horizontal' type='column'>
                {provided => {
                    return (
                        <section className={classes.BoardBody}
                            {...provided.droppableProps}
                            ref={provided.innerRef}>
                            {columns}
                            {provided.placeholder}
                        </section>
                    )
                }}
            </Droppable>
        </DragDropContext >
    )
}

export default BoardBody;