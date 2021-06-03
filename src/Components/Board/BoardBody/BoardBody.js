import React from 'react';
import classes from './BoardBody.module.scss';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { observer } from 'mobx-react';
import columnsStore from '../../../Store/columns';
import Columns from './Columns/Columns';

const BoardBody = observer(props => {
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
                const destinationTasks = destinationColumn.tasks ? destinationColumn.tasks : [];
                const newDestinationTasks = destinationTasks.slice();
                newDestinationTasks.splice(destination.index, 0, task);
                destinationColumn.tasks = newDestinationTasks.slice();
            }
            column.tasks = newTasks.slice();
        } else if (type === 'column') {
            const column = columns.splice(source.index, 1)[0];
            columns.splice(destination.index, 0, column);
        }
        columnsStore.updateColumnsServerData(columns);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='columns' direction='horizontal' type='column'>
                {provided => {
                    return (
                        <section className={classes.BoardBody} {...provided.droppableProps} ref={provided.innerRef}>
                            <Columns
                                openConfirmModal={props.openConfirmModal}
                                openAddNewTaskModal={props.openAddNewTaskModal}
                                openUpdateTaskModal={props.openUpdateTaskModal}
                                searchValue={props.searchValue} />
                            {provided.placeholder}
                        </section>
                    )
                }}
            </Droppable>
        </DragDropContext >
    )
});

export default BoardBody;