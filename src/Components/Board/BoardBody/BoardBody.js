import React, { useState } from 'react';
import classes from './BoardBody.module.scss';
import Column from './Column/Column';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import AddNewTaskModal from '../../Modals/AddNewTaskModal/AddNewTaskModal';
import UpdateTask from '../../Modals/UpdateTaskModal/UpdateTaskModal';

function BoardBody(props) {
    const [isAddNewTaskModalOpen, setIsAddNewTaskModalOpen] = useState(false);
    const [isCurrentTaskModalOpen, setIsCurrentTaskModalOpen] = useState(false);
    const [currentColumnId, setCurrentColumnId] = useState('');
    const [currentTaskId, setCurrentTaskId] = useState('');

    function openAddNewTaskModal(bool, colId) {
        setIsAddNewTaskModalOpen(bool);
        setCurrentColumnId(colId);
    }

    function closeAddNewTaskModal(bool) {
        setIsAddNewTaskModalOpen(bool);
    }

    function openCurrentTaskModal(bool, colId, taskId) {
        setIsCurrentTaskModalOpen(bool);
        setCurrentColumnId(colId);
        setCurrentTaskId(taskId)
    }

    function closeCurrentTaskModal(bool) {
        setIsCurrentTaskModalOpen(bool);
    }

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

    return (
        <React.Fragment>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='columns' direction='horizontal' type='column'>
                    {provided => {
                        return (
                            <section className={classes.BoardBody}
                                {...provided.droppableProps}
                                ref={provided.innerRef}>
                                <Column
                                    columns={props.columns}
                                    updateColumns={props.updateColumns}
                                    openAddNewTaskModal={openAddNewTaskModal}
                                    openCurrentTaskModal={openCurrentTaskModal}
                                    searchValue={props.searchValue} />
                                {provided.placeholder}
                            </section>
                        )
                    }}
                </Droppable>
            </DragDropContext >
            <AddNewTaskModal
                isOpen={isAddNewTaskModalOpen}
                colId={currentColumnId}
                closeAddNewTaskModal={closeAddNewTaskModal}
                updateColumns={props.updateColumns} />
            {isCurrentTaskModalOpen
                ? <UpdateTask
                    updateColumns={props.updateColumns}
                    closeCurrentTaskModal={closeCurrentTaskModal}
                    colId={currentColumnId}
                    taskId={currentTaskId} />
                : null}
        </React.Fragment>
    )
}

export default BoardBody;